import * as React from "react";import Header from "./Header";
import {useEffect, useRef, useState} from "react";
import Banner from "./Banner";
import FileCard from "./FileCard";
import Pagination from "./Pagination";
import './App.css';
import uploadIcon from "./assets/operations/upload.svg";
import deleteIcon from "./assets/operations/trash.svg";
import editIcon from "./assets/operations/pencil.svg";
import downloadIcon from "./assets/operations/download.svg";
import shareIcon from "./assets/operations/share.svg";
import openIcon from "./assets/operations/magnifying_glass.svg";
import checkboxIcon from "./assets/operations/checkbox.svg";
import sortingIcon from "./assets/operations/sortingIcon.svg";

import axios from "axios";

const App = () => {
    const [files, setFiles] = useState([]);
    const [paginationMeta, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const onDelete = (id: number) => {
        const data = {
            id: id,
        };
        axios
            .post('http://file-manager-back.loc/api/delete', data)
            .then(() => {
                getFiles(currentPage);
            })
            .catch(error => {
                console.error('Помилка:', error);
            });
    };

    const onSave = (id: number, fileName: string) => {
        const data = {
            name: fileName,
        };
        axios.post('http://file-manager-back.loc/api/update/' + id, data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Помилка:', error);
            });

    }

    const onDownload = (id: number) => {
        axios.get(`http://file-manager-back.loc/api/download/${id}`, {
            responseType: 'blob',
        })
            .then((res) => {
                const contentDisposition = res.headers['content-disposition'];
                const fileNameMatch = contentDisposition?.match(/filename\*=UTF-8''(.+)/);
                const fileName = fileNameMatch ? decodeURIComponent(fileNameMatch[1]) : 'downloaded_file';

                const url = window.URL.createObjectURL(res.data);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);

                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(error => console.error('Помилка завантаження файлу:', error));
    }

    const onUpload = (uploadedFiles: any) => {
        if (!uploadedFiles) {
            alert('Виберіть файл для завантаження.');
            return;
        }

        const formData = new FormData();

        for (const file of uploadedFiles) {
            formData.append('files[]', file);
        }

        axios
            .post('http://file-manager-back.loc/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(response => {
                getFiles(currentPage);
                console.log('Файли завантажено:', response.data);
            })
            .catch(error => {
                console.error('Помилка при завантаженні файлів:', error);
            });
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = e.target.files;
        if (uploadedFiles && uploadedFiles.length > 0) {
            console.log(`Обрано ${uploadedFiles.length} файли`);
            onUpload(uploadedFiles);
        }
    };

    const openFileDialog = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        getFiles(currentPage);
    }, [currentPage]);

    const getFiles = (
        page: number,
        sortField: string|null = null,
        sortOrder: string|null = null
    ) => {
        let url = `http://file-manager-back.loc/api/index?page=${page}`;

        if (sortField) {
            url += `&sort_field=${sortField}&sort_order=${sortOrder}`;
        }

        axios.get(url)
            .then(data => {
                setFiles(data.data.data);
                setPagination(data.data.meta);
                setCurrentPage(data.data.meta.current_page);
            })
            .catch(error => console.error('Помилка при отриманні файлів:', error));
    }

    return (
        <>
            <div className="container">
                <Header />
                <Banner />
                <main>
                    <div className="file-manager">
                        <div className="operations">
                            <div className="operation-button-left-block">
                                <button className="select-all-btn">
                                    <img src={checkboxIcon} alt="Icon" />
                                </button>
                            </div>
                            <div className="operation-buttons">
                                <input
                                    ref={fileInputRef}
                                    hidden
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                />
                                <button onClick={openFileDialog} className="upload-btn">
                                    <img src={uploadIcon} alt="Icon" />
                                </button>
                                <button className="delete-btn">
                                    <img src={deleteIcon} alt="Icon" />
                                </button>
                                <button className="edit-btn">
                                    <img src={editIcon} alt="Icon" />
                                </button>
                                <button className="download-btn">
                                    <img src={downloadIcon} alt="Icon" />
                                </button>
                                <button className="share-btn">
                                    <img src={shareIcon} alt="Icon" />
                                </button>
                                <button className="open-btn">
                                    <img src={openIcon} alt="Icon" />
                                </button>
                            </div>
                            <div className="sorting">
                                <label htmlFor="sorting-field-selector">Sorting</label>
                                <select
                                    id="sorting-field-selector"
                                    className="sorting-field-selector"
                                    onChange={(e) => getFiles(currentPage, e.target.value, 'desc')}
                                >
                                    <option value="name">Name</option>
                                    <option value="created_at">Date</option>
                                </select>
                                <img className="selector-sort-icon" src={sortingIcon} alt="Icon" />
                            </div>
                        </div>

                        <div className="file-items">
                            {files.map((item) => (
                                <FileCard
                                    key={item.id}
                                    file={item}
                                    onDelete={onDelete}
                                    onSave={onSave}
                                    onDownload={onDownload}
                                />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={paginationMeta.last_page}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </main>
            </div>
        </>
    );
};

export default App;