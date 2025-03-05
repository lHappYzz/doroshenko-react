import * as React from "react";
import './FileCard.css';
import documentIcon from "./assets/document-icon.svg";
import {useState} from "react";
import redCross from "./assets/file-elements/red-cross.svg";
import greenCheckMark from "./assets/file-elements/green-check-mark.svg";

import downloadIcon from "./assets/operations/download.svg";
import shareIcon from "./assets/operations/share.svg";
import editIcon from "./assets/operations/pencil.svg";

interface File {
    id: number;
    name: string;
    created_at: string;
}

interface FileCardProps {
    file: File;
    onDelete: (id: number) => void;
    onSave: (id: number, fineName: string) => void;
    onDownload: (id: number) => void;
}

const FileCard: React.FC<FileCardProps> = ({file, onDelete, onSave, onDownload}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [fileName, setFileName] = useState(file.name);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <div
            className="file-card"
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
        >
            <div className="doc-logo">
                <img src={documentIcon} alt="documentIcon"/>
            </div>
            <div className="doc-info">
                <div className="doc-id">Ідентифікатор: {file.id}</div>

                {isEditing ? (
                    <input
                        type="text"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                    />
                ) : (
                    <div className="doc-name">Назва: {fileName}</div>
                )}

                <div className="doc-creation">Дата створення: {new Date(file.created_at).toLocaleString()} {}</div>
            </div>

            {isHovered && (
                <>
                    <div className="file-actions">
                        <button className="edit-file-btn">
                            <img src={greenCheckMark} alt="checkmark"/>
                        </button>
                        <button onClick={() => onDelete(file.id)} className="delete-file-btn">
                            <img src={redCross} alt="redcross"/>
                        </button>
                    </div>
                    <div className="file-operations-buttons">
                        <button onClick={() => onDownload(file.id)} className="download-file-btn">
                            <img src={downloadIcon} alt="downloadIcon"/>
                        </button>
                        <button className="share-file-btn">
                            <img src={shareIcon} alt="shareIcon"/>
                        </button>
                        <button onClick={() => {
                            if (isEditing) {
                                onSave(file.id, fileName);
                            }
                            setIsEditing(!isEditing);
                        }} className="edit-file-btn">
                            {isEditing ? "Зберегти" : <img src={editIcon} alt="editIcon"/>}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default FileCard;