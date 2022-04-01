import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { updateComment, deleteComment } from '../../Redux/Actions/actions'
import { FaStar } from "react-icons/fa"

const ShowComment = ({comment, token}) => {
  const dispatch = useDispatch()
  const refreshPage = () => {
    window.location.reload(false);
  }
  const [editComment, setEditComment] = useState({
        content: comment.content,
        rating: comment.rating,
        id: comment.id 
  })

  const [editable, setEditable] = useState({
    textarea: "hidden",
    div: "visible"
  })

  const [buttons, setButtons] = useState({
    all: "hidden",
    edit: "visible"
  })

  function handleChange(e) {
    setEditComment({
      ...editComment,
      [e.target.name]: e.target.value,
    });
    console.log(editComment)
}
  const handleEdit = () => {
    setEditable({
      textarea: "visible",
      div: "hidden"
    });
    setButtons({
      all: "visible",
      edit: "hidden"
    })
  }

  const handleEditCancelSubmit = () => {
    setEditable({
      textarea: "hidden",
      div: "visible"
    });
    setButtons({
      all: "hidden",
      edit: "visible"
    })
    setEditComment({
      content: comment.content,
      rating: comment.rating,
      id: comment.id})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateComment(editComment));
    setEditable({
      textarea: "hidden",
      div: "visible"
    });
    setButtons({
      all: "hidden",
      edit: "visible"
    })
    
  }

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteComment(editComment.id, token));
    refreshPage();
  }

  return (
    <div className="p-2 w-full font-lora flex flex-col items-center mt-2 gap-2">
      <div className="w-full flex flex-col items-center justify-center gap-2 sm:w-4/5 lg:w-1/2">
        <div className="flex items-center justify-center w-4/5 ">
          <button onClick={handleDelete} className={`${buttons.all} mr-auto rounded p-2 font-bold font-lora border-[1px] border-red-300 text-red-300 hover:border-red-700 hover:text-red-700`}>DELETE</button>
          <div className="pb-2 border-b-[1px] border-b-primary-300"><h2 className={`${buttons.edit}`}>Your Review</h2></div>
        </div>
        <form className="w-4/5" id="form" onSubmit={(e) => {handleSubmit(e)}}>
          <div>
            <textarea className={` ${editable.textarea} border-[1px] border-primary-300 rounded w-full p-2 font-lora min-h-[120px] outline-none text-sm`} name="content" value={editComment.content} onChange={(e) => handleChange(e)}>{editComment.content}</textarea>
          </div>
          <div className={` ${editable.textarea} flex justify-between p-2 items-center`}>
            <div className={`flex gap-2 ${editable.textarea}`}>
                    {[...Array(5)].map((el, i) => {
                    
                    // const ratingValue = i + 1

                    return (
                        <label>
                            <input type="radio" name="rating" className="w-6 hidden" value={i + 1} onChange={(e) => handleChange(e)} />
                                <FaStar className="w-6 h-6 cursor-pointer" color={i + 1 <= editComment.rating ? "#FFAC4B" : "#808080"}/>
                        </label>)})}
            </div>
            <div>
              <button className={`mr-2 rounded p-2 font-bold text-primary-400 font-lora border-[1px] border-primary-300 hover:text-primary-700 hover:border-primary-700 ${buttons.all}`}  onClick={handleEditCancelSubmit}>CANCEL</button>
              <button type="submit" form="form" className={`${buttons.all} rounded p-2 font-bold p-2 text-white bg-primary-400 font-lora hover:bg-primary-700 focus:bg-primary-700`}>SUBMIT</button>
            </div>
          </div>
          <div className={`flex gap-2 ${editable.div} justify-center`}>
                    {[...Array(5)].map((el, i) => {
                    
                    const ratingValue = i + 1

                    return (
                        <label>
                            <input disabled type="radio" name="rating" className="hidden w-6 pointer-events-none" value={ratingValue} onChange={(e) => handleChange(e)} />
                                <FaStar className="w-6 h-6 pointer-events-none" color={ratingValue <= editComment.rating ? "#FFAC4B" : "#808080"}/>
                        </label>)})}
          </div>
        </form>
        <div className={`border-[1px] border-primary-300 rounded w-4/5 p-2 font-lora min-h-[120px] bg-white outline-none ${editable.div}`}>
          <p>{editComment.content}</p>
        </div>
        <button onClick={handleEdit} className={`mr-2 rounded p-2 font-bold text-primary-400 font-lora border-[1px] border-primary-300 hover:text-primary-700 hover:border-primary-700 ${buttons.edit}`}>EDIT</button>
      </div>
    </div>
  )
}

export default ShowComment