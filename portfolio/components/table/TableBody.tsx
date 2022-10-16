import React from 'react'
import { useTableContext } from './useTableContext'

const TableBody = () => {
    const {calculatedRows,columns}=useTableContext();
        return (
        <tbody className='responsive-table__body'>
            {calculatedRows.map((row) => {
                return (
                    <tr key={row.id} className="responsive-table__row">
                        {columns.map((column) => {
                            if (column.format) {
                                return <td  className="responsive-table__body__text "key={column.accessor}>{column.format(row[column.accessor])}</td>
                            }
                            return <td key={column.accessor} className="responsive-table__body__text ">{row[column.accessor]}</td>
                        })}
                        <td>Action</td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export default TableBody