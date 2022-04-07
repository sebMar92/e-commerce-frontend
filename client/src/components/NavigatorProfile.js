import React, { useEffect } from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOrder } from '../Redux/Actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import SelectProfileUser from './SelectProfileUser';
import { Link } from 'react-router-dom';

export const allCategories = [
  { icon: '♥', label: 'Wishlist' },
  { icon: '🛒', label: 'Cart' },
  { icon: '👜', label: 'Purchases' },
];

const [wishlist,carts,purchases] = allCategories;
export const tabs = [wishlist,carts,purchases];

export default function NavigatorProfile() {
  const dispatch = useDispatch();
  const ordersF = useSelector((state) => state.home.finished);
  const finished = ordersF.length > 0 && ordersF.slice(0, 4);
  const ordersC = useSelector((state) => state.home.inCart);
  const cart = ordersC.length > 0 && ordersC.slice(0, 4);
  const ordersW = useSelector((state) => state.home.inWishList);
  const wishlist = ordersW.length > 0 && ordersW.slice(0, 4);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [category, setCategory] = useState('');
  const resPut = useSelector((state) => state.home.resPutOrder);

  useEffect(() => {
    dispatch(getOrder({ status: 'inCart' }));
    dispatch(getOrder({ status: 'inWishList' }));
    dispatch(getOrder({ status: 'finished' }));
  }, []);

  useEffect(() => {
    if (selectedTab.label === 'Cart') {
      if (cart && !cart.hasOwnProperty('error')) {
        setCategory(
          cart.map((e) => {
            return (
              <SelectProfileUser
                title={e.title}
                img={e.images[0].url}
                price={e.price}
                id={e.id}
              />
            );
          })
        );
      } else {
        setCategory(<h1 className="text-center">{selectedTab.label} Empty</h1>);
      }
    }
    if (selectedTab.label === 'Wishlist') {
      if (wishlist && !wishlist.hasOwnProperty('error')) {
        setCategory(
          wishlist.map((e) => {
            return (
              <SelectProfileUser
                title={e.title}
                img={e.images[0].url}
                price={e.price}
                id={e.id}
              />
            );
          })
        );
      } else {
        setCategory(<h1 className="text-center">{selectedTab.label} Empty</h1>);
      }
    }
    if (selectedTab.label === 'Purchases') {
      if (finished && !finished.hasOwnProperty('error')) {
        setCategory(
          finished.map((e) => {
            return (
              <SelectProfileUser
                title={e.title}
                img={e.images[0].url}
                price={e.price}
                id={e.id}
              />
            );
          })
        );
      } else {
        setCategory(<h1 className="text-center">{selectedTab.label} Empty</h1>);
      }
    }
  }, [selectedTab]);

  return (
    <>
      <div className="w-[30rem] h-[25rem] flex flex-col rounded-lg border-4 border-primary-700/100 font-medium">
        <nav className="rounded-bl-none rounded-br-none h-10 ">
          <ul className="flex w-12/12">
            {tabs.map((item) => (
              <li
                key={item.label}
                className="text-lg rounded rounded-bl-none rounded-br-none sm:text-xl w-full relative bg-white cursor-pointer h-6 flex justify-between items-center min-w-0 select-none border-indigo-500/100"
                onClick={() => setSelectedTab(item)}
              >
                <div className="ml-auto mr-auto mt-2">{`${item.icon} ${item.label}`}</div>
                {item === selectedTab ? (
                  <motion.div
                    className="absolute left-0 right-0 top-7 h-px bg-blue-700"
                    layoutId="underline"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
        <main>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={selectedTab ? selectedTab.title : 'empty'}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.15 }}
            >
              {category}
            </motion.div>
          </AnimatePresence>
        </main>
        <Link
          to={`/${selectedTab.label}`}
          className="w-full h-8 text-center no-underline text-black text-xl font-medium bg-primary-700 mt-auto rounded-sm hover:bg-secondary-100"
        >
          Go to {selectedTab.label}
        </Link>
      </div>
    </>
  );
}
