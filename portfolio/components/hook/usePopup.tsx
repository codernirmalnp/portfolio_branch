import { useState } from "react"

export const usePopup = () => {
    const [popup, setPopup] = useState(false)
    const changePopup = () => {
        setPopup(!popup)
    }
    return {
        popup, changePopup
    }
}