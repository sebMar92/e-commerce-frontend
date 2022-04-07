import NavbarAdmin from "./NavbarAdmin";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductByID, putProductByID } from "../Redux/Actions/actions";
import React, { useState, useEffect } from "react";
import { getCategories } from "../Redux/Actions/actions";
import { validation } from "./validation";
import ButtonCreate from "./commons/ButtonCreate";
import ButtonDiscard from "./commons/ButtonDiscard";
import check from "./utils/check-shield-regular-24.png";
import Modelo from "./utils/modelo.jpg";
import mas from "./utils/image-add-regular-24.png";
import Slider from "./ProductDetails/Slider";
import NavBarEmpty from "./NavBarEmpty";
import Axios from "axios";
import { AiOutlineConsoleSql } from "react-icons/ai";
import AdminPreview from "../components/AdminPreview";
import { AiOutlineCloseSquare } from "react-icons/ai";

export default function EditProducts() {
  const { idProduct } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productID.product);
  const allCategories = useSelector((state) => state.home.categories);
  const [errors, setErrors] = useState({});
  const [newCategory, setNewCategory] = useState("");
  const [inputImages, setInputImages] = useState("");
  const [aprove, setAprove] = useState(false);
  const [denied, setDenied] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [succes, setSucces] = useState(false);

  useEffect(() => {
    dispatch(getProductByID(idProduct));
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    setInput({
      title: product.title,
      name: product.name,
      price: product.price,
      shippingCost: product.shippingCost,
      description: product.description,
      images: product.images,
      stock: product.stock,
      categories: product.categories,
    });
    console.log(input.images);
  }, [product]);

  const [input, setInput] = useState({
    title: product.title,
    name: product.name,
    price: product.price,
    shippingCost: product.shippingCost,
    description: product.description,
    images: product.images,
    stock: product.stock,
    categories: product.categories,
  });

  function handleSubmit(e) {
    e.preventDefault();
    setAprove(false);
    if (Object.keys(errors).length === 0) {
      setSucces(true);
      dispatch(putProductByID(idProduct, input));
      setInput({
        title: "",
        name: "",
        price: "",
        shippingCost: "",
        description: "",
        images: [],
        stock: "",
        categories: [],
      });

      /* alert("Product Modified!!"); */
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
    e.preventDefault();
    if (newCategory !== "") {
      setInput({
        ...input,
        categories: [
          ...input.categories,
          { name: newCategory, id: e.target.id },
        ],
      });
      setNewCategory("");
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
    e.preventDefault();
    if (input.categories) {
      if (!input.categories.includes(e.target.value)) {
        setInput({
          ...input,
          categories: [
            ...input.categories,
            { name: e.target.value, id: e.target.id },
          ],
        });
      }
    }
  }

  let arr = [];
  const uploadImage = (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
      formData.append("upload_preset", "ecommerce");
      const newAxios = Axios.create();
      newAxios
        .post(
          "https://api.cloudinary.com/v1_1/dmjbff5rm/image/upload",
          formData
        )
        .then((res) => {
          arr.push(res.data.secure_url);
          console.log(arr);
          setInput({
            ...input,
            images: [...input.images, { url: arr[0], alt: "" }],
          });
        });
    }
  };

  function addImage(e) {
    setInput({
      ...input,
      images: [...input.images, { url: inputImages, alt: "" }],
    });
    setInputImages("");
  }

  function handleDelete(e) {
    console.log(input.categories);
    setInput({
      ...input,
      categories: input.categories.filter((category) => category.name !== e),
    });
  }

  function handleDeleteImage(e) {
    e.preventDefault();
    setInput({
      ...input,
      images: input.images.flat().filter((name) => name.url !== e.target.name),
    });
  }
  function reload() {
    setCancel(false);
    /* alert("Discard changes!!"); */
    window.location.reload();
  }

  const desc = input.description && input.description.split(".");
  const description2 = desc && desc.slice(0, -1);

  if (product) {
    return (
      <>
        <NavBarEmpty />
        <div className="sm:flex dark:bg-slate-700 font-lora">
          <NavbarAdmin />
          <div className="bg-secondary-100 dark:bg-slate-700 dark:text-white ">
            <form
              onSubmit={(prop) => {
                handleSubmit(prop);
              }}
            >
              <br />
              <h2 className="text-center">Edit Product</h2>
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
                    <span className="m-8"> Is the product ready ?</span>
                    <br />
                    <br />
                    <div className="flex justify-evenly m-3">
                      <button
                        onClick={(prop) => handleSubmit(prop)}
                        className="bg-primary-600 px-4 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setAprove(false)}
                        className="bg-primary-600 px-4 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {succes && (
                <div className="absolute ml-4 justify-center items-center font-lora ">
                  <div className="p-2  w-80 h-50 bg-white rounded-lg ring-1 ">
                    <div className=" mx-3 flex justify-between border-b border-gray-200 p-2">
                      <h3>Confirmation</h3>
                      <button
                        onClick={() => setSucces(false)}
                        className=" text-gray-500 px-1 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#f84d4dd1] hover:text-white shadow-lg shadow-primary-200/80"
                      >
                        x
                      </button>
                    </div>
                    <br />
                    <span className="m-8"> Changes saved successfully !!</span>
                    <br />
                    <br />
                    <div className="flex justify-evenly m-3">
                      <button
                        onClick={() => setSucces(false)}
                        className="bg-primary-600 px-4 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {denied && (
                <div className="absolute ml-2 justify-center items-center font-lora ">
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
                    <span className="m-8">
                      Some fields are missing. Check again
                    </span>
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
              {cancel && (
                <div className="absolute ml-2 justify-center items-center font-lora ">
                  <div className="p-2  w-80 h-50 bg-white rounded-lg ring-1 ">
                    <div className=" mx-3 flex justify-between border-b border-gray-200 p-2">
                      <h3>Discard</h3>
                      <button
                        onClick={() => setCancel(false)}
                        className=" text-gray-500 px-1 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#f84d4dd1] hover:text-white shadow-lg shadow-primary-200/80"
                      >
                        x
                      </button>
                    </div>
                    <br />
                    <span className="m-8">
                      Do you want to discard the changes?
                    </span>
                    <br />
                    <br />
                    <div className="flex justify-evenly m-3">
                      <button
                        onClick={(e) => reload(e)}
                        className="bg-primary-600 px-4 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => setCancel(false)}
                        className="bg-primary-600 px-4 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80"
                      >
                        Cancel
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
                    allCategories.map((e) => (
                      <option id={e.id} key={e.name}>
                        {e.name}
                      </option>
                    ))}
                </select>

                <div className="flex">
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
                            onClick={(e) => handleDelete(e.target.id)}
                            className="ml-2 w-full flex justify-between lg:hover:block lg:hover:scale-125 lg:hover:text-red-500 "
                          >
                            {category.name}

                            <AiOutlineCloseSquare
                              id={category.name}
                              onClick={(e) => handleDelete(e.target.id)}
                              className="lg:hidden text-2xl
                    "
                            />
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className=" justify-center py-2 m-2 ">
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
                          <img
                            className="w-10 h-10 m-0.5 "
                            src={name.url}
                            alt={name.url}
                          />
                          <button
                            className="bg-primary-500 w-6 my-0.5  rounded-lg hover:bg-primary-400"
                            name={name.url}
                            onClick={(name) => handleDeleteImage(name)}
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  setAprove(true);
                }}
                className="bg-primary-600 px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80 m-3 dark:hover:text-white dark:hover:bg-slate-900 dark:hover:shadow-slate-600 dark:bg-slate-400 dark:text-slate-900 dark:shadow-slate-900"
              >
                Save Changes
              </button>
              {/* <ButtonCreate
                disable={errors?.disableSubmit}
                text="Save Changes"
                type="button"
                onClick={(e) => {
                  setAprove(true);
                  setProp(e);
                }}
              ></ButtonCreate> */}
            </form>
            <button
              onClick={() => setCancel(true)}
              className="bg-[#3b82f6] text-white px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#3491fc] shadow-lg shadow-primary-200/80 m-3 dark:hover:text-white dark:hover:bg-slate-900 dark:hover:shadow-slate-600 dark:bg-slate-400 dark:text-slate-900 dark:shadow-slate-900"
            >
              Discard Changes
            </button>
          </div>

          <div className=" w-full bg-secondary-100 dark:bg-slate-700 dark:text-white">
            <br />
            <h2 className="text-center">Preview</h2>
            <br />
            <hr />
            {/* previsualizacion */}
            <div>
              <AdminPreview input={input} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
