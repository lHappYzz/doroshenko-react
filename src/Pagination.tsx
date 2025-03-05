import './Pagination.css';
import paginationPrev from "./assets/pagination/prev.svg";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrev = () => currentPage > 1 && onPageChange(currentPage - 1);
    const handleNext = () =>
        currentPage < totalPages && onPageChange(currentPage + 1);

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`page-number ${i === currentPage ? 'active' : ''}`}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };
    
    return (
        <div className="pagination">
            <button className="pagination-prev-button" onClick={handlePrev} disabled={currentPage === 1}>
                <img src={paginationPrev} alt="prevIcon" />
            </button>
            {renderPageNumbers()}
            <button className="pagination-next-button" onClick={handleNext} disabled={currentPage === totalPages}>
                <img src={paginationPrev} alt="prevIcon" />
            </button>
        </div>
    );
};

export default Pagination;

