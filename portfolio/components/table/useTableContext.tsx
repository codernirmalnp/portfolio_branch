import React from "react";

export const TableContext = React.createContext(undefined);

function TableProvider({ children, value }) {
    return (
        <TableContext.Provider value={value}>{children}</TableContext.Provider>
    );
}

function useTableContext() {
    const context = React.useContext(TableContext);
    if (context === undefined) {
        throw new Error("useTableContext must be used within a table");
    }
    return context;
}

export { TableProvider, useTableContext };