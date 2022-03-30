import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({user,children}) {
  if(user.rol === "user"){
        return <Navigate to="/" replace/>
  }
  return children
}