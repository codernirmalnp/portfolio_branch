/* eslint-disable jsx-a11y/accessible-emoji */

import { useTableContext } from "./useTableContext"

export const Pagination = () => {
    const { activePage, count, rowsPerPage, totalPages, setActivePage } = useTableContext();
    const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1
    const end = activePage === totalPages ? count : beginning + rowsPerPage - 1



    return (
        <>
            {count && <div className="pagination">
                <div>
                    <button disabled={activePage === 1} onClick={() => setActivePage(1)}>
                        First
                    </button>
                    <button disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)}>
                        Previous
                    </button>
                    <button disabled={activePage === totalPages} onClick={() => setActivePage(activePage + 1)}>
                        Next
                    </button>
                    <button disabled={activePage === totalPages} onClick={() => setActivePage(totalPages)}>
                        Last
                    </button>
                </div>
                <div>
                    <p>
                        Page {activePage} of {totalPages}
                    </p>

                </div>
                <div> <p>
                    Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
                </p></div>
            </div>}

        </>
    )
}
