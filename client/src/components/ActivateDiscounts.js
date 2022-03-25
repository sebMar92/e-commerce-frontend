import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import NavbarAdmin from './NavbarAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { getSales } from '../Redux/Actions/actions';

export default function ActivateDiscounts() {
  const allSales = useSelector((state) => state.admin.sales);
  const [tab, setTab] = useState(true);
  const [selectedItem, setSelectedItem] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSales());
  }, []);
  function handleTab(e) {
    setTab(!tab);
  }
  function handleItem(e) {
    const items = document.getElementsByClassName('saleItem');
    for (const item of items) {
      item.classList.toggle('hidden');
    }
    e.target.classList.toggle('hidden');
    e.target.classList.toggle('bg-secondary-100');
    e.target.classList.toggle('bg-primary-300');
    e.target.classList.toggle('font-medium');
    if (selectedItem !== e.target.id) {
      setSelectedItem(e.target.id);
    } else {
      setSelectedItem(0);
    }
  }
  return (
    <>
      <NavBar />
      <div className="flex flex-col sm:flex-row">
        <NavbarAdmin />
        <div className="w-full mt-5 ml-5 mr-5 ">
          <div className="flex flex-row justify-center w-full bg-primary-500 rounded-t-lg">
            <div
              onClick={(e) => handleTab(e)}
              className={`rounded-tl-lg grow font-medium text-lg px-1 py-1 text-slate-900 flex justify-center hover:bg-primary-400 ${
                !tab && 'bg-primary-300 border-b-2 border-primary-500'
              }`}
            >
              Active sales
            </div>
            <div
              onClick={(e) => handleTab(e)}
              className={`rounded-tr-lg grow font-medium text-lg px-1 py-1 text-slate-900 flex justify-center hover:bg-primary-400 ${
                tab && 'bg-primary-300 border-b-2 border-primary-500'
              }`}
            >
              Create sales
            </div>
          </div>
          <div className="border-x-2 border-b-2 border-primary-500 h-[70vh] overflow-y-scroll">
            {allSales &&
              allSales.map((sale) => {
                return (
                  <div key={sale.id}>
                    <div
                      id={sale.id}
                      onClick={(e) => handleItem(e)}
                      className="saleItem border-t-4 mx-2 border-white p-4 bg-secondary-100 hover:bg-primary-200 hover:font-medium"
                    >
                      {sale.description}
                    </div>
                    <form id={sale.id} className="m-2 ">
                      <div className="bg-secondary-100 flex p-4">
                        <div className="w-1/12">Percentage: </div>
                        <input
                          placeholder={sale.percentage}
                          className="ml-2 rounded-sm border border-primary-500 pl-2"
                        ></input>
                      </div>
                      <div className="bg-secondary-100 flex p-4">
                        <div className="w-1/12">Days: </div>
                        <ul className="ml-2 rounded-sm flex pl-2">
                          <li className="mr-2"> Monday</li>
                          <li className="mr-2"> Tuesday</li>
                          <li className="mr-2"> Wednesday</li>
                          <li className="mr-2"> Thursday</li>
                          <li className="mr-2"> Friday</li>
                          <li className="mr-2"> Saturday</li>
                          <li className="mr-2"> Sunday</li>
                          <li className="mr-2"> All</li>
                        </ul>
                      </div>
                    </form>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
