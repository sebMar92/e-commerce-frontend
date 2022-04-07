import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import ButtonCreate from './commons/ButtonCreate';
import { postNetworks } from '../Redux/Actions/actions';


export default function SocialNetworks() {
  const dispatch = useDispatch();
  const [checkedFace, setCheckedFace] = useState(false);
  const [checkedTwit, setCheckedTwit] = useState(false);
  const [checkedInst, setCheckedInst] = useState(false);
  const [input, setInput] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
  });

  useEffect( () => {
    if(checkedFace === false){
      setInput({
        ...input,
        facebook: "",
      });
    }

    if(checkedTwit === false){
      setInput({
        ...input,
        twitter: ""
      });
    }

    if(checkedInst === false){
      setInput({
        ...input,
        instagram: ""
      });
    }
  }, [checkedFace, checkedTwit, checkedInst])

  function handleChangeFace(){
    setCheckedFace(!checkedFace);
  }

  function handleChangeTwit(){
    setCheckedTwit(!checkedTwit);
  }

  function handleChangeInst(){
    setCheckedInst(!checkedInst);
  }

  function handleChangeInput(e) {
    if (e.target.name === "facebook") {
      setInput({
        ...input,
        facebook: e.target.value,
      });
    }
    else if (e.target.name === "twitter") {
      setInput({
        ...input,
        twitter: e.target.value,
      });
    }
    else if (e.target.name === "instagram") {
      setInput({
        ...input,
        instagram: e.target.value,
      });
    }
  } 

  

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postNetworks(input));
    console.log(input)

    setInput({
      facebook: "",
      twitter: "",
      instagram: ""
      });

      alert("Networks sent!");
    }

  return(
            <div className=" mx-6 my-2 p-2 justify-between full bg-white dark:bg-slate-800 dark:text-white rounded flex flex-col">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                  <div className="flex-col">
                    <div className="flex justify-center">
                      <label className="mr-2">Facebook</label>
                        <input className="mt-1.5"
                          type="checkbox"
                          id="face"
                          name="face"
                          value="faceb"
                          checked={checkedFace}
                          onChange={handleChangeFace} 
                        />
                    </div>
                    { checkedFace &&
                      <div>
                        <input
                          type="text"
                          value={input.facebook}
                          name="facebook"
                          onChange={(e) => handleChangeInput(e)}
                          id="faceinput"
                          className="rounded-md h-6 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50 dark:bg-slate-700"
                      />
                      </div>
                    }
                  </div>
                  <div className="flex-col">
                    <div className="flex justify-center">
                      <label className="mr-2">Twitter</label>
                        <input className="mt-1.5"
                          type="checkbox"
                          id="twit"
                          name="twit"
                          value="twitt"
                          checked={checkedTwit}
                          onChange={handleChangeTwit}
                      />
                    </div>
                    { checkedTwit &&
                    <div>
                      <input
                        type="text"
                        value={input.twitter}
                        name="twitter"
                        onChange={(e) => handleChangeInput(e)}
                        id="twitinput"
                        className="rounded-md h-6 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50 dark:bg-slate-700"
                    />
                    </div>
                    }
                  </div>
                  <div className="flex-col">
                    <div className="flex justify-center">
                      <label className="mr-2">Instagram</label>
                        <input className="mt-1.5"
                          type="checkbox"
                          id="inst"
                          name="inst"
                          value="insta"
                          checked={checkedInst}
                          onChange={handleChangeInst}
                        />
                    </div>
                    { checkedInst && 
                      <div>
                        <input
                          type="text"
                          value={input.instagram}
                          name="instagram"
                          onChange={(e) => handleChangeInput(e)}
                          id="instinput"
                          className="rounded-md h-6 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50 dark:bg-slate-700"
                      />
                      </div>
                    }
                  </div>
                </div>
                  <div className='flex justify-center'>
                    <ButtonCreate
                    text="Send"
                    type="submit"
                    />
                </div>
              </form>
            </div>
  );
}

