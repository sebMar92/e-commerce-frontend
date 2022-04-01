import React, { useState, useEffect } from 'react'
import { postComment, getCommentByID, getOrder, getUserInfo } from '../../Redux/Actions/actions'
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import ShowComment from "./ShowComment"

const CreateComment = ({ id, product }) => {
    const [allow, setAllow] = useState(false)
    const finishedOrders = useSelector((state) => state.home.finished);
    const dispatch = useDispatch();
    const [comment, setComment] = useState({
        content: "",
        rating: 0,
        productId: id 
    })

    useEffect(() => {
        dispatch(getCommentByID(id))
        dispatch(getOrder({status: "finished"}))
        dispatch(getUserInfo)
    },[dispatch, id])

    useEffect(() => {
        const token = window.localStorage.getItem('access');
        if(token) {
            const found = finishedOrders && (finishedOrders === null || finishedOrders.error == "couldn't find orders" || finishedOrders.length === 0) ? null : finishedOrders.find(el => el.title == product.title);
            
            if(found) {
                
                setAllow(true)
                
            }
        }
  }, [finishedOrders, product])

    const allComments = useSelector((state) => state.productID.comment)
    const user = useSelector((state) => state.home.user)

    const userComment = allComments && allComments.find(c => c.userInfo.email === user.email)
    const commentsLeft = allComments && allComments.filter(c => c.userInfo.email != user.email)
    
    var accesToken = window.localStorage.getItem("access")
    
    function handleChange(e) {
        setComment({
          ...comment,
          [e.target.name]: e.target.value,
        });
    }

    const refreshPage = () => {
        window.location.reload(false);
      }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postComment(comment, accesToken));
        setComment({
            content: "",
            rating: 0,
            productId: id
        });
        refreshPage();
    }

  return (  
      
    <div id="comments_container" > 
    <div className="p-2 bg-white rounded mt-6 shadow-sm">
        <div className="p-2 border-b-[1px] border-primary-300 font-lora">
            <h2>Reviews</h2>
        </div>
        <div className="h-fit p-2 flex flex-col gap-6 mt-2">
            {
                commentsLeft && commentsLeft.map((c) => (
                    <div className="h-full flex flex-col gap-2 font-lora">
                        <div className="flex gap-2">
                            {[...Array(5)].map((el, i) => {
                    
                            const ratingValue = i + 1

                            return (
                                <label>
                                        <FaStar className="w-5 h-5 cursor-pointer" color={ratingValue <= c.rating ? "#FFAC4B" : "#808080"}/>
                                </label>)})}
                        </div>
                        <p>{c.content}</p>
                    </div>
                ))
            }
        </div>
    </div>
        {allow && <div>
            {userComment ? 
    
            <ShowComment comment={userComment} token={accesToken}/>
    
            :

            <div className='p-2 font-lora flex flex-col items-center mt-2 gap-2'>
                <div className="pb-2 border-b-[1px] border-b-primary-300">
                    <h2>Leave a review!</h2>
                </div>
                <form className="w-1/2" onSubmit={(e) => {handleSubmit(e)}}>

                    <textarea className='border-[1px] border-primary-300 rounded w-full p-2 font-lora min-h-[120px] outline-none text-sm' value={comment.content} type="text" name="content" onChange={(e) => handleChange(e)}>

                    </textarea>
                    <div className="flex justify-between p-2 items-center flex-col sm:flex-row gap-2">
                        <div className="flex gap-2">
                            {[...Array(5)].map((el, i) => {
                    
                            const ratingValue = i + 1

                            return (
                                <label>
                                    <input type="radio" name="rating" className="hidden w-8" value={ratingValue} onChange={(e) => handleChange(e)} />
                                        <FaStar className="w-6 h-6 cursor-pointer" color={ratingValue <= comment.rating ? "#FFAC4B" : "#808080"}/>
                                </label>)})}
                        </div>

                        <button className="rounded p-2 font-bold p-2 text-white bg-primary-400 font-lora hover:bg-primary-700 focus:bg-primary-700" type="submit" onClick={(e) => handleSubmit(e)}> POST </button>
                    </div>

                </form>
            </div>}
        </div>}
    </div>)
}


export default CreateComment