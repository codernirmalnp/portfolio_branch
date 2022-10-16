import React from 'react'
import { usePopup } from '../../hook/usePopup';
type Props = {
    children: React.ReactNode;
};
export const AuthLayout: React.FC<Props> = ({ children }) => {
    return (

        <div className='screen'>
            <div className='screen__background '>
                {children}
            </div>
           
        </div>

    )
}
