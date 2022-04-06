import React, { useEffect, useState } from 'react';
import NavbarAdmin from './NavbarAdmin';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteSale,
  editSale,
  getAllProductsForSales,
  getCategories,
  getSales,
  postSale,
} from '../Redux/Actions/actions';
import Pick from './commons/Pick.js';
import NavBarEmpty from './NavBarEmpty';
import Axios from 'axios';
import useURLqueries from './hooks/useURLqueries';

export default function ActivateDiscounts() {
  var allSales = useSelector((state) => state.admin.sales);
  const categories = useSelector((state) => state.home.categories);
  const products = useSelector((state) => state.admin.salesAllProducts);
  const deleteUpdate = useSelector((state) => state.admin.deleted);
  const queryObjects = useURLqueries();
  const [reRender, setReRender] = useState({});
  const [tab, setTab] = useState(true);
  const [errors, setErrors] = useState({});
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
    if (
      queryObjects.hasOwnProperty('p') &&
      products.length > 0 &&
      sale.products.length === 0
    ) {
      setTab(false);
    }
  }, []);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProductsForSales());
    dispatch(getSales());
  }, [reRender, deleteUpdate]);

  const validate = (input) => {
    let errors = {};
    if (input.description === '') {
      errors.description = 'Description required';
    } else if (!/^[a-zA-Z0-9_: &()]+$/.test(input.description)) {
      errors.description = 'Invalid description';
    }
    if (input.percentage === '') {
      errors.percentage = 'Percentage required';
    } else if (!/^\d+$/.test(input.percentage)) {
      errors.percentage = 'Invalid percentage';
    }
    if (!input.image) {
    } else if (
      !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/g.test(
        input.image
      )
    ) {
      errors.image = 'Invalid link image';
    }
    return errors;
  };

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
      if (queryObjects.hasOwnProperty('p')) {
        const productInUrl = products.find((product) => product.id == queryObjects.p);
        setSale({
          description: '',
          percentage: '',
          day: '',
          image: 'https://shamanicartshop.com/wp-content/uploads/2021/04/sale_tag_1_.jpg',
          productAmount: 0,
          categories: [],
          products: [productInUrl],
          id: 0,
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
    setErrors(validate({ ...sale, [e.target.id]: e.target.value }));
  }
  function setCategories(ids) {
    setSale({ ...sale, categories: ids });
  }
  function setProducts(ids) {
    setSale({ ...sale, products: ids });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (errors === {}) {
      if (tab) {
        if (sale.id !== 0) {
          dispatch(editSale({ ...sale, id: Number(sale.id.replace('sale ', '')) }));
          setSale({
            description: '',
            percentage: '',
            day: '',
            image:
              'https://shamanicartshop.com/wp-content/uploads/2021/04/sale_tag_1_.jpg',
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
    } else {
      alert('Some fields are missing. Check again');
    }
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

  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ecommerce');
    const newAxios = Axios.create();
    newAxios
      .post('https://api.cloudinary.com/v1_1/dmjbff5rm/image/upload', formData)
      .then((res) => {
        setSale({
          ...sale,
          image: res.data.secure_url,
        });
      });
  };

  /* function handleDeleteImage(e) {
    e.preventDefault();
    setSale({
      ...sale,
      image: "",
    });
  } */
  return (
    <>
      <NavBarEmpty />
      <div className="sm:flex dark:bg-slate-700 dark:text-white font-lora">
        <NavbarAdmin />
        <div className="w-full xl:w-[85rem] h-screen dark:text-white">
          <div className="flex flex-row w-full justify-center bg-primary-500 rounded-t-lg dark:text-white ">
            <div
              id="activeTab"
              onClick={(e) => handleTab(e)}
              className={`select-none rounded-tl-lg grow font-medium text-lg px-1 py-1 text-slate-900 flex justify-center hover:bg-primary-400 dark:bg-slate-700 dark:text-white dark:text-white dark:hover:bg-slate-900 ${
                !tab &&
                'bg-primary-300 border-b-2 border-primary-500 dark:bg-slate-700 dark:text-white'
              }`}
            >
              Active sales
            </div>
            <div
              id="createTab"
              onClick={(e) => handleTab(e)}
              className={`select-none rounded-tr-lg grow font-medium text-lg px-1 py-1 text-slate-900 flex justify-center hover:bg-primary-400 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-900 ${
                tab &&
                'bg-primary-300 border-b-2 border-primary-500 dark:bg-slate-700 dark:text-white'
              }`}
            >
              Create sales
            </div>
          </div>
          <div className="border-x-2 border-b-2 border-primary-500 h-fit dark:bg-slate-900 dark:text-white dark:border-slate-400">
            {allSales &&
              allSales
                .sort((a, b) => a.id - b.id)
                .map((sale, index) => {
                  return (
                    <div id={'sale ' + sale.id} key={sale.id} className="saleItem ">
                      <div
                        id={'sale ' + sale.id}
                        className="flex flex-row justify-between border-white dark:bg-slate-900 dark:text-white"
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
                          className="flex grow w-full border-t-4 border-x-4 border-white p-4 bg-secondary-100 hover:bg-primary-200 hover:font-medium dark:bg-slate-800 dark:text-white dark:border-slate-900 dark:hover:bg-slate-400"
                        >
                          {sale.description}
                        </div>
                        <div
                          id={sale.id}
                          onClick={(e) => handleDelete(e)}
                          className="grow-0 pl-5 justify-center w-14 border-t-4 border-r-4 border-white p-4 bg-secondary-100 hover:bg-rose-700 hover:font-medium dark:bg-slate-800 dark:text-white dark:border-slate-900 dark:hover:bg-rose-400"
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
              className=" w-full border-4 border-white bg-secondary-100 flex-col dark:bg-slate-700 dark:border-slate-900"
            >
              <div className="">
                <div className="sm:flex">
                  <div className="col-span-3 mr-3">
                    <div className="bg-secondary-100 p-4 items-center dark:bg-slate-700">
                      <div>Description: </div>
                      <div className="flex-col">
                        <input 
                          id="description"
                          value={sale.description}
                          type="text-area"
                          onChange={(e) => handleInputChange(e)}
                          className="ml-2 rounded-sm border border-primary-500 w-full pl-2 dark:bg-slate-700"
                        ></input>
                        <strong>{errors.description}</strong>
                      </div>
                    </div>
                    <div className="bg-secondary-100 p-4 items-center dark:bg-slate-700">
                      <div>Percentage: </div>
                      <div className="flex-col">
                        <input
                          id="percentage"
                          value={sale.percentage}
                          onChange={(e) => handleInputChange(e)}
                          type="number"
                          className="ml-2 rounded-sm border border-primary-500 flex w-full pl-2 dark:bg-slate-700"
                        ></input>
                        <strong>{errors.percentage}</strong>
                      </div>
                    </div>
                    <div className="flex-col sm:bg-secondary-100 flex p-4 items-center dark:bg-slate-700">
                      <div className="text-center">Requires more than one? </div>
                      <div className="flex">
                        <span
                          id="yes"
                          onClick={(e) => handleAmountUnlock(e)}
                          className={`yes mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300 dark:hover:bg-slate-700`}
                        ></span>
                        Yes
                        <span
                          id="no"
                          onClick={(e) => handleAmountUnlock(e)}
                          className={`no mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300 dark:hover:bg-slate-700`}
                        ></span>
                        No
                      </div>

                      <div id="howmany" className="flex">
                        <div className="ml-4">How many? </div>
                        <input
                          id="productAmount"
                          value={sale.productAmount}
                          onChange={(e) => handleInputChange(e)}
                          type="number"
                          className="ml-2 rounded-sm border border-primary-500 w-full pl-2 dark:bg-slate-700"
                        ></input>
                      </div>
                    </div>
                    <div className="mr-2 text-center">Days: </div>
                    <div className="grid grid-cols-2 gap-1 bg-secondary-100 sm:grid-cols-2 lg:grid-cols-3 p-4 items-center dark:bg-slate-700">
                      <div className="flex">
                        <span
                          id="monday"
                          onClick={(e) => handleDay(e)}
                          className={`dayItem monday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300 dark:hover:bg-slate-700`}
                        ></span>
                        <h4>Monday</h4>
                      </div>
                      <div className="flex">
                        <span
                          id="tuesday"
                          onClick={(e) => handleDay(e)}
                          className={`dayItem tuesday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300 dark:hover:bg-slate-700`}
                        ></span>
                        <h4>Tuesday</h4>
                      </div>
                      <div className="flex">
                        <span
                          id="wednesday"
                          onClick={(e) => handleDay(e)}
                          className={`dayItem wednesday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300 dark:hover:bg-slate-700`}
                        ></span>
                        <h4>Wednesday</h4>
                      </div>
                      <div className="flex">
                        <span
                          id="thursday"
                          onClick={(e) => handleDay(e)}
                          className={`dayItem thursday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300 dark:hover:bg-slate-700`}
                        ></span>
                        <h4>Thursday</h4>
                      </div>
                      <div className="flex">
                        <span
                          id="friday"
                          onClick={(e) => handleDay(e)}
                          className={`dayItem friday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300 dark:hover:bg-slate-700`}
                        ></span>
                        <h4>Friday</h4>
                      </div>
                      <div className="flex">
                        <span
                          id="saturday"
                          onClick={(e) => handleDay(e)}
                          className={`dayItem saturday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300 dark:hover:bg-slate-700`}
                        ></span>
                        <h4>Saturday</h4>
                      </div>
                      <div className="flex">
                        <span
                          id="sunday"
                          onClick={(e) => handleDay(e)}
                          className={`dayItem sunday mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300 dark:hover:bg-slate-700`}
                        ></span>
                        <h4>Sunday</h4>
                      </div>
                      <div className="flex">
                        <span
                          id="all"
                          onClick={(e) => handleDay(e)}
                          className={`dayItem all mr-1 ml-2 rounded-sm border w-4 h-4 border-primary-500 pl-2 bg-white hover:border-2 hover:bg-primary-300 dark:hover:bg-slate-700`}
                        ></span>
                        <h4>All</h4>
                      </div>
                    </div>
                  </div>
                  <div className="ml-2 w-full flex-col justify-center align-center row-start-2 col-span-3 mb-6 ">
                    <div className="h-64 flex justify-evenly row-span-2 col-span-2 lg:h-96">
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
                  </div>
                </div>
                {/* <div className="flex">
                {sale.image && (
                  <div className="flex border-1 border-primary-500  rounded-lg bg-gray-50">
                    <img
                      className="w-10 h-10 m-1"
                      src={sale.image}
                      alt={sale.image}
                    />
                    <button
                      className="bg-primary-500 w-6 my-0.5  rounded-lg hover:bg-primary-400"
                      name={sale.image}
                      onClick={(e) => handleDeleteImage(e)}
                    >
                      X
                    </button>
                  </div>
                )}
              </div> */}

                <div className=" mt-24 sm:mt-10 sm:flex-col ml-2">
                  <div className="mr-2 sm:flex">
                    <img
                      src={sale.image && sale.image}
                      className="h-20 w-40"
                      alt="Not found"
                    />
                    <div className="flex-col">
                      <input
                        placeholder="Image URL..."
                        id="image"
                        onChange={(e) => handleInputChange(e)}
                        className="mt-7 mb-2 ml-2 mr-2 h-fit border rounded border-primary-500 w-full pl-2 dark:text-white dark:bg-slate-700"
                      />
                      <strong>{errors.image}</strong>
                    </div>
                  </div>

                  <input
                    type="file"
                    onChange={(e) => {
                      uploadImage(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
              <br />
              <button
                disabled={errors?.disabledSubmit}
                type="submit"
                value={sale.image}
                onSubmit={(e) => handleSubmit(e)}
                className="bg-primary-500 p-3 rounded hover:bg-primary-700 w-full col-span-5 dark:hover:text-white dark:hover:bg-slate-900 dark:hover:shadow-slate-600 dark:bg-slate-400 dark:text-slate-900 dark:shadow-slate-900"
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
