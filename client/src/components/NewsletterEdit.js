import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavbarAdmin from './NavbarAdmin';
import NavBarEmpty from './NavBarEmpty';
import check from './utils/check-shield-regular-24.png';
import { postEmail, getUsersInfo } from '../Redux/Actions/actions';
import ButtonCreate from './commons/ButtonCreate';

export default function NewsletterEdit() {
  const dispatch = useDispatch();
  const usersAll = useSelector((state) => state.home.users);
  const [receiver, setReceiver] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getUsersInfo());
  }, [dispatch]);

  useEffect(() => {
    let users = usersAll.filter((user) => user.newsletterSubscription === true);
    users.length && users.map((user) => receiver.push(user.email));
    setReceiver([...new Set(receiver)]);
  }, [usersAll]);

  const [input, setInput] = useState({
    title: '',
    message: '',
    receivers: [],
  });

  const mess = input.message && input.message.split('.');

  function handleNewEmail(e) {
    const { value } = e.target;
    setNewEmail(value);
  }

  function handleSubmitNewEmail(e) {
    if (newEmail !== '') {
      if (
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
          newEmail
        )
      ) {
        setInput({
          ...input,
          receivers: [...input.receivers, newEmail],
        });
        setNewEmail('');
      } else {
        console.log('must be email');
      }
    } else {
      console.log('Email required');
    }
  }

  function handleChangeInput(e) {
    if (e.target.name === 'title') {
      setInput({
        ...input,
        title: e.target.value,
      });
      setError(
        validations({
          ...input,
          title: e.target.value,
        })
      );
    } else if (e.target.name === 'message') {
      setInput({
        ...input,
        message: e.target.value,
      });
      setError(
        validations({
          ...input,
          message: e.target.value,
        })
      );
    }
  }

  function handleSelect(e) {
    var selectAll = true;
    if (e.target.value === 'All') {
      if (selectAll) {
        setInput({
          ...input,
          receivers: [...new Set([...input.receivers, ...receiver])],
        });
        selectAll = false;
      }
    } else {
      if (!selectAll) {
      } else {
        setInput({
          ...input,
          receivers: [...new Set([...input.receivers, e.target.value])],
        });
      }
    }
  }

  function handleDelete(e) {
    e.preventDefault();
    setInput({
      ...input,
      receivers: input.receivers.filter((name) => name !== e.target.id),
    });
  }

  function validations(input) {
    let error = {};

    if (!input.title) {
      error.title = 'Subject is required';
    }
    if (!input.message) {
      error.message = 'Message is required';
    }
    return error;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(error).length > 0) {
      alert('Please, fill in all the fields');
    } else {
      dispatch(postEmail(input));

      setInput({
        title: '',
        message: '',
        receivers: [],
      });

      alert('Email sent!');
    }
  }

  return (
    <>
      <NavBarEmpty />
      <div className="flex flex-col w-full sm:flex-row font-lora">
        <NavbarAdmin className="dark:text-black" />
        <form
          onSubmit={(e) => handleSubmit(e)}
          className=" bg-secondary-100 dark:bg-slate-700 dark:text-white h-screen w-30"
        >
          <br />
          <h2 className="text-center">Edit Newsletter</h2>
          <br />
          <hr />
          <div>
            <div className="justify-center p-2">
              <label>Subject</label>
              <br />
              <input
                className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50 dark:bg-slate-700"
                type="text"
                value={input.title}
                name="title"
                onChange={(e) => handleChangeInput(e)}
                autoComplete="off"
              />
              <strong>{error.title}</strong>
            </div>

            <div className="justify-center p-2">
              <label>Message</label>
              <br />
              <textarea
                className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50 dark:bg-slate-700"
                type="text"
                name="message"
                value={input.message}
                onChange={(e) => handleChangeInput(e)}
                autoComplete="off"
              />
              <p className="font-bold">{error.message}</p>
            </div>
          </div>

          <div className="justify-center p-2">
            <label>Receivers</label>
            <select
              className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50 dark:bg-slate-700"
              onChange={(e) => handleSelect(e)}
            >
              <option value="select">Select</option>
              <option value="All">All</option>
              {receiver.length > 0 &&
                receiver.map((rec) => {
                  return (
                    <option id={rec} key={rec}>
                      {rec}
                    </option>
                  );
                })}
            </select>
            <div className="flex">
              <input
                className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50 dark:bg-slate-700"
                type="email"
                placeholder="Add Email..."
                value={newEmail}
                /* name="email" */
                onChange={(e) => handleNewEmail(e)}
                autoComplete="off"
              />
              <button
                type="button"
                className="text-secondary-200 bg-secondary-100 w-16 ml-1 border-2 border-gray-300 rounded-md hover:border-2 hover:border-solid hover:border-green-600 hover:text-green-600 dark:hover:text-white dark:hover:bg-slate-900 dark:hover:shadow-slate-600 dark:bg-slate-400 dark:text-slate-900 dark:shadow-slate-900"
                onClick={(e) => handleSubmitNewEmail(e)}
              >
                Add
              </button>
            </div>

            {input.receivers.length ? (
              input.receivers.map((rec) => (
                <div
                  className="flex w-full hover:bg-secondary-100 bg-gray-50 dark:bg-slate-700"
                  key={rec}
                  value={rec}
                >
                  <img src={check} alt="check" />
                  <button type="button" id={rec} onClick={(e) => handleDelete(e)}>
                    {rec}
                  </button>
                </div>
              ))
            ) : (
              <br />
            )}
          </div>
          {input.receivers.length ? (
            <ButtonCreate
              disabled={error?.disabledSubmit}
              text="Send Email"
              type="submit"
            />
          ) : (
            <br />
          )}
        </form>
        <div className="w-[70rem] bg-secondary-100 dark:bg-slate-700">
          <br />
          <h2 className="text-center dark:bg-slate-700 dark:text-white">Preview</h2>
          <br />
          <hr />
          <div className=" mx-6 my-2 p-2 full bg-white dark:bg-slate-800 dark:text-white rounded flex flex-col">
            <div className="p-2 border-b-[1px] border-primary-300 font-lora">
              <h2 className="2xl:text-2xl">{input.title}</h2>
            </div>
            <div className="text-sm pt-2 pl-3 flex flex-col gap-2 pb-4 marker:primary-300">
              {mess &&
                mess.map((mes) => (
                  <div className="flex gap-2 items-center text-base">
                    <span>{mes}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
