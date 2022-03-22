import React, { Children } from 'react'
import { motion } from 'framer-motion'
import ReactDOM from 'react-dom'

const pathVariants = {
    hidden: {pathLength: 0},
    show: {
        pathLength:1,
        transition:{
            delay:2,
            duration: 5,
            ease: "easeInOut",
        }

    }
}
const svgVariants = {
    hidden: {y: "-500px"},
    show: {
        y: "0px",
        transition:{
            duration: 2,
            ease: "easeInOut",
        }

    }
}

function LoggedModal({children,onClose}) {
  return (
        <div className='bg-black/20 fixed h-screen w-screen'>
            <motion.svg
            variants={svgVariants}
            initial="hidden"
            animate="show"
            className='bg-white h-32 w-32 relative top-2/4 left-2/4 rounded-3xl' 
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <motion.path
            variants={pathVariants}
            d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z"/>
            </motion.svg>
        </div>
    )
    }

export default function ModalPortal ({children,onClose}){
    return ReactDOM.createPortal(
        <LoggedModal onClose={onClose}>
            {children}
        </LoggedModal>,
        document.getElementById("modal")
    )
}
