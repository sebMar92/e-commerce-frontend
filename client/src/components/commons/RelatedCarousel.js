import React, { useState, useEffect } from 'react';
import CardHome from "../CardHome"

export default function RelatedCarousel({ data }) {

    const [paginaActual, setPaginaActual] = useState(1)
    const [productosProCarrusel] = useState(4)
    const indiceDeUltimoProducto = paginaActual * productosProCarrusel
    const indiceDePrimerProdcuto = indiceDeUltimoProducto - productosProCarrusel
    const [productos, setProductos] = useState()
    const paginasLength = Math.ceil(data.length / 4)

    function onClickCarruselNext() {
        if (paginaActual !== paginasLength) {
            setPaginaActual(paginaActual + 1)
        } else {
            setPaginaActual(1)
        }
    }


    function onClickCarruselPrev() {
        if (paginaActual !== 1) {
            setPaginaActual(paginaActual - 1)
        } else {
            setPaginaActual(paginasLength)
        }
    }

    useEffect(() => {
        setProductos(data.slice(indiceDePrimerProdcuto, indiceDeUltimoProducto))
    }, [paginaActual])

    useEffect(() => {
        if (productos && data && productos.length < 4) {
            setProductos([...productos, ...data.slice(0, 4 - productos.length)])
        }

    }, [productos])


    return (
        <div className="bg-secondary-100">
            <div className="w-11/12 pb-2 mx-auto 2xl:w-9/12">
                <div className="p-2 full bg-white rounded flex flex-col ">
                    <div className="p-2 border-b-[1px] border-primary-300">
                        <h2 className="font-lora">Related Products</h2>
                    </div>
                    <div className="text-sm pt-2 pl-3 flex flex-col sm:flex-row gap-2 pb-4 max-w-auto justify-center">
                        <button onClick={onClickCarruselPrev} className="bg-primary-300">prev</button>
                        {productos && productos.map((el) => (
                            <div id={el.id} className="w-full ">
                                <CardHome id={el.id} title={el.title} price={el.price} shipping={el.shipping} stock={el.stock} description={el.description} images={el.images} image={el.images[0].url} className="ir-arriba"/>
                            </div>
                        ))}
                        <button onClick={onClickCarruselNext} className="bg-primary-300 ">next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}