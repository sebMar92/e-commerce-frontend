import React, { useEffect } from "react";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate, createSearchParams } from "react-router-dom";
import useURLqueries from "./hooks/useURLqueries";

export default function Pagination() {
  const navigate = useNavigate();
  const queryObjects = useURLqueries();
  const pages = useSelector((state) => state.home.totalPages);
  const pagesArray = pages && Array.from({ length: pages }, (value, i) => i + 1);

  useEffect(() => {
    const btnPrev = document.getElementById("btnPrev")
    const btnNext = document.getElementById("btnNext")
    if (queryObjects.offset == 1) {
      btnPrev.classList.add("hidden")
    } else {
      btnPrev.classList.remove("hidden")
    }
    if (queryObjects.offset == pages) {
      btnNext.classList.add("hidden")
    } else {
      btnNext.classList.remove("hidden")
    }

  }, [queryObjects])

  useEffect(() => {
    if (pagesArray === 0) {
      document.getElementById("paginado").classList.add("hidden")
    }else{
      document.getElementById("paginado").classList.remove("hidden")
    }
  }, [pagesArray])


  return (
    <div id="paginado" className="">
      <nav>
        <ul className="flex justify-evenly sm:justify-center m-2">
          <div id="btnPrev" className="">
            <button
              onClick={(e) => {
                navigate({
                  search: createSearchParams({
                    ...queryObjects,
                    offset: Number(queryObjects.offset) - 1
                  }).toString(),
                });
              }}
              className={"m-0.5 text-2xl text-secondary-200 border-2 rounded-full border-primary-400 hover:scale-125 hover:shadow hover:shadow-secondary-500 "}>
              <BsFillArrowLeftCircleFill />
            </button>
            <label className="flex flex-col sm:hidden">Previous</label>
          </div>

          {pagesArray &&
            pagesArray.map((number) => {
              return (
                <div
                  id={number}
                  key={number}
                  className="hidden sm:flex sm:justify-center"
                >
                  <li>
                    <button
                      id={number}
                      onClick={(e) => {
                        navigate({
                          search: createSearchParams({
                            ...queryObjects,
                            offset: e.target.id,
                          }).toString(),
                        });
                      }}
                      className="mx-1 w-5 h-5 flex justify-center items-center text-xs rounded-full bg-primary-400 m-1 hover:scale-125 hover:border-secondary-500 hover:shadow hover:shadow-secondary-500 focus:scale-125 focus:shadow focus:shadow-secondary-500"
                    >
                      {number}
                    </button>
                  </li>
                </div>
              );
            })}
          <div id="btnNext" className="">
            <button
              onClick={(e) => {
                navigate({
                  search: createSearchParams({
                    ...queryObjects,
                    offset: Number(queryObjects.offset) + 1
                  }).toString(),
                });
              }}
              className="m-0.5 text-2xl text-secondary-200 border-2 rounded-full border-primary-400 hover:scale-125 hover:shadow hover:shadow-secondary-500"  >
              <BsFillArrowRightCircleFill />
            </button>
            <label className="flex flex-col sm:hidden">Next</label>
          </div>
        </ul>
      </nav>
    </div>
  );
}
