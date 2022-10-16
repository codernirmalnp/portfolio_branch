import React from 'react'
type PopupProps = {
    title: string,
    children: React.ReactNode,
    popup: boolean,
    closeIcon: React.ReactNode

}
const Popup: React.FC<PopupProps> = (props) => {
    const { title, popup, children, closeIcon } = props
    return (
        <div className={`overlay light ${popup ? 'active' : ""}`}>
            <div className="popup">
                <div className='header'><h2>{title}</h2>  {closeIcon}</div>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Popup