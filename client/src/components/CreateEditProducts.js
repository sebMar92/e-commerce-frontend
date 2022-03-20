import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";

import { useDispatch, useSelector } from "react-redux";
import { getCategories, postProduct } from "../Redux/Actions/actions";
import { validation } from "./validation";
import ButtonCreate from "./commons/ButtonCreate";
import ButtonBuy from "./commons/ButtonBuy";
import check from "./utils/check-shield-regular-24.png";
import Modelo from "./utils/modelo.jpg";
import mas from "./utils/image-add-regular-24.png";

export default function CreateEditProducts() {
  const dispatch = useDispatch();
  const allCategories = useSelector((e) => e.home.categories);

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
    let crear = {
      title: input.title,
      name: input.name,
      price: input.price,
      shippingCost: input.shippingCost,
      description: input.description,
      images: input.images,
      stock: input.stock,
      categories: input.categories.join(", "),
    };
    dispatch(postProduct(crear));
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
    console.log(crear);
    alert("Product Create!!");
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
    console.log(e.target.value)
    if (!input.categories.includes(e.target.value)) {
      setInput({
        ...input,
        categories: [...input.categories, e.target.value],
      });
    }
  }
  function addImage(e){
    console.log(e.target.value)
    setInput({
      ...input,
      images:[...input.images, e.target.value]
    })
  }

  function handleDelete(e) {
    console.log(e.target.innerText);
    e.preventDefault();
    setInput({
      ...input,
      categories: input.categories.filter(
        (name) => name !== e.target.innerText
      ),
    });
  }

  return (
    <>
      <NavBar />
      <div className="flex justify-center">
        <div className="flex bg-gray-50  min-w-min max-w-sm m-2 rounded-md justify-center p-8">
          <form>
            <h2 className="justify-center">Create Product</h2>
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
                  allCategories.map((e) => <option key={e}>{e}</option>)}
              </select>
              {input.categories.map((name) => {
                return (
                  <div className="flex w-full hover:bg-secondary-100 bg-gray-50">
                    <img src={check} alt="check" />
                    <button onClick={(name) => handleDelete(name)}>
                      {name}
                    </button>
                  </div>
                );
              })}

              <div className=" justify-center py-2 ">
                <label>Images</label>
                  <div className="flex">
                <input
                  className="rounded-md h-9 w-full hover:[bg-secundary-200] border-2 border-gray-300 bg-gray-50"
                  type="text"
                  name="images"
                  value={input.images}
                  onChange={(e) => handelChange(e)}          
                />
                <img key="images" value={input.images} onClick={(e) => addImage(e)} className="cursor-pointer"src={mas}/>
              
                </div>
              </div>
            </div>
            <ButtonBuy
              text="Create Product"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            ></ButtonBuy>
          </form>
        </div>
        <div></div>
      </div>
    </>
  );
}
