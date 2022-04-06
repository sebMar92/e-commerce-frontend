import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CardHome from "../CardHome"
import { GrNext, GrPrevious } from "react-icons/gr"

export default function RelatedCarousel({ data }) {

    const wishListDB = useSelector((state) => state.home.inWishList);
    const cartDB = useSelector((state) => state.home.inCart)
    const token = window.localStorage.getItem("access")
    const deleted = useSelector((state) => state.home.deleted)
    const postOrders = useSelector((state) => state.home.postOrders)

    const [paginaActual, setPaginaActual] = useState(1)
    const [productosPorCarrusel, setProductosPorCarrusel] = useState()
    const indiceDeUltimoProducto = paginaActual * productosPorCarrusel
    const indiceDePrimerProdcuto = indiceDeUltimoProducto - productosPorCarrusel
    const [productos, setProductos] = useState()
    const paginasLength = Math.ceil(data.length / productosPorCarrusel)

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };


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
        if (width > 300 && width < 768) {
            setProductosPorCarrusel(2)
        }
        if (width > 768 && width < 830) {
            setProductosPorCarrusel(3)
        }
        if (width > 830 && width < 1450) {
            setProductosPorCarrusel(4)
        }
        if (width > 1450 && width < 10000) {
            setProductosPorCarrusel(5)
        }
    }, [width, height])

    useEffect(() => {
        setProductos(data.slice(indiceDePrimerProdcuto, indiceDeUltimoProducto))
    }, [paginaActual, productosPorCarrusel])

    useEffect(() => {
        if (productos && data && productos.length < productosPorCarrusel) {
            setProductos([...productos, ...data.slice(0, productosPorCarrusel - productos.length)])
        }

    }, [productos, productosPorCarrusel])


    return (
        <div className="bg-secondary-100">
            <div className="w-11/12 pb-2 mx-auto 2xl:w-9/12">
                <div className="p-2 full bg-white rounded flex flex-col">
                    <div className="p-2 border-b-[1px] border-primary-300">
                        <h2 className="font-lora">Related Products</h2>
                    </div>

                    <div className="flex justify-between">
                        <button onClick={onClickCarruselPrev} className="bg-primary-300 text-3xl hover:bg-primary-500"><GrPrevious /></button>
                        <div className="text-sm pt-2 pl-3 flex flex-col sm:flex-row gap-2 pb-4 max-w-auto justify-center ">
                            {productos && productos.map((el) => (
                                <div id={el.id} className="w-full xl:w-60">
                                    <CardHome
                                        key={el.id}
                                        id={el.id}
                                        title={el.title}
                                        price={el.price}
                                        shipping={el.shipping}
                                        stock={el.stock}
                                        description={el.description}
                                        images={el.images}
                                        image={el.images[0].url}
                                        wishListDB={wishListDB}
                                        cartDB={cartDB}
                                        token={token}
                                        deleted={deleted}
                                        postOrders={postOrders} className="ir-arriba" />
                                </div>
                            ))}
                        </div>
                        <button onClick={onClickCarruselNext} className="bg-primary-300 text-3xl hover:bg-primary-500"><GrNext /></button>
                    </div>

                </div>
            </div>
        </div>
    )
}