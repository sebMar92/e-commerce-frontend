import React from "react";
import { useForm } from "react-hook-form";
import ButtonBuy from '../components/commons/ButtonComplete'

export default function LoginComponent() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
    return (
        <div className="bg-primary-300 h-96 w-3/12 m-auto">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <input className="w-6/12 m-auto" defaultValue="test" {...register("example")} />
                <input className="w-6/12 m-auto" {...register("exampleRequired", { required: true })} />
                {errors.exampleRequired && <span className="m-auto">This field is required</span>}
                <button type="submit" className='bg-[#3b82f6] w-3/6 m-auto text-white px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#3491fc] shadow-lg shadow-primary-200/80'>
                    Complete
                </button>
            </form>
        </div>
    );
}