import { log } from "console";
import { useTableContext } from "./useTableContext";

export const TableHead = () => {
    const context=useTableContext();
     const {columns,sort}=context
   
//   const columns=[{accessor:"",label:"a"}]
//   const sort={orderBy:"a",order:"asc"}
  
    return <thead className="responsive-table__head">
        <tr className="responsive-table__row">
            {columns.map((column) => {
                const sortIcon = () => {
                    if (column.accessor === sort.orderBy) {
                        if (sort.order === 'asc') {
                            return '⬆️'
                        }
                        return '⬇️'
                    } else {
                        return '️↕️'
                    }
                }
                return (
                    <th key={column.accessor} className="responsive-table__head__title">
                        {column.label}
                        {/* <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button> */}
                    </th>

                )
            })}
            <th>Action</th>
        </tr>
       
    </thead>
}