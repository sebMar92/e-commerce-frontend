import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCaretDown } from 'react-icons/ai';

export default function NavbarAdmin({ name, idUser }) {
  function onClickitems() {
    document.getElementById('items').classList.toggle('hidden');
  }

  return (
    <>
      <div className="sm:w-72 bg-primary-700 justify-around dark:bg-slate-800">
        <div className="dark:bg-slate-800 bg-primary-500 text-decoration-line: no-underline font-medium text-lg px-25 py-5 text-slate-900 flex justify-center rounded">
          <p className="font-semibold tracking-tight text-center text-gray-900 dark:text-white text-base m-3">
            Welcome, Cosme Fulanito{name}!
          </p>
        </div>
        <div className="text-center bg-white sm:hidden dark:bg-slate-400">
          <button className="text-primary-600 dark:text-slate-800" onClick={onClickitems}>
            <AiOutlineCaretDown className="h-2em w-2em" />
          </button>
        </div>
        <div id="items" className="hidden sm:block ">
          <Link to={`/admin`} className="no-underline">
            <div className="m-0.5 bg-primary-300 no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400 dark:text-white dark:hover:bg-slate-400 dark:hover:shadow-slate-600 dark:bg-slate-800 dark:hover:text-slate-900 dark:shadow-slate-900">
              <p className="font-semibold tracking-tight text-gray-900 dark:text-white text-base">
                Statistics
              </p>
            </div>
          </Link>
          <Link to={`/admin/products?limit=8&offset=1`} className="no-underline">
            <div className="m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400 dark:text-white dark:hover:bg-slate-400 dark:hover:shadow-slate-600 dark:bg-slate-800 dark:hover:text-slate-900 dark:shadow-slate-900">
              <p className="font-semibold tracking-tight text-gray-900 dark:text-white text-base">
                Manage products
              </p>
            </div>
          </Link>
          <Link to={`/admin/create/Product`} className="no-underline">
            <div className="m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400 dark:text-white dark:hover:bg-slate-400 dark:hover:shadow-slate-600 dark:bg-slate-800 dark:hover:text-slate-900 dark:shadow-slate-900">
              <p className="font-semibold tracking-tight text-gray-900 dark:text-white text-base">
                Create products
              </p>
            </div>
          </Link>
          <Link to={`/admin/orders`} className="no-underline">
            <div className="m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400 dark:text-white dark:hover:bg-slate-400 dark:hover:shadow-slate-600 dark:bg-slate-800 dark:hover:text-slate-900 dark:shadow-slate-900">
              <p className="font-semibold tracking-tight text-gray-900 dark:text-white text-base">
                Manage orders
              </p>
            </div>
          </Link>
          <Link to={`/admin/users`} className="no-underline">
            <div className="m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400 dark:text-white dark:hover:bg-slate-400 dark:hover:shadow-slate-600 dark:bg-slate-800 dark:hover:text-slate-900 dark:shadow-slate-900">
              <p className="font-semibold tracking-tight text-gray-900 dark:text-white text-base">
                Users
              </p>
            </div>
          </Link>
          <Link to={`/admin/discounts`} className="no-underline">
            <div className="m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400 dark:text-white dark:hover:bg-slate-400 dark:hover:shadow-slate-600 dark:bg-slate-800 dark:hover:text-slate-900 dark:shadow-slate-900">
              <p className="font-semibold tracking-tight text-gray-900 dark:text-white text-base">
                Manage sales
              </p>
            </div>
          </Link>
          <Link to={`/admin/newsletter`} className="no-underline">
            <div className="m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400 dark:text-white dark:hover:bg-slate-400 dark:hover:shadow-slate-600 dark:bg-slate-800 dark:hover:text-slate-900 dark:shadow-slate-900">
              <p className="font-semibold tracking-tight text-gray-900 dark:text-white text-base">
                Newsletter
              </p>
            </div>
          </Link>
          <Link to={`/`} className="no-underline">
            <div className="m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400 dark:text-white dark:hover:bg-slate-400 dark:hover:shadow-slate-600 dark:bg-slate-800 dark:hover:text-slate-900 dark:shadow-slate-900">
              <p className="font-semibold tracking-tight text-gray-900 dark:text-white text-base">
                Logout
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
