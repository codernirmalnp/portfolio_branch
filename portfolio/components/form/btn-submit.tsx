import React from 'react'

export const ButtonSubmit = ({classNames,children}) => {
  return (

    <div className={classNames.dock}>
      <button type="submit" className={classNames.submit}> {children}</button>
    </div>
  )
}
