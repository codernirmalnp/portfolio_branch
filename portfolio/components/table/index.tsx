import { useMemo, useState } from 'react'
import { filterRows, paginateRows, sortRows } from './helpers'
import { Pagination } from './Pagination'
import TableBody from './TableBody'
import { TableHead } from './TableHead'
import TableTitle from './TableTitle'
import { TableProvider } from './useTableContext'

export const Table = ({ children, rows, columns }) => {
  const [activePage, setActivePage] = useState(1)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
  const rowsPerPage = 3
  const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)
  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage)

  const handleSearch = (value, accessor) => {
    setActivePage(1)
    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }))
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters }
        delete updatedFilters[accessor]
        return updatedFilters
      })
    }
  }

  const handleSort = (accessor) => {
    setActivePage(1)
    setSort((prevSort) => ({
      order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
      orderBy: accessor,
    }))
  }

  const clearAll = () => {
    setSort({ order: 'asc', orderBy: 'id' })
    setActivePage(1)
    setFilters({})
  }
  return (
    <>
      <TableProvider value={{ calculatedRows, handleSearch, totalPages, handleSort, sort, count, rowsPerPage, activePage, clearAll, columns, setActivePage }}>
        {children}
      </TableProvider>
    </>
  )
}
Table.TableHead = TableHead
Table.TableTitle = TableTitle
Table.TableBody = TableBody
Table.Pagination = Pagination
