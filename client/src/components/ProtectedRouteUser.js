import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({user,children}) {
    const verify = user && Object.values(user).length
    if(verify === 0){
            return <Navigate to="/" replace/>
    }
    return children
    }