import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { putUserInfo, getUserInfo } from '../../Redux/Actions/actions';
export default function FooterHome() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.home.user);
  const [type, setType] = useState("Sub / Unsub");
  const [on, setOn] = useState(false);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (user.newsletterSubscription === false) {
      setType("Subscribe");
    } else {
      setType("Unsubscribe");
    }
  }, [user]);

  function handleChangeOption() {
    setOn(false);
    if (user.newsletterSubscription === false) {
      user.newsletterSubscription = true;
      dispatch(putUserInfo({ newsletterSubscription: true }));
      setType("Unsubscribe");
      /* alert("Subscribed!"); */
    } else if (user.newsletterSubscription === true) {
      user.newsletterSubscription = false;
      dispatch(putUserInfo({ newsletterSubscription: false }));
      setType("Subscribe");
      /* alert("Unsubscribed!"); */
    }
  }

  return (
    <div>
      {Object.keys(user).length !== 0 && (
        <footer className="bg-gray-50 flex flex-row flex-wrap justify-evenly items-center p-20 font-lora font-bold">
          {on && (
            <div className="absolute justify-center items-center font-lora ">
              <div className="p-2  w-80 h-50 bg-white rounded-lg ring-1 ">
                <div className=" mx-3 flex justify-between border-b border-gray-200 p-2">
                  <h3>Confirmation</h3>
                  <button
                    onClick={() => setOn(false)}
                    className=" text-gray-500 px-1 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#f84d4dd1] hover:text-white shadow-lg shadow-black-200/80"
                  >
                    x
                  </button>
                </div>
                <br />
                <span className="m-8"> Are you sure ? </span>
                <br />
                <br />
                <div className="flex justify-evenly m-3">
                  <button
                    onClick={() => handleChangeOption()}
                    className="bg-black text-white hover:bg-secondary-200 px-4 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-black-200/80"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => setOn(false)}
                    className="bg-black text-white hover:bg-secondary-200 px-4 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-black-200/80"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          <div>
            <h1>Join our newsletter</h1>
            <p>Subscribe today and get more information about our products!</p>
          </div>
          <div>
            <button
              className="bg-black text-white px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-secondary-200 m-3 dark:hover:text-white dark:hover:bg-slate-900 dark:hover:shadow-slate-600 dark:bg-slate-400 dark:text-slate-900 dark:shadow-slate-900"
              onClick={() => setOn(true)}
            >
              {type}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
