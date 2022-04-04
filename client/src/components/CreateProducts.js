import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, postProduct } from "../Redux/Actions/actions";
import { validation } from "./validation";
import ButtonCreate from "./commons/ButtonCreate";
import check from "./utils/check-shield-regular-24.png";
import Modelo from "./utils/modelo.jpg";
import mas from "./utils/image-add-regular-24.png";
import Slider from "./ProductDetails/Slider";
import Axios from "axios";
import NavbarAdmin from "./NavbarAdmin";
import { Cloudinary } from "@cloudinary/url-gen";
import NavBarEmpty from "./NavBarEmpty";
import AdminPreview from "../components/AdminPreview";
import { AiOutlineCloseSquare } from "react-icons/ai"

export default function CreateProducts() {
  const dispatch = useDispatch();
  const allCategories = useSelector((e) => e.home.categories);
  const [newCategory, setNewCategory] = useState("");
  const [inputImages, setInputImages] = useState("");
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    title: "",
    name: "",
    price: "",
    shippingCost: "",
    description: "",
    images: [],
    stock: "",
    categories: [],
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    if (errors === {}) {
      dispatch(postProduct(input));
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

      alert("Product Create!!");
    } else {
      alert("Some fields are missing. Check again");
    }
  }
  function handleAddCategory(e) {
    const { value } = e.target;
    setNewCategory(value);
  }
  function handleSubmitAddCategory(e) {
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
          setInput({
            ...input,
            images: [...input.images, { url: arr[0], alt: "" }],
          });
        });
    }
  };

  function addImage(e) {
    /* console.log(e.target.value); */
    setInput({
      ...input,
      images: [...input.images, { url: inputImages, alt: "" }],
    });
    setInputImages("");
  }
  /* console.log(input.images);
   */
  function handleDelete(e) {
    e.preventDefault();
    setInput({
      ...input,
      categories: input.categories.filter(
        (category) => category.name !== e.target.id
      ),
    });
  }

  function handleDeleteImage(e) {
    e.preventDefault();
    setInput({
      ...input,
      images: input.images.flat().filter((name) => name.url !== e.target.name),
    });
  }

  const desc = input.description && input.description.split(".");
  const description2 = desc && desc.slice(0, -1);

  return (
    <>
      <NavBarEmpty />
      <div className="sm:flex ">
        <NavbarAdmin className="dark:text-black" />
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="bg-secondary-100 dark:bg-slate-700 dark:text-white"
        >
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
                className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50"
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
                className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50"
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
                className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50"
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
                className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50"
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
                className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50"
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
                className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50"
                type="number"
                name="stock"
                value={input.stock}
                onChange={(e) => handelChange(e)}
              />
            </div>
          </div>

          <div className=" justify-center p-2 ">
            <label>Categories</label>
            <select
              className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50"
              onChange={(e) => handleSelectCategories(e)}
            >
              <option>Select</option>
              {allCategories &&
                allCategories.length > 0 &&
                allCategories.map((e) => (
                  <option id={e.id} key={e.id}>
                    {e.name}
                  </option>
                ))}
            </select>

            <div className="flex mt-1">
              <input
                className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50"
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
                className="text-secondary-200 bg-secondary-100 w-16 ml-1 border-2 border-gray-300 rounded-md hover:border-2 hover:border-solid hover:border-green-600 hover:text-green-600"
                onClick={(e) => handleSubmitAddCategory(e)}
              >
                Add
              </button>
            </div>

            <div className="">
              {
                input.categories &&
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

                        <AiOutlineCloseSquare id={category.name}
                          onClick={(e) => handleDelete(e)} className="lg:hidden text-2xl
                    "/>
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
                className="rounded-md h-9 w-full hover:[bg-secundary-200] border-2 border-gray-300 bg-gray-50"
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
          <ButtonCreate
            disabled={errors?.disabledSubmit}
            text="Create Product"
            type="submit"
          /* onClick={(e) => handleSubmit(e)} */
          ></ButtonCreate>
        </form>
        <div className=" w-full bg-secondary-100 dark:bg-slate-700">
          <br />
          <h2 className="text-center dark:bg-slate-700 dark:text-white">
            Preview
          </h2>
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
