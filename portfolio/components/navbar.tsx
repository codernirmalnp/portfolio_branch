import React from 'react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { NavLink } from './navlink';
 const Navbar=()=>{
  const router=useRouter();
  
   return (<header className="primary-header container ">
        <div className="primary-header__logo"><h1>NIRMAL</h1></div>
        {/* <button className="hamburger">
   
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button> */}
        <nav className="primary-header__nav">
          <ul>
            <li><NavLink href="/"><a href="#" >Home</a></NavLink></li>
            <li><NavLink href="/work" ><a href="#">Work</a></NavLink></li>
            <li><NavLink href="/blog"><a href="#">Blog</a></NavLink></li>
          </ul>
        </nav>
        <div className="primary-header__cta">
          <button>Login</button>
          <div className="space"></div>
          <button>Signup</button>
        </div>
      </header>);
}
export default Navbar;