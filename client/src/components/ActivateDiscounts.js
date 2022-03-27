import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import NavbarAdmin from './NavbarAdmin';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteSale,
  editSale,
  getAllProductsForSales,
  getSales,
  postSale,
} from '../Redux/Actions/actions';
import Pick from './commons/Pick.js';
import ButtonComplete from './commons/ButtonComplete.js';

export default function ActivateDiscounts() {
  var allSales = useSelector((state) => state.admin.sales);
  const categories = useSelector((state) => state.home.categories);
  const products = useSelector((state) => state.admin.salesAllProducts);
  const [reRender, setReRender] = useState({});
  const [tab, setTab] = useState(true);
  const [sale, setSale] = useState({
    description: '',
    percentage: '',
    day: '',
    productAmount: 0,
    image: 'https://shamanicartshop.com/wp-content/uploads/2021/04/sale_tag_1_.jpg',
    categories: [],
    products: [],
    id: 0,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSales());
    dispatch(getAllProductsForSales());
  }, [reRender]);
  function handleTab(e) {
    setTab(!tab);
  }
  useEffect(() => {
    const items = document.getElementsByClassName('saleItem');
    const dropdown = document.getElementById('dropdown');
    if (tab) {
      if (items) {
        for (const item of items) {
          item.classList.remove('hidden');
          item.classList.remove('bg-primary-300');
          item.classList.add('bg-secondary-100');
        }
      }
      if (dropdown) {
        dropdown.classList.add('hidden');
      }
    } else {
      if (items) {
        for (const item of items) {
          item.classList.add('hidden');
          item.classList.remove('bg-primary-300');
          item.classList.add('bg-secondary-100');
        }
      }
      if (dropdown) {
        dropdown.classList.remove('hidden');
      }
      setSale({
        description: '',
        percentage: '',
        day: '',
        image: 'https://shamanicartshop.com/wp-content/uploads/2021/04/sale_tag_1_.jpg',
        productAmount: 0,
        categories: [],
        products: [],
        id: 0,
      });
    }
  }, [tab]);
  function handleItem(e) {
    if (sale.id !== e.target.id) {
      setSale({
        ...sale,
        id: e.target.id,
        description: e.target.getAttribute('description'),
        percentage: e.target.getAttribute('percentage'),
        day: e.target.getAttribute('day'),
        image: e.target.getAttribute('image'),
        productAmount: e.target.getAttribute('amount'),
        categories: allSales[e.target.getAttribute('index')].categories,
        products: allSales[e.target.getAttribute('index')].products,
      });
    } else {
      setSale({
        description: '',
        percentage: '',
        day: '',
        image: 'https://shamanicartshop.com/wp-content/uploads/2021/04/sale_tag_1_.jpg',
        productAmount: 0,
        categories: [],
        products: [],
        id: 0,
      });
    }
  }
  useEffect(() => {
    const items = document.getElementsByClassName('saleItem');
    const dropdown = document.getElementById('dropdown');
    if (sale.id !== 0) {
      const selectedItem = document.getElementById(sale.id);

      for (const item of items) {
        item.classList.add('hidden');
        item.classList.remove('bg-primary-300');
        item.classList.add('bg-secondary-100');
      }
      dropdown.classList.remove('hidden');
      selectedItem.classList.toggle('hidden');
      selectedItem.classList.toggle('bg-secondary-100');
      selectedItem.classList.toggle('bg-primary-300');
    } else {
      if (tab) {
        if (items) {
          for (const item of items) {
            item.classList.remove('hidden');
            item.classList.remove('bg-primary-300');
            item.classList.add('bg-secondary-100');
          }
          if (dropdown) {
            dropdown.classList.add('hidden');
          }
        }
      }
    }
  }, [sale.id]);
  function handleDay(e) {
    if (sale.day !== e.target.id) {
      setSale({ ...sale, day: e.target.id });
    } else {
      setSale({ ...sale, day: '' });
    }
  }
  function handleAmountUnlock() {
    sale.productAmount > 0
      ? setSale({ ...sale, productAmount: 0 })
      : setSale({ ...sale, productAmount: 1 });
  }
  useEffect(() => {
    const yes = document.getElementById('yes');
    const no = document.getElementById('no');
    const howmany = document.getElementById('howmany');
    if (yes && no) {
      if (sale.productAmount > 0) {
        yes.classList.remove('bg-white');
        yes.classList.add('bg-primary-500');
        howmany.classList.remove('hidden');
        no.classList.remove('bg-primary-500');
        no.classList.add('bg-white');
      } else {
        no.classList.remove('bg-white');
        no.classList.add('bg-primary-500');
        yes.classList.remove('bg-primary-500');
        yes.classList.add('bg-white');
        howmany.classList.add('hidden');
      }
    }
  }, [sale.productAmount]);
  function handleInputChange(e) {
    setSale({ ...sale, [e.target.id]: e.target.value });
  }
  function setCategories(ids) {
    setSale({ ...sale, categories: ids });
  }
  function setProducts(ids) {
    setSale({ ...sale, products: ids });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (tab) {
      if (sale.id !== 0) {
        dispatch(editSale({ ...sale, id: Number(sale.id.replace('sale ', '')) }));
        setSale({
          description: '',
          percentage: '',
          day: '',
          image: 'https://shamanicartshop.com/wp-content/uploads/2021/04/sale_tag_1_.jpg',
          productAmount: 0,
          categories: [],
          products: [],
          id: 0,
        });
      }
    } else {
      dispatch(
        postSale({
          description: sale.description,
          percentage: sale.percentage,
          day: sale.day,
          image: sale.image,
          productAmount: sale.productAmount,
          categories: sale.categories,
          products: sale.products,
        })
      );
      setSale({
        description: '',
        percentage: '',
        day: '',
        image: 'https://shamanicartshop.com/wp-content/uploads/2021/04/sale_tag_1_.jpg',
        productAmount: 0,
        categories: [],
        products: [],
        id: 0,
      });
    }
    setReRender({});
  }
  function handleDelete(e) {
    dispatch(deleteSale(e.target.id));
    const items = document.getElementsByClassName('saleItem');
    const dropdown = document.getElementById('dropdown');
    if (tab) {
      if (items) {
        for (const item of items) {
          item.classList.remove('hidden');
          item.classList.remove('bg-primary-300');
          item.classList.add('bg-secondary-100');
        }
      }
      if (dropdown) {
        dropdown.classList.add('hidden');
      }
    }
    setReRender({});
  }
  useEffect(() => {
    const selected = document.getElementById(sale.day);
    const others = document.getElementsByClassName('dayItem');
    if (others) {
      for (const other of others) {
        other.classList.remove('bg-primary-500');
        other.classList.add('bg-white');
      }
    }
    if (selected) {
      selected.classList.add('bg-primary-500');
      selected.classList.remove('bg-white');
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
              id="activeTab"
              onClick={(e) => handleTab(e)}
              className={`select-none rounded-tl-lg grow font-medium text-lg px-1 py-1 text-slate-900 flex justify-center hover:bg-primary-400 ${
                !tab && 'bg-primary-300 border-b-2 border-primary-500'
              }`}
            >
              Active sales
            </div>
            <div
              id="createTab"
              onClick={(e) => handleTab(e)}
              className={`select-none rounded-tr-lg grow font-medium text-lg px-1 py-1 text-slate-900 flex justify-center hover:bg-primary-400 ${
                tab && 'bg-primary-300 border-b-2 border-primary-500'
              }`}
            >
              Create sales
            </div>
          </div>
          <div className="border-x-2 border-b-2 border-primary-500 h-fit ">
            {allSales &&
              allSales
                .sort((a, b) => a.id - b.id)
                .map((sale, index) => {
                  return (
                    <div id={'sale ' + sale.id} key={sale.id} className="saleItem ">
                      <div
                        id={'sale ' + sale.id}
                        className="flex flex-row justify-between border-white"
                      >
                        <div
                          description={sale.description}
                          percentage={sale.percentage}
                          day={sale.day}
                          amount={sale.productAmount}
                          index={index}
                          image={sale.image}
                          id={'sale ' + sale.id}
                          onClick={(e) => handleItem(e)}
                          className="flex grow w-full border-t-4 border-x-4 border-white p-4 bg-secondary-100 hover:bg-primary-200 hover:font-medium"
                        >
                          {sale.description}
                        </div>
                        <div
                          id={sale.id}
                          onClick={(e) => handleDelete(e)}
                          className="grow-0 pl-5 justify-center w-14 border-t-4 border-r-4 border-white p-4 bg-secondary-100 hover:bg-rose-700 hover:font-medium"
                        >
                          X
                        </div>
                      </div>
                    </div>
                  );
                })}
            <form
              onSubmit={(e) => handleSubmit(e)}
              id={'dropdown'}
              className="h-[70vh] border-4 border-white w-full bg-secondary-100 grid overflow-hidden grid-lines grid-cols-5 grid-rows-2 gap-2"
            >
              <div className="col-span-3">
                <div className="bg-secondary-100 flex p-4 items-center">
                  <div>Description: </div>
                  <input
                    id="description"
                    value={sale.description}
                    onChange={(e) => handleInputChange(e)}
                    className="ml-2 rounded-sm border border-primary-500 w-full pl-2"
                  ></input>
                </div>
                <div className="bg-secondary-100 flex p-4 items-center">
                  <div>Percentage: </div>
                  <input
                    id="percentage"
                    value={sale.percentage}
                    onChange={(e) => handleInputChange(e)}
                    type="number"
                    className="ml-2 rounded-sm border border-primary-500 pl-2"
                  ></input>
                </div>
                <div className="bg-secondary-100 flex p-4 items-center">
                  <div>Requires more than one? </div>
                  <span
                    id="yes"
                    onClick={(e) => handleAmountUnlock(e)}
                    className={`yes mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300`}
                  ></span>
                  Yes
                  <span
                    id="no"
                    onClick={(e) => handleAmountUnlock(e)}
                    className={`no mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300`}
                  ></span>
                  No
                  <div id="howmany" className="flex">
                    <div className="ml-4">How many? </div>
                    <input
                      id="productAmount"
                      value={sale.productAmount}
                      onChange={(e) => handleInputChange(e)}
                      type="number"
                      className="ml-2 rounded-sm border border-primary-500 pl-2"
                    ></input>
                  </div>
                </div>
                <div className="bg-secondary-100 flex p-4 items-center">
                  <div className="mr-2">Days: </div>
                  <span
                    id="monday"
                    onClick={(e) => handleDay(e)}
                    className={`dayItem monday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300`}
                  ></span>
                  Monday
                  <span
                    id="tuesday"
                    onClick={(e) => handleDay(e)}
                    className={`dayItem tuesday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300`}
                  ></span>
                  Tuesday
                  <span
                    id="wednesday"
                    onClick={(e) => handleDay(e)}
                    className={`dayItem wednesday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300`}
                  ></span>
                  Wednesday
                  <span
                    id="thursday"
                    onClick={(e) => handleDay(e)}
                    className={`dayItem thursday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300`}
                  ></span>
                  Thursday
                  <span
                    id="friday"
                    onClick={(e) => handleDay(e)}
                    className={`dayItem friday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300`}
                  ></span>
                  Friday
                  <span
                    id="saturday"
                    onClick={(e) => handleDay(e)}
                    className={`dayItem saturday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300`}
                  ></span>
                  Saturday
                  <span
                    id="sunday"
                    onClick={(e) => handleDay(e)}
                    className={`dayItem sunday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300`}
                  ></span>
                  Sunday
                  <span
                    id="all"
                    onClick={(e) => handleDay(e)}
                    className={`dayItem all mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300`}
                  ></span>
                  All
                </div>
              </div>

              <div className="ml-4 w-full flex-col justify-center align-center row-start-2 col-span-3">
                <img
                  src={sale.image && sale.image}
                  className="h-2/5 w-fit object-contain max-h-80"
                />
                New image:
                <input
                  placeholder="Image URL..."
                  id="image"
                  onChange={(e) => handleInputChange(e)}
                  className="mt-2 ml-2 w-1/2 border rounded border-primary-500 pl-2 "
                />
              </div>
              <div className="h-3/4 flex justify-evenly row-span-2 col-span-2">
                <Pick
                  array={categories}
                  title={'Bind to categories?'}
                  callback={setCategories}
                  picked={sale.categories}
                />
                <Pick
                  array={products}
                  title={'Bind to products?'}
                  callback={setProducts}
                  picked={sale.products}
                />
              </div>
              <button
                type="submit"
                value={sale.image}
                onSubmit={(e) => handleSubmit(e)}
                className="bg-primary-500 p-3 rounded hover:bg-primary-700 col-span-5"
              >
                {(tab && 'Save changes') || 'Create new sale'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
