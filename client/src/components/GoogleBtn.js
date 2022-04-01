import axios from 'axios';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

export default function GoogleBtn({ renderProp }) {
  let navigate = useNavigate();
  const successResponseGoogle = (res) => {
    axios
      .post('/google/login', { tokenId: res.tokenId })
      .then((res) => {
        if (res.data.hasOwnProperty('error')) throw new Error(res.data.error);
        window.localStorage.setItem('access', res.data.accessToken);
        window.localStorage.setItem('refresh', res.data.refreshToken);
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
