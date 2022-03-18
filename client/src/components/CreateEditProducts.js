import React, {useState} from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import { useDispatch, useSelector } from "react-redux";
import {postProduct} from "../Redux/Actions/actions"
import { validation } from "./validation";
import ButtonCreate from "./commons/ButtonCreate";
import Categories from "./CategoriesSelect";

export default function CreateEditProducts() {

    const dispatch = useDispatch();
    const allCategory = useSelector((e)=> e.categories);

    const [errors, setErrors] = useState({});
    const [input, setInput]=useState({
        title: "",
        name: "",
        price: "",
        shippingCost: "",
        description: "",
        images: [],
        stock: "",
        categories: [],
    })

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
            categories: input.categories,
          };
          dispatch(postProduct(crear));
          setInput({
            title: "",
            name: "",
            price: "",
            shippingCost: "",
            description: "",
            images: [],
            stock: 0,
            categories: [],
          });
          alert('Product Create!!')
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
        )
      } ;

     function handelSelectCategory(e){
          if(!input.categories.includes(e.target.value)){
              setInput({
                  ...input,
                  categories: [...input.categories, e.target.value],
              })
          }
      }
    return (
        <>
        <NavBar/>
        <div className="justify-content-center">
            <h1>Here admin can create and edit products.
            </h1>
           
             
        
            <br/>
            <div className="flex bg-gray-50  min-w-min max-w-sm m-2 rounded-md justify-center p-8">
            <form >
            <button>Create Product</button>
                <div>
                <div className=" justify-center p-2 ">
                <label>Title</label><br/>
                <input className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50"
                type="text"
                 name="title"
                value={input.title}
                onChange={(e)=> handelChange(e)}/>
                <strong>{errors.title}</strong>
                </div>

                <div className=" justify-center p-2 ">
                <label>Name</label>
                <input  className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-100"
                type="text" name="name"
                value={input.name}
                onChange={(e)=> handelChange(e)}/>
                </div>

                <div className=" justify-center p-2 ">
                <label>Price </label>
                <input  className="rounded-md h-8 w-full hover:[bg-secundary-200] border-2 border-gray-300 bg-gray-100"
                type="text" name="price" placeholder="$ 000.00"
                value={input.price}
                onChange={(e)=> handelChange(e)}/>
                </div>

                <div className=" justify-center p-2 ">
                <label>Shipping Cost</label>
                <input  className="rounded-md h-8 w-full hover:[bg-secundary-200] border-2 border-gray-300 bg-gray-100"
                type="text" name="shippingCost" placeholder="$ 000.00"
                value={input.shippingCost}
                onChange={(e)=> handelChange(e)}/>
                </div>

                <div className=" justify-center p-2 ">
                <label>Description:</label>
                <textarea  className="rounded-md h-8 w-full hover:[bg-secundary-200] border-2 border-gray-300 bg-gray-100"
                type="text" name="description" overflow="auto"
                value={input.description}
                onChange={(e)=> handelChange(e)}/>
                </div>

                <div className=" justify-center p-2 ">
                <label>Stock</label>
                <input  className="rounded-md h-8 w-full hover:[bg-secundary-200] border-2 border-gray-300 bg-gray-100"
                type="number" name="categories"
                value={input.categories}
                onChange={(e)=> handelChange(e)}/>
                </div>
                </div>

                <div>
                <div className=" justify-center p-2 ">
                <label >Images</label>
                <input  className="rounded-md h-9 w-full hover:[bg-secundary-200] border-2 border-gray-300 bg-gray-100"
                type="file" name="images"
                value={input.images}
                onChange={(e)=> handelChange(e)}/>  
                </div>
            
                <Categories/>

                </div>
                <ButtonCreate>Create Product</ButtonCreate>
            </form>
            </div>
        </div>
        <Footer/>
        </>
    );
}