import React, { useEffect, useState } from 'react';
/* import {useDispatch} from "react-redux" */
import { FiArrowRightCircle } from 'react-icons/fi';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useNavigate, useParams, createSearchParams } from 'react-router-dom';
import useURLqueries from './hooks/useURLqueries';

export default function FilterAndOrderComponent() {
  const { idCategory } = useParams();

  const [price, setPrice] = useState({
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    const priceCheckQuery = queryObjects;
    if (price.minPrice === '') {
      delete queryObjects.minPrice;
    }
    if (price.maxPrice === '') {
      delete queryObjects.maxPrice;
    }
    navigate({
      search: createSearchParams({
        ...priceCheckQuery,
      }).toString(),
    });
  }, [price]);
  const queryObjects = useURLqueries();
  const navigate = useNavigate();

  useEffect(() => {
    if (!queryObjects.minPrice && !queryObjects.maxPrice) {
      document.getElementById("minimo").value = ""
      document.getElementById("maximo").value = ""
    }
  }, [queryObjects.categoryId])


  function onChange(e) {
    e.preventDefault();
    if (e.target.id === 'minimo') {
      setPrice({
        ...price,
        minPrice: e.target.value,
      });
    }
    if (e.target.id === 'maximo') {
      setPrice({
        ...price,
        maxPrice: e.target.value,
      });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const priceQuery = {};
    if (price.minPrice !== '') {
      priceQuery.minPrice = price.minPrice;
    }
    if (price.maxPrice !== '') {
      priceQuery.maxPrice = price.maxPrice;
    }
    navigate({
      search: createSearchParams({
        ...queryObjects,
        ...priceQuery,
      }).toString(),
    });
  }

  function handleClickBtns(e) {
    e.preventDefault();
    if (e.target.id === "FreeShipping") {
      if (queryObjects.freeShipping && queryObjects.freeShipping === "true") {
        navigate({
          search: createSearchParams({
            ...queryObjects,
            freeShipping: 'false',
          }).toString(),
        });
      } else {
        navigate({
          search: createSearchParams({
            ...queryObjects,
            freeShipping: 'true',
          }).toString(),
        });
      }
    }
    if (e.target.id === "HigestToLowest") {
      if (queryObjects.order === "DESC") {
        delete queryObjects.order;
      } else {
        queryObjects.order = 'DESC';
      }
      navigate({
        search: createSearchParams({
          ...queryObjects,
        }).toString(),
      });
      if (!document.getElementById('LowestToHighest').classList.contains('bg-white')) {
        document.getElementById('LowestToHighest').classList.toggle('bg-white');
      }
    }
    if (e.target.id === 'LowestToHighest') {
      if (queryObjects.order === 'ASC') {
        delete queryObjects.order;
      } else {
        queryObjects.order = 'ASC';
      }
      navigate({
        search: createSearchParams({
          ...queryObjects,
        }).toString(),
      });
      if (!document.getElementById("HigestToLowest").classList.contains("bg-white")) {
        document.getElementById("HigestToLowest").classList.toggle("bg-white");
      }
    }
    /* if (e.target.id === "LessThan") {
      document.getElementById("LessThan").classList.toggle("bg-white");
      if (!document.getElementById("MoreThan").classList.contains("bg-white")) {
        document.getElementById("MoreThan").classList.toggle("bg-white");
      }
    }
    if (e.target.id === 'MoreThan') {
      document.getElementById('MoreThan').classList.toggle('bg-white');
      if (!document.getElementById('LessThan').classList.contains('bg-white')) {
        document.getElementById('LessThan').classList.toggle('bg-white');
      }
    } */
  }


  useEffect(() => {
    /* FreeShipping */
    if (queryObjects.freeShipping === "true") {
      document.getElementById("FreeShipping").classList.remove("bg-white");
    } else {
      document.getElementById("FreeShipping").classList.add("bg-white");
    }
    /* FreeShipping */

    /* HigsetToLowest */
    if (queryObjects.order === "DESC") {
      document.getElementById("HigestToLowest").classList.remove("bg-white");
    } else {
      document.getElementById("LowestToHighest").classList.remove("bg-white");
    }
    if (!queryObjects.order) {
      document.getElementById("HigestToLowest").classList.add("bg-white");
      document.getElementById("LowestToHighest").classList.add("bg-white");
    }
    /* HigsetToLowest */
  }, [queryObjects])




  function onClickGenralOptions() {
    document.getElementById('generalOptions').classList.toggle('hidden');
  }

  return (
    <div className="sm:w-52 h-fit rounded-xl font-lora font-semibold">
      <div className="p-2 m-auto flex justify-center items-center bg-white rounded shadow-sm mt-2 text-center">
        <h1 className="font-bold font-lora p-2 items-center">Filters</h1>
      </div>
      <div className="text-center">
        <h5>{idCategory}</h5>
      </div>

      {/* Button mobile */}
      <div className="text-center sm:hidden">
        <button className="text-primary-600" onClick={onClickGenralOptions}>
          <MdOutlineArrowDropDownCircle />
        </button>
      </div>
      {/*  */}

      <div id="generalOptions" className="hidden sm:block">
        <div className=" flex flex-row justify-between	m-3  items-center bg-gray-200 rounded-md">
          <label className="m-1">Free Shipping</label>
          <div className="m-1 bg-primary-600 h-4 w-4 rounded-full flex items-center justify-center ">
            <input
              id="FreeShipping"
              type="submit"
              value="  "
              className=" bg-white rounded-full h-3 w-3 cursor-pointer"
              onClick={(e) => handleClickBtns(e)}
            />
          </div>
        </div>

        <div className=" flex m-3 items-center bg-gray-200 rounded-md">
          <ul className="w-full">
            <label className="m-1">Sort by price:</label>
            <li>
              <div className=" flex justify-between items-center bg-gray-200 rounded-md">
                <label className="m-1">Lowest to highest</label>
                <div className="m-1 bg-primary-600 h-4 w-4 rounded-full flex items-center justify-center ">
                  <input
                    id="LowestToHighest"
                    type="submit"
                    value="  "
                    className="bg-white rounded-full h-3 w-3 cursor-pointer"
                    onClick={(e) => handleClickBtns(e)}
                  />
                </div>
              </div>
            </li>

            <li>
              <div className=" flex justify-between items-center bg-gray-200 rounded-md">
                <label className="m-1">Higest to lowest</label>
                <div className="m-1 bg-primary-600 h-4 w-4 rounded-full flex items-center justify-center ">
                  <input
                    id="HigestToLowest"
                    type="submit"
                    value="  "
                    className="bg-white rounded-full h-3 w-3 cursor-pointer"
                    onClick={(e) => handleClickBtns(e)}
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="m-3 items-center bg-gray-200 rounded-md">
          <ul className="w-full">
            <label className="m-1">Price:</label>

            <li className="hidden">
              <div className=" flex justify-between items-center bg-gray-200 rounded-md">
                <label className="m-1">Less than $5000</label>
                <div className="m-1 bg-primary-600 h-4 w-4 rounded-full flex items-center justify-center ">
                  <input
                    id="LessThan"
                    type="submit"
                    value="  "
                    className="bg-white rounded-full h-3 w-3 cursor-pointer"
                    onClick={(e) => handleClickBtns(e)}
                  />
                </div>
              </div>
            </li>

            <li className="hidden">
              <div className=" flex justify-between items-center bg-gray-200 rounded-md">
                <label className="m-1">More than $5000</label>
                <div className="m-1 bg-primary-600 h-4 w-4 rounded-full flex items-center justify-center ">
                  <input
                    id="MoreThan"
                    type="submit"
                    value="  "
                    className="bg-white rounded-full h-3 w-3 cursor-pointer"
                    onClick={(e) => handleClickBtns(e)}
                  />
                </div>
              </div>
            </li>

            <li>
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex justify-between bg-gray-200 rounded-md"
              >
                <input
                  id="minimo"
                  type="number"
                  value={price.minPrice}
                  placeholder="Min"
                  className="m-1 w-20 rounded-sm"
                  onChange={(e) => onChange(e)}
                />
                <input
                  id="maximo"
                  type="number"
                  value={price.maxPrice}
                  placeholder="Max"
                  className="m-1 w-20 rounded-sm"
                  onChange={(e) => onChange(e)}
                />
                <button type="submit" className="hidden"></button>
              </form>
              <FiArrowRightCircle
                className=" m-auto w-20 h-7 rounded-sm cursor-pointer"
                onClick={(e) => handleSubmit(e)}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
