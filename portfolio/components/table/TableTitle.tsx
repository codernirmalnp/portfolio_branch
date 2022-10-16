import React from 'react'
type TableTitleProps = {
  title: string,
  actionBtn?: React.ReactNode
  changePopup?: () => void
}
const TableTitle: React.FC<TableTitleProps> = ({ title, actionBtn, changePopup }) => {
  return (
    <div className='table-title'>
      <h1>{title}</h1> 

      <div className="table-top-item">
        <button onClick={changePopup}> Add  {title}</button>
        <input
          className='table-search'
          placeholder={`Search ${title}`}
          type="search"
          onChange={(event) => { }}
        /></div>
    </div>
  )
}

export default TableTitle