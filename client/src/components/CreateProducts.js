import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, postProduct } from '../Redux/Actions/actions';
import { validation } from './validation';
import ButtonCreate from './commons/ButtonCreate';
import check from './utils/check-shield-regular-24.png';
import Modelo from './utils/modelo.jpg';
import mas from './utils/image-add-regular-24.png';
import Slider from './ProductDetails/Slider';
import Axios from 'axios';
import NavbarAdmin from './NavbarAdmin';
import { Cloudinary } from '@cloudinary/url-gen';
import NavBarEmpty from './NavBarEmpty';
import AdminPreview from '../components/AdminPreview';
import { AiOutlineCloseSquare } from 'react-icons/ai';

export default function CreateProducts() {
  const dispatch = useDispatch();
  const allCategories = useSelector((e) => e.home.categories);
  const [newCategory, setNewCategory] = useState('');
  const [inputImages, setInputImages] = useState('');
  const [aprove, setAprove] = useState(false);
  const [denied, setDenied] = useState(false);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    title: '',
    name: '',
    price: '',
    shippingCost: '',
    description: '',
    images: [],
    stock: '',
    categories: [],
  });
  const [repeat, setRepeat] = useState({
    name: [''],
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      setAprove(true);
      dispatch(postProduct(input));
      setInput({
        title: '',
        name: '',
        price: '',
        shippingCost: '',
        description: '',
        images: [],
        stock: '',
        categories: [],
      });

      /* alert("Product Create!!"); */
    } else {
      setDenied(true);
      /* alert("Some fields are missing. Check again"); */
    }
  }
  function handleAddCategory(e) {
    const { value } = e.target;
    setNewCategory(value);
  }
  function handleSubmitAddCategory(e) {
    if (newCategory !== '') {
      setInput({
        ...input,
        categories: [...input.categories, { name: newCategory, id: e.target.id }],
      });
      setNewCategory('');
    }
  }

  function handelChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectCategories(e) {
    if (input.categories) {
      if (!input.categories.includes(e.target.value)) {
        setInput({
          ...input,
          categories: [...input.categories, { name: e.target.value, id: e.target.id }],
        });
      }
    }
  }
  let arr = [];
  let aux = [''];
  const uploadImage = (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      aux.push(files[i].name);
      formData.append('file', files[i]);
      formData.append('upload_preset', 'ecommerce');
      const newAxios = Axios.create();
      newAxios
        .post('https://api.cloudinary.com/v1_1/dmjbff5rm/image/upload', formData)
        .then((res) => {
          arr.push(res.data.secure_url);
          setInput({
            ...input,
            images: [...input.images, ...arr],
          });
        });
    }
    console.log('aux: ' + aux);
    aux.length && setRepeat({ ...repeat, name: [...repeat.name, aux] });
    aux.length && console.log('repeat: ' + repeat.name);
  };

  function addImage(e) {
    /* console.log(e.target.value); */
    for (let i = 0; i < input.images.length; i++) {
      if (inputImages !== input.images[i]) {
        setInput({
          ...input,
          images: [...input.images, inputImages],
        });
        setInputImages('');
      }
    }
  }
  function handleDelete(e) {
    e.preventDefault();
    setInput({
      ...input,
      categories: input.categories.filter((category) => category.name !== e.target.id),
    });
  }

  function handleDeleteImage(e) {
    e.preventDefault();
    setInput({
      ...input,
      images: input.images.flat().filter((name) => name !== e.target.name),
    });
  }

  const desc = input.description && input.description.split('.');
  const description2 = desc && desc.slice(0, -1);

  return (
    <>
      <NavBarEmpty />
      <div className="flex flex-col w-full sm:flex-row font-lora">
        <NavbarAdmin className="dark:text-black w-full" />
        <div className="flex-col bg-secondary-100 dark:bg-slate-700 dark:text-white sm:grid sm:grid-flow-col sm:w-[85rem]">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div>
              {/*  <div className=" justify-end lg:hidden flex ">
                  <button type="button" className="cursor-pointer bg-secondary-100 rounded-md pl-1 pr-1 shadow-sm shadow-slate-900 border border-solid border-primary-500 hover:shadow-md">
                    See Preview
                  </button>
                </div> */}
              <br />

              <h2 className="text-center">Create Product</h2>
              <br />
              <hr />

              <div>
                <div className=" justify-center p-2 ">
                  <label>Title</label>
                  <br />
                  <input
                    className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50 dark:bg-slate-700"
                    type="text"
                    name="title"
                    value={input.title}
                    onChange={(e) => handelChange(e)}
                  />
                  <strong>{errors.title}</strong>
                </div>

                <div className=" justify-center p-2 ">
                  <label>Name</label>
                  <input
                    className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50 dark:bg-slate-700"
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={(e) => handelChange(e)}
                  />
                  <strong>{errors.name}</strong>
                </div>

                <div className=" justify-center p-2 ">
                  <label>Price </label>
                  <input
                    className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50 dark:bg-slate-700"
                    type="text"
                    name="price"
                    placeholder="$ 000.00"
                    value={input.price}
                    onChange={(e) => handelChange(e)}
                  />
                  <strong>{errors.price}</strong>
                </div>

                <div className=" justify-center p-2 ">
                  <label>Shipping Cost</label>
                  <input
                    className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50 dark:bg-slate-700"
                    type="text"
                    name="shippingCost"
                    placeholder="$ 000.00"
                    value={input.shippingCost}
                    onChange={(e) => handelChange(e)}
                  />
                  <strong>{errors.shippingCost}</strong>
                </div>

                <div className=" justify-center p-2 ">
                  <label>Description</label>
                  <textarea
                    className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50 dark:bg-slate-700"
                    type="text"
                    name="description"
                    overflow="auto"
                    value={input.description}
                    onChange={(e) => handelChange(e)}
                  />
                  <strong>{errors.description}</strong>
                </div>

                <div className=" justify-center p-2 ">
                  <label>Stock</label>
                  <input
                    className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50 dark:bg-slate-700"
                    type="number"
                    name="stock"
                    value={input.stock}
                    onChange={(e) => handelChange(e)}
                  />
                </div>
              </div>
              {aprove && (
                <div className="absolute ml-4 justify-center items-center font-lora ">
                  <div className="p-2  w-80 h-50 bg-white rounded-lg ring-1 ">
                    <div className=" mx-3 flex justify-between border-b border-gray-200 p-2">
                      <h3>Confirmation</h3>
                      <button
                        onClick={() => setAprove(false)}
                        className=" text-gray-500 px-1 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#f84d4dd1] hover:text-white shadow-lg shadow-primary-200/80"
                      >
                        x
                      </button>
                    </div>
                    <br />
                    <span className="m-8"> Product Create !! </span>
                    <br />
                    <br />
                    <div className="flex justify-evenly m-3">
                      <button
                        onClick={() => setAprove(false)}
                        className="bg-primary-600 px-4 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {denied && (
                <div className="absolute ml-4 justify-center items-center font-lora ">
                  <div className="p-2  w-80 h-50 bg-white rounded-lg ring-1 ">
                    <div className=" mx-3 flex justify-between border-b border-gray-200 p-2">
                      <h3>Denied</h3>
                      <button
                        onClick={() => setDenied(false)}
                        className=" text-gray-500 px-1 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#f84d4dd1] hover:text-white shadow-lg shadow-primary-200/80"
                      >
                        x
                      </button>
                    </div>
                    <br />
                    <span className="m-8"> Please, fill in all the fields </span>
                    <br />
                    <br />
                    <div className="flex justify-evenly m-3">
                      <button
                        onClick={() => setDenied(false)}
                        className="bg-primary-600 px-4 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className=" justify-center p-2 ">
                <label>Categories</label>
                <select
                  className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50 dark:bg-slate-700"
                  onChange={(e) => handleSelectCategories(e)}
                >
                  <option>Select</option>
                  {allCategories &&
                    allCategories.length > 0 &&
                    allCategories
                      .filter((e) => {
                        let flag = false;
                        if (input.categories && input.categories.length > 0) {
                          for (const cat of input.categories) {
                            if (e.name == cat.name) {
                              flag = true;
                            }
                          }
                        }
                        if (!flag) {
                          return e;
                        }
                      })
                      .map((e) => (
                        <option id={e.id} key={e.id}>
                          {e.name}
                        </option>
                      ))}
                </select>

                <div className="flex mt-1">
                  <input
                    className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50 dark:bg-slate-700"
                    type="text"
                    placeholder="Add Cartegory... "
                    name="categories"
                    value={newCategory}
                    onChange={(e) => {
                      handleAddCategory(e);
                    }}
                  />
                  <button
                    type="button"
                    className="text-secondary-200 bg-secondary-100 w-16 ml-1 border-2 border-gray-300 rounded-md hover:border-2 hover:border-solid hover:border-green-600 hover:text-green-600 dark:hover:text-white dark:hover:bg-slate-900 dark:hover:shadow-slate-600 dark:bg-slate-400 dark:text-slate-900 dark:shadow-slate-900"
                    onClick={(e) => handleSubmitAddCategory(e)}
                  >
                    Add
                  </button>
                </div>

                <div className="">
                  {input.categories &&
                    input.categories.map((category) => {
                      return (
                        <div className="mt-1 flex w-full hover:bg-secondary-100 bg-gray-50 h-8 items-center lg:h-6 border border-solid shadow-sm mb-1 rounded-md lg:hover:border lg:hover:border-solid lg:hover:border-red-500 lg:hover:items-center">
                          {/* <img src={check} alt="check" /> */}

                          <button
                            type="button"
                            id={category.name}
                            onClick={(e) => handleDelete(e)}
                            className="ml-2 w-full flex justify-between lg:hover:block lg:hover:scale-125 lg:hover:text-red-500 "
                          >
                            {category.name}

                            <AiOutlineCloseSquare
                              id={category.name}
                              onClick={(e) => handleDelete(e)}
                              className="lg:hidden text-2xl
                    "
                            />
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="py-2 m-2">
                <label>Images</label>
                <div className="flex">
                  <input
                    className="rounded-md h-9 w-full hover:[bg-secundary-200] border-2 border-gray-300 bg-gray-50 dark:bg-slate-700"
                    type="text"
                    placeholder="URL..."
                    value={inputImages}
                    onChange={(e) => setInputImages(e.target.value)}
                  />
                  <img
                    className="cursor-pointer"
                    onClick={(e) => addImage(e)}
                    src={mas}
                    alt=""
                  />
                </div>
                <div>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      uploadImage(e.target.files);
                    }}
                  ></input>
                </div>
                <div className="flex">
                  {input.images &&
                    input.images.flat().map((name) => {
                      return (
                        <div className="flex border-2 border-primary-500  rounded-lg bg-gray-50">
                          <img className="w-10 h-10 m-0.5 " src={name} alt="" />
                          <button
                            className="bg-primary-500 w-6 my-0.5  rounded-lg hover:bg-primary-400"
                            name={name}
                            onClick={(name) => handleDeleteImage(name)}
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
              {input.title.length && input.categories.length ? (
                <ButtonCreate
                  disabled={errors?.disabledSubmit}
                  text="Create Product"
                  type="button"
                  onClick={(e) => handleSubmit(e)}
                ></ButtonCreate>
              ) : (
                <br />
              )}
            </div>
          </form>
          <div className="bg-secondary-100 dark:bg-slate-700">
            <br />
            <h2 className="text-center dark:bg-slate-700 dark:text-white">Preview</h2>
            <br />
            <hr />
            {/* previsualizacion */}
            <div>
              <AdminPreview input={input} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
