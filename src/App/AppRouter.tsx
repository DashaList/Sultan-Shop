import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { adminRoutes } from './routes'
import { publicRoutes } from './routes'

const AppRouter = () => {
  const isAdmin = true

  return (
    <Routes>
      {isAdmin && adminRoutes.map(({path, Component}) =>
        <Route key={path} path={path} Component={Component}/>
      )}
      {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} Component={Component}/>
      )}
    </Routes>
  )
}

export default AppRouter