import React from 'react'
import { Link } from 'react-router-dom'

export default function Failure() {
  return (
    <>
    <Link to={"/purchase"}>There's been an error, do you want to retry?</Link>
    </>
  )
}
