import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import CardHome from "../components/CardHome"

const initialState = [
    { idx: 1, pos: 1, text: "1", active: true },
    { idx: 2, pos: 2, text: "2", active: true },
    { idx: 3, pos: 3, text: "3", active: true },
    { idx: 4, pos: 4, text: "4", active: false }
]



function Carousel() {


    const firstCarrusel = useSelector((state) => state.home.carruselOne)
    console.log(firstCarrusel)

    const secondCarrusel = useSelector((state) => state.home.carruselTwo)

    const thirdCarrusel = useSelector((state) => state.home.carruselThird)

    const [state, setState] = useState([])
    console.log("state", state)



    useEffect(() => {
        const aux = []
        if (firstCarrusel.length > 0) {
            firstCarrusel.map((e, i) => {
                console.log("shit")
                aux.push({ idx: i, pos: i, product: e, active: i > 4 ? false : true })
            })
            setState(aux)
        }
    }, [firstCarrusel])


    const handleLeftClick = (isLeft) => {
        const prevState = [...state];
        const nextCardIdx = prevState
            .filter((ft) => ft.active === true)
            .sort((a, b) => (a.pos > b.pos ? 1 : b.pos > a.pos ? -1 : 0))[0].idx;

        prevState.find((f) => f.active === false).active = true;
        prevState.find((f) => f.idx === nextCardIdx).active = false;

        prevState.find((f) => f.idx === nextCardIdx).pos = Math.max.apply(
            null,
            prevState.map(function (o) {
                return o.pos;
            })
        ) + 1;

        setState(prevState);
    }

    const hanldeRightClick = () => {
        const prevState = [...state];
        const nextCardIdx = prevState
            .filter((ft) => ft.active === true)
            .sort((a, b) => (a.pos > b.pos ? 1 : b.pos > a.pos ? -1 : 0))
            .pop().idx

        prevState.find((f) => f.active === false).pos = Math.min.apply(
            null,
            prevState.map(function (o) {
                return o.pos;
            })
        ) - 1;
        console.log("prevStateApply",prevState)

        prevState.find((f) => f.active === false).active = true;
        prevState.find((f) => f.idx === nextCardIdx).active = false;

        setState(prevState)
    };
    return (
        <>
            <div
                className="text-xl md:text-5xl cursor-pointer"
                onClick={() => handleLeftClick()}
            >
                {"<"}
            </div>

            {state && state
                .filter((f) => f.active === true)
                .sort((a, b) => (a.pos > b.pos ? 1 : b.pos > a.pos ? -1 : 0))
                .map((state, index) => (
                    <div className="w-full">
                    <CardHome key={index} id={state.product.id} title={state.product.title} price={state.product.price} shipping={state.product.shipping} stock={state.product.stock} description={state.product.description} images={state.product.images} image={state.product.images[0].url} />
                    </div>
                ))
            }

            <div
                className="text-xl md:text-5xl cursor-pointer"
                onClick={() => hanldeRightClick()}
            >
                {">"}
            </div>
        </>
    );
}

export default Carousel;