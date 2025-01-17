
import "./Pagination.css"

function Pagination({ page = 1, setPage, pagesTotal }) {

    const total = Math.max(pagesTotal, 1);

    const isAtStart = page === 1;
    const isAtEnd = page === total;

    const handlePrevPage = () => {
        if (!isAtStart) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (!isAtEnd) setPage(page + 1);
    };

    return (
        <nav className="d-flex justify-content-evenly align-items-center my-4 mx-auto nav-wrapper">
            <button className="nav-button" onClick={handlePrevPage} style={{ cursor: isAtStart ? 'not-allowed' : 'pointer' }}>
                {/* el svg esta enbedido acá para poder pintarlo dinamicamente, en un tag <img> no es posible */}
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 0.5L5.5575 1.5575L2.1225 5L5.5575 8.4425L4.5 9.5L0 5L4.5 0.5Z" fill={isAtStart ? "#cccccc" : "#333333"} />
                </svg>
            </button>
            <span>{page} de {total}</span>
            <button className="nav-button" onClick={handleNextPage} style={{ cursor: isAtEnd ? 'not-allowed' : 'pointer' }}>
                {/* el svg esta enbedido acá para poder pintarlo dinamicamente, en un tag <img> no es posible */}
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 0.5L0.442505 1.5575L3.8775 5L0.442505 8.4425L1.5 9.5L6 5L1.5 0.5Z" fill={isAtEnd ? "#cccccc" : "#333333"} />
                </svg>
            </button>
        </nav>
    );
}

export default Pagination;