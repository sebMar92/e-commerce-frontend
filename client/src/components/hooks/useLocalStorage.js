import React, {useState} from "react";


// Un hook que nos ayuda a setear en local storage, recibe una key y un initial value que son el nombre y el valor
// con el que se van a guardar respectivamente
// Retorna el item

export default function useLocalStorage (key,initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            return initialValue
        }
    })

    const setValue = value =>{
        try {
            setStoredValue(value)
            window.localStorage.setItem(key,JSON.stringify(value))
        } catch (error) {
            console.log(value)
        }
    }
}