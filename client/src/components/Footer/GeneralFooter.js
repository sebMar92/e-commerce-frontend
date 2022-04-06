import React from 'react';
import { Link } from 'react-router-dom';
import {
  AiFillGithub,
  AiOutlineLinkedin,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { BiArrowToLeft } from 'react-icons/bi';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { CgMail, CgProfile } from 'react-icons/cg';
import { MdFavorite, MdOutlineShoppingBag } from 'react-icons/md';

export default function GeneralFooter() {
  const localStorageAccess = window.localStorage.getItem('access');
  const localStorageRefresh = window.localStorage.getItem('refresh');

  function handleClickFooterG() {
    document.getElementById('footerGeneral').classList.toggle('hidden');
  }

  function handleAlert(arg) {
    if (arg === 'profile') {
      alert('You must be logged in to see your profile.');
    }
    if (arg === 'shopps') {
      alert('You must be logged in to see your purchases.');
    }
  }

  return (
    <div>
      <footer>
        <div>
          <div id="footerGeneral" className="sm:block">
            <div className="bg-gray-300 flex flex-nowrap m-auto sm:justify-center justify-around p-4 content-center font-lora font-semibold">
              <div className="flex sm:flex-row flex-col justify-between">
                <div className="m-2 lg:mr-20 sm:mr-8 xl:mr-60">
                  <h3 className="flex justify-center text-2xl md:text-3xl">About us</h3>
                  <Link
                    to="/profiles"
                    className="text-decoration-line: no-underline text-black"
                  >
                    <h5 className="items-center flex ml-8 m-2 text-lg md:text-sm">
                      Click to see more
                      <BiArrowToLeft />
                    </h5>
                  </Link>
                </div>

                <div className="m-2 lg:mr-20 sm:mr-8 xl:mr-60">
                  <h3 className="flex justify-center text-2xl md:text-3xl">Follow us</h3>

                  <a href="" className="no-underline text-black">
                    <h5 className="flex ml-8 m-2 text-lg md:text-sm">
                      <AiOutlineFacebook />
                      Facebook
                    </h5>
                  </a>
                  <a href="" className="no-underline text-black">
                    <h5 className="flex ml-8 m-2 text-lg md:text-sm">
                      <AiOutlineTwitter />
                      Twitter
                    </h5>
                  </a>
                  <a href="" className="no-underline text-black">
                    <h5 className="flex ml-8 m-2 text-lg md:text-sm">
                      <AiOutlineInstagram />
                      Instagram
                    </h5>
                  </a>
                </div>
              </div>

              <div className="flex sm:flex-row flex-col">
                <div className="m-2 lg:mr-20 sm:mr-8 xl:mr-60">
                  <h3 className="flex justify-center text-2xl md:text-3xl">Need help?</h3>
                  <a
                    href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=DmwnWsLPtkNmvlMqVnDjlPPRxjmPzjBJnXlZqFVwPjHtQNJJcsVgxbtxnXfQBwGtGTzpnCWrmxLQ"
                    className="no-underline text-black"
                  >
                    <h5 className="flex ml-8 m-2 text-lg md:text-sm">
                      <CgMail />
                      Contact us
                    </h5>
                  </a>
                </div>

                <div className="m-2">
                  <h3 className="flex justify-center text-2xl md:text-3xl">My account</h3>
                  {!localStorageAccess && !localStorageRefresh ? (
                    <h5
                      onClick={() => handleAlert('profile')}
                      className="cursor-pointer flex ml-8 m-2 text-lg md:text-sm"
                    >
                      <CgProfile />
                      Profile
                    </h5>
                  ) : (
                    <Link to={`/user`} className="no-underline text-black">
                      <h5 className="flex ml-8 m-2 text-lg md:text-sm">
                        <CgProfile />
                        Profile
                      </h5>
                    </Link>
                  )}
                  <Link to={`/wishlist`} className="no-underline text-black">
                    <h5 className="flex ml-8 m-2 text-lg md:text-sm">
                      <MdFavorite />
                      Favorites
                    </h5>
                  </Link>

                  <Link to={`/cart`} className="no-underline text-black">
                    <h5 className="flex ml-8 m-2 text-lg md:text-sm">
                      <AiOutlineShoppingCart />
                      Shopping cart
                    </h5>
                  </Link>
                  {!localStorageAccess && !localStorageRefresh ? (
                    <h5
                      onClick={() => handleAlert('shopps')}
                      className="cursor-pointer flex ml-8 m-2 text-lg md:text-sm"
                    >
                      <MdOutlineShoppingBag />
                      Purchases
                    </h5>
                  ) : (
                    <Link to={`/purchases`} className="no-underline text-black">
                      <h5 className="flex ml-8 m-2 text-lg md:text-sm">
                        <MdOutlineShoppingBag />
                        Purchases
                      </h5>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="bg-gray-300 text-center mt-3 p-1 text-lg md:text-md">
          © 2022 by TechStore
        </p>
      </footer>
    </div>
  );
}
