import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { putUserInfo, getUserInfo } from '../../Redux/Actions/actions';
import ButtonCreate from '../commons/ButtonCreate';
export default function FooterHome() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.home.user);
  const [type, setType] = useState('Sub / Unsub');

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (user.newsletterSubscription === false) {
      setType('Subscribe');
    } else {
      setType('Unsubscribe');
    }
  }, [user]);

  function handleChangeOption() {
    if (user.newsletterSubscription === false) {
      user.newsletterSubscription = true;
      dispatch(putUserInfo({ newsletterSubscription: true }));
      setType('Unsubscribe');
      alert('Subscribed!');
    } else if (user.newsletterSubscription === true) {
      user.newsletterSubscription = false;
      dispatch(putUserInfo({ newsletterSubscription: false }));
      setType('Subscribe');
      alert('Unsubscribed!');
    }
  }

  return (
    <div>
      {Object.keys(user).length !== 0 && (
        <footer className="bg-gray-50 flex flex-row flex-wrap justify-evenly items-center p-20 font-lora font-bold">
          <div>
            <h1>Join our newsletter</h1>
            <p>Subscribe today and get more information about our products!</p>
          </div>
          <div>
            <button
              className="bg-black text-white px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-secondary-200 m-3 dark:hover:text-white dark:hover:bg-slate-900 dark:hover:shadow-slate-600 dark:bg-slate-400 dark:text-slate-900 dark:shadow-slate-900"
              onClick={handleChangeOption}
            >
              {type}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
