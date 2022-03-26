import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import NavbarAdmin from './NavbarAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { getSales } from '../Redux/Actions/actions';

export default function ActivateDiscounts() {
  const allSales = useSelector((state) => state.admin.sales);
  const [tab, setTab] = useState(true);
  const [sale, setSale] = useState({
    description: '',
    percentage: '',
    day: '',
    productAmount: '',
    category: '',
    product: '',
    id: 0,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSales());
  }, []);
  function handleTab(e) {
    setTab(!tab);
  }
  function handleItem(e) {
    if (sale.id !== e.target.id) {
      setSale({
        ...sale,
        id: e.target.id,
        description: e.target.getAttribute('description'),
        percentage: e.target.getAttribute('percentage'),
        day: e.target.getAttribute('day'),
        productAmount: e.target.getAttribute('amount'),
        category: e.target.getAttribute('category'),
        product: e.target.getAttribute('product'),
      });
    } else {
      setSale({
        description: '',
        percentage: '',
        day: '',
        productAmount: '',
        category: '',
        product: '',
        id: 0,
      });
    }
  }
  function handleDay(e) {
    if (sale.day !== e.target.id) {
      setSale({ ...sale, day: e.target.id });
    } else {
      setSale({ ...sale, day: '' });
    }
  }
  useEffect(() => {
    const items = document.getElementsByClassName('saleItem');
    const dropdowns = document.getElementsByClassName('dropdown');
    if (sale.id !== 0) {
      const selectedItem = document.getElementById(sale.id);
      const selectedDropdown = document.getElementById('dropdown ' + sale.id);
      for (const item of items) {
        item.classList.add('hidden');
        item.classList.remove('bg-primary-300');
        item.classList.add('bg-secondary-100');
      }
      for (const drop of dropdowns) {
        drop.classList.add('hidden');
      }
      selectedItem.classList.toggle('hidden');
      selectedItem.classList.toggle('bg-secondary-100');
      selectedItem.classList.toggle('bg-primary-300');
      selectedDropdown.classList.toggle('hidden');
    } else {
      if (items) {
        for (const item of items) {
          item.classList.remove('hidden');
          item.classList.remove('bg-primary-300');
          item.classList.add('bg-secondary-100');
        }
        if (dropdowns) {
          for (const drop of dropdowns) {
            drop.classList.add('hidden');
          }
        }
      }
    }
  }, [sale.id]);

  useEffect(() => {
    const selected = document.getElementsByClassName(sale.day);
    const others = document.getElementsByClassName('dayItem');
    if (others) {
      for (const other of others) {
        other.classList.remove('bg-primary-500');
        other.classList.add('bg-white');
      }
    }
    if (selected) {
      for (const select of selected) {
        select.classList.add('bg-primary-500');
        select.classList.remove('bg-white');
      }
    }
  }, [sale.day]);
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
                      description={sale.description}
                      percentage={sale.percentage}
                      day={sale.day}
                      amount={sale.productAmount}
                      category={sale.category}
                      product={sale.product}
                      id={'sale ' + sale.id}
                      onClick={(e) => handleItem(e)}
                      className="saleItem border-t-4 mx-2 border-white p-4 bg-secondary-100 hover:bg-primary-200 hover:font-medium"
                    >
                      {sale.description}
                    </div>
                    <form id={'dropdown sale ' + sale.id} className="dropdown m-2 hidden">
                      <div className="bg-secondary-100 flex p-4 items-center ">
                        <div>Percentage: </div>
                        <input
                          placeholder={sale.percentage}
                          className="ml-2 rounded-sm border border-primary-500 pl-2"
                        ></input>
                      </div>
                      <div className="bg-secondary-100 flex p-4 items-center">
                        <div>Requires more than one? </div>
                        <span
                          id="yes"
                          onClick={(e) => handleDay(e)}
                          className={`yes mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2`}
                        ></span>
                        Yes
                        <span
                          id="no"
                          onClick={(e) => handleDay(e)}
                          className={`no mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2`}
                        ></span>
                        No
                        <div className="ml-4">How many? </div>
                        <input
                          placeholder={1}
                          className="ml-2 rounded-sm border border-primary-500 pl-2"
                        ></input>
                      </div>
                      <div className="bg-secondary-100 flex p-4 items-center">
                        <div className="mr-2">Days: </div>
                        <span
                          id="monday"
                          onClick={(e) => handleDay(e)}
                          className={`dayItem monday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2`}
                        ></span>
                        Monday
                        <span
                          id="tuesday"
                          onClick={(e) => handleDay(e)}
                          className={`dayItem tuesday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2`}
                        ></span>
                        Tuesday
                        <span
                          id="wednesday"
                          onClick={(e) => handleDay(e)}
                          className={`dayItem wednesday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2`}
                        ></span>
                        Wednesday
                        <span
                          id="thursday"
                          onClick={(e) => handleDay(e)}
                          className={`dayItem thursday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2`}
                        ></span>
                        Thursday
                        <span
                          id="friday"
                          onClick={(e) => handleDay(e)}
                          className={`dayItem friday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2`}
                        ></span>
                        Friday
                        <span
                          id="saturday"
                          onClick={(e) => handleDay(e)}
                          className={`dayItem saturday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2`}
                        ></span>
                        Saturday
                        <span
                          id="sunday"
                          onClick={(e) => handleDay(e)}
                          className={`dayItem sunday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2`}
                        ></span>
                        Sunday
                        <span
                          id="all"
                          onClick={(e) => handleDay(e)}
                          className={`dayItem all mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2`}
                        ></span>
                        All
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
