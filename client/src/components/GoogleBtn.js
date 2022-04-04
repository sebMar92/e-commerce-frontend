import axios from 'axios';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postOrder } from '../Redux/Actions/actions';

export default function GoogleBtn({ renderProp }) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const successResponseGoogle = (res) => {
    axios
      .post('/google/login', { tokenId: res.tokenId })
      .then((res) => {
        if (res.data.hasOwnProperty('error')) throw new Error(res.data.error);
        window.localStorage.setItem('access', res.data.accessToken);
        window.localStorage.setItem('refresh', res.data.refreshToken);
        const wishList = window.localStorage.getItem('inWishList');
        const cart = window.localStorage.getItem('inCart');

        if (cart) {
          var parsedCart = JSON.parse(cart);
          parsedCart.map((el) =>
            dispatch(postOrder({ ...el, amount: el.orders[0].amount }))
          );
          window.localStorage.removeItem('inCart');
        }

        if (wishList) {
          var parsedWishList = JSON.parse(wishList);
          parsedWishList.map((el) => dispatch(postOrder(el)));
          window.localStorage.removeItem('inWishList');
        }
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const failureResponseGoogle = (err) => {
    console.log(err);
  };

  return (
    <GoogleLogin
      clientId="198710187147-dim2r4rgilk91splr36jrusavrpj57n3.apps.googleusercontent.com"
      onSuccess={successResponseGoogle}
      onFailure={failureResponseGoogle}
      cookiePolicy={'single_host_origin'}
      render={renderProp}
    />
  );
}
