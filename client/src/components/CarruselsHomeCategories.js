import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import 'tw-elements';
import CardHome from "./CardHome"
export default function CarruselsHomeCategories({ data }) {


    const firstCarrusel = useSelector((state) => state.home.carruselOne)

    const secondCarrusel = useSelector((state) => state.home.carruselTwo)

    const thirdCarrusel = useSelector((state) => state.home.carruselThird)

    const chunk = function (arr, n) {
        if (!arr.length) {
            return [];
        }
        return [arr.slice(0, n)].concat(chunk(arr.slice(n), n));
    };

    const [stateFirstCarrusel, setStateFirstCarrusel] = useState()


    useEffect(() => {
        const carruselOne = chunk(firstCarrusel, 5)
        console.log(carruselOne)
        setStateFirstCarrusel(carruselOne)
    }, [firstCarrusel])


    return (
        <div id="carouselExampleCaptions" class="carousel slide relative w-5/6 ml-auto mr-auto" data-bs-ride="carousel">
            <div class="bg-black carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 -mb-6 w-full mr-0 ml-0">
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="0"
                    class="active"
                    aria-current="true"
                    aria-label="Slide 1"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                ></button>
            </div>
            <div class="carousel-inner relative w-full overflow-hidden">
                <div class="carousel-item active relative float-left w-full">
                    <div class="flex justify-evenly">
                        {stateFirstCarrusel && stateFirstCarrusel.length > 0 && stateFirstCarrusel[0].map((product) => {
                            return (
                                <div class="w-72 mt-4 mb-4">
                                    <CardHome key={product.id}
                                        id={product.id}
                                        image={product.images[0].url}
                                        images={product.images}
                                        title={product.title}
                                        price={product.price}
                                        shippingCost={product.shippingCost}
                                        stock={product.stock}
                                        description={product.description}
                                    />
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
                <div class="carousel-item relative float-left w-full">
                    {/* <img
                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
                        class="block w-full"
                        alt="..."
                    /> */}
                    <div class="flex justify-evenly">
                        {stateFirstCarrusel && stateFirstCarrusel.length > 0 && stateFirstCarrusel[0].map((product) => {
                            return (
                                <div class="w-72 mt-4 mb-4">
                                    <CardHome key={product.id}
                                        id={product.id}
                                        image={product.images[0].url}
                                        images={product.images}
                                        title={product.title}
                                        price={product.price}
                                        shippingCost={product.shippingCost}
                                        stock={product.stock}
                                        description={product.description}
                                    />
                                </div>
                            )
                        }
                        )}
                    </div>
                    {/*  <div class="carousel-caption hidden md:block absolute text-center">
                        <h5 class="text-xl">Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div> */}
                </div>
                <div class="carousel-item relative float-left w-full">
                    {/* <img
                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
                        class="block w-full"
                        alt="..."
                    /> */}
                    <div class="flex justify-evenly">
                        {stateFirstCarrusel && stateFirstCarrusel.length > 0 && stateFirstCarrusel[0].map((product) => {
                            return (
                                <div class="w-72 mt-4 mb-4">
                                    <CardHome key={product.id}
                                        id={product.id}
                                        image={product.images[0].url}
                                        images={product.images}
                                        title={product.title}
                                        price={product.price}
                                        shippingCost={product.shippingCost}
                                        stock={product.stock}
                                        description={product.description}
                                    />
                                </div>
                            )
                        }
                        )}
                    </div>
                    {/*  <div class="carousel-caption hidden md:block absolute text-center">
                        <h5 class="text-xl">Third slide label</h5>
                        <p>Some representative placeholder content for the third slide.</p>
                    </div> */}
                </div>
            </div>
            <button
                class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline -left-32"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
            >
                <span class="visually-hidden carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span class="text-black text-6xl">{"<"}</span>
            </button>
            <button
                class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline -right-32"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
            >
                <span class="visually-hidden carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span class="text-black text-6xl">{">"}</span>
            </button>
        </div>
    )
}