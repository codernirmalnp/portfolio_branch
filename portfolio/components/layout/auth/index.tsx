import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Hamburger } from "../../svg";

import request from './../../api/interceptor'
import Sidebar from "./sidebar";


type Props = {
  children: React.ReactNode,

};
const getUserData = async () => {

  const user = await request({
    url: "/auth/me",
    method: "get",
    withCredentials: true
  },
  )
  return user;



}


const AdminLayout: React.FC<Props> = (props) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true);
  const { children } = props
  const router = useRouter();


  useEffect(() => {
    if (!user) {
      getUserData().then(res => {
        if (res.status === 200) {
          setUser(res.data)
          setLoading(false);
        } else {
          router.push('/admin')
        }

      }).catch(err => {
        setUser(null);
        router.push('/admin')

      })
    }


  }, [])
  if (loading) {
    return <h1>Loading....</h1>
  } else {
    return (
      <AuthContext.Provider value={user}>
        <main className="responsive-wrapper">
          <div className="app">
            <header className='header'>
              <div className="app-header-logo">
                <div className="logo">

                  <h1 className='logo-title'>
                    <span>
                      Nirmal
                    </span>
                    <span>
                      Dashboard
                    </span>
                  </h1>
                </div>
              </div>


              <div className="app-header-actions">
                <button className="user-profile">
                  <span>Nirmal Dangi</span>
                  <span>
                    <img src="https://assets.codepen.io/285131/almeria-avatar.jpeg" />
                  </span>
                </button>
                <div className="app-header-actions-buttons">
                  <button className="icon-button large">
                    <i className="ph-magnifying-glass"></i>
                  </button>
                  <button className="icon-button large">
                    <i className="ph-bell"></i>
                  </button>
                </div>
              </div>
              <div className="app-header-mobile">
                <button className="icon-button large">
                  <Hamburger />
                </button>
              </div>
            </header>

            <div className='app-body'>
              <Sidebar />
              {children}

            </div>
          </div>
        </main>
      </AuthContext.Provider>
    );
  }




};
export default AdminLayout;



