import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import Layout from './Layout'
import { useSelector } from 'react-redux'

const PrivateLayoutRoutes = () => {
  const auth = useSelector(state => state.auth)
  return (
    auth ?
      <>
        <Layout>
          <Outlet />
        </Layout>
      </>
      : <Navigate to='/login' />
  )
}

export default PrivateLayoutRoutes;