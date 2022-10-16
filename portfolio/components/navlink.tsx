import React, { ReactChild, ReactChildren, ReactHTMLElement, ReactNode, ReactPortal } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
//how to make responsive dashboard ?
type NavProps={
    href:string;
    children:React.ReactElement<any,any>
}

export const NavLink:React.FC<NavProps>=({href,children})=>{
    const router=useRouter();
    const className=router.asPath===href ? 'active':''
    
    
    return <Link href={href}>{React.cloneElement(children,{className})}</Link>
}