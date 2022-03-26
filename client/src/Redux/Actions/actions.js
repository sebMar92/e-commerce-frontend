import axios from 'axios';
import {
  GET_PRODUCTS,
  GET_CATEGORIES,
  GET_PRODUCT_BY_ID,
  GET_SEARCH,
  POST_NEWUSER,
  VALIDATE_MAIL,
  LOGIN_USER,
  POST_ORDERS,
  GET_ORDERS,
  GET_USER_INFO,

} from './types';

// action para traer los productos
export function getProducts(search) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/products${search}`);

    return dispatch({
      type: GET_PRODUCTS,
      payload: json.data,
    });
  };
}

//action para traer las categorias
export function getCategories() {
  return async function (dispatch) {
    var json = await axios.get('http://localhost:3001/categories');
    return dispatch({
      type: GET_CATEGORIES,
      payload: json.data,
    });
  };
}

//action para traer el producto por id
export function getProductByID(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get('http://localhost:3001/products/' + id);
      return dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//
export function getSearch(query) {
  return async (dispatch) => {
    try {
      const products = await axios.get(
        `http://localhost:3001/products?limit=100&search=${query}`
      );
      const categories = await axios.get(
        `http://localhost:3001/categories?search=${query}`
      );
      return dispatch({
        type: GET_SEARCH,
        payload: { products: products.data, categories: categories.data },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postProduct(product) {
  return async function () {
    const create = await axios.post('http://localhost:3001/products', product);
    return create;
  };
}

export function postNewUser(obj) {
  return async function (dispatch) {
    const user = await axios.post('http://localhost:3001/user', obj);
    return dispatch({
      type: POST_NEWUSER,
      payload: user.data,
    });
  };
}

export function loginUser(val) {
  return async function (dispatch) {
    const login = await axios.post('http://localhost:3001/user/login', val);
    return dispatch({
      type: LOGIN_USER,
      payload: login.data,
    });
  };
}

export function validateMail(mail) {
  return async function (dispatch) {
    const validate = await axios.post('http://localhost:3001/user/email', mail);
    return dispatch({
      type: VALIDATE_MAIL,
      payload: validate.data,
    });
  };
}
/* 
export function postOrder(order, token){
  const headers ={
    "Authorization": `Bearer ${token}`
  }
  return async function(dispatch){
  
    try{
      const crearCart= await axios.post("http://localhost:3001/order", order, {headers: headers});
      return dispatch({
        type: POST_ORDERS,
        payload: crearCart.data
      });
    }catch (error){
      console.log(error)
    }
  }
  }

  export function getOrder(token) {
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    return async (dispatch) => {
      try {
        
        const cart = await axios.post('http://localhost:3001/order',{status:"inCart"}, { headers: headers });
        return dispatch({
          type: GET_ORDERS,
          payload: cart.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }  */


  export function postOrder(order, token){
    const headers ={
      "Authorization": `Bearer ${token}`
    };

    return (dispatch) => {
      try {
        return axios.
        post("http://localhost:3001/order", order, {headers: headers})
          .then((res) => {
            dispatch({
              type: POST_ORDERS,
                payload: res.data
            });
          })
          .catch((error) => {
            if (error.response.status === 403) {
              let refreshToken = window.localStorage.getItem('refresh');
              axios
                .post('http://localhost:3001/user/token', { token: refreshToken })
                .then((res) => {
                  window.localStorage.setItem('access', res.data.token);
                  axios
                    .post('http://localhost:3001/order',order, {
                      headers: {
                        'Authorization': `Bearer ${res.data.token}`,
                      },
                    })
                    .then((res) => {
                      dispatch({
                        type: POST_ORDERS,
                        payload: res.data
                      });
                    });
                });
            }
          });
      } catch (error) {
        console.log(error);
      }
    };
  }
  
  // para llamar cart y whislist -finali -proces

    export function getOrder(order) {

      const token = window.localStorage.getItem('access')


      const headers = {
        'Authorization': `Bearer ${token}`,
      };
     
      return (dispatch) => {
        try {
          return  axios.get('http://localhost:3001/order?status='+ order.status, { headers: headers })
          .then(res=> {
            dispatch({
              type: GET_ORDERS,
              payload: res.data,
            });
          }) 
        .catch ((error) => {
          if(error.response.status === 403){
            let refreshToken = window.localStorage.getItem('refresh');
            axios
              .post('http://localhost:3001/order', { token: refreshToken })
              .then((res) => {
                window.localStorage.setItem('access', res.data.token);
                  axios
                    .get('http://localhost:3001/order', {
                      headers: {
                        'Authorization': `Bearer ${res.data.token}`,
                      },
                    })
                    .then((res) => {
                      dispatch({
                        type: GET_ORDERS,
                        payload: res.data,
                      });
                    });
              });
            }
          })
        } catch(error){
          console.log(error);
        }
      };
    } 

export function getUserInfo(token) {
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  return (dispatch) => {
    try {
      return axios
        .get('http://localhost:3001/user', { headers: headers })
        .then((res) => {
          dispatch({
            type: GET_USER_INFO,
            payload: res.data,
          });
        })
        .catch((error) => {
          if (error.response.status === 403) {
            let refreshToken = window.localStorage.getItem('refresh');
            axios
              .post('http://localhost:3001/user/token', { token: refreshToken })
              .then((res) => {
                window.localStorage.setItem('access', res.data.token);
                axios
                  .get('http://localhost:3001/user', {
                    headers: {
                      'Authorization': `Bearer ${res.data.token}`,
                    },
                  })
                  .then((res) => {
                    dispatch({
                      type: GET_USER_INFO,
                      payload: res.data,
                    });
                  });
              });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
}
 