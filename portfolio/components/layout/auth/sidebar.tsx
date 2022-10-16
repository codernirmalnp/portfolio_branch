import React from 'react'
import { NavLink } from '../../navlink'

const Sidebar = () => {
    return (
        <aside >
            <nav className='app-body-navigation'>
                <ul>
                    <NavLink href="/dashboard"><li><a href="">Dashboard</a></li></NavLink>
                    <NavLink href="/user"><li><a href="">User</a></li></NavLink>
                    <NavLink href="/dashboard/category"><li><a href="">Category</a></li></NavLink>
                    <NavLink href="/dashboard/posts"><li><a href="">Posts</a></li></NavLink>
                    <NavLink href="/user"><li><a href="">Comments</a></li></NavLink>
                </ul>

            </nav>
        </aside>
    )
}

export default Sidebar