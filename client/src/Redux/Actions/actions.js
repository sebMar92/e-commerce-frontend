import axios from 'axios';
import { requestInterceptor, responseInterceptor } from './interceptors';
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
  PUT_PRODUCT_BY_ID,
  DELETE_ORDERS,
  GET_COMMENT_BY_ID,
  PUT_USER_INFO,
  GET_SALES,
  GET_PRODUCTS_SALES,
  PUT_ORDERS,
  PUT_ORDERS_AMOUNT,
  DELETE_SALE,
} from './types';

requestInterceptor();
responseInterceptor();

// action para traer los productos
export function getProducts(search) {
  return async function (dispatch) {
    var json = await axios.get(`/products${search}`);

    return dispatch({
      type: GET_PRODUCTS,
      payload: json.data,
    });
  };
}

//action para traer las categorias
export function getCategories() {
  return async function (dispatch) {
    var json = await axios.get('/categories');
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
      var json = await axios.get('/products/' + id);
      return dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putProductByID(id) {
  return async function (dispatch) {
    try {
      var json = await axios.put('/products/' + id);
      return dispatch({
        type: PUT_PRODUCT_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateComment(comment, token) {
  return async function () {
    try {
      const commentUpdated = await axios.put('/comment', comment);
      return commentUpdated;
    } catch (error) {
      console.log(error);
    }
  };
}

export function postComment(comment, token) {
  return async function () {
    try {
      const commentCreated = await axios.post('/comment', comment);
      return commentCreated;
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteComment(id, token) {
  return async function () {
    try {
      const commentDeleted = await axios.delete('/comment', {
        data: { id: id },
      });
      return commentDeleted;
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCommentByID(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/comment/?productId=${id}`);
      return dispatch({
        type: GET_COMMENT_BY_ID,
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
      const products = await axios.get(`/products?limit=100&search=${query}`);
      const categories = await axios.get(`/categories?search=${query}`);
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
    const create = await axios.post('/products', product);
    return create;
  };
}

export function postNewUser(obj) {
  return async function (dispatch) {
    const user = await axios.post('/user', obj);
    return dispatch({
      type: POST_NEWUSER,
      payload: user.data,
    });
  };
}

export function loginUser(val) {
  return async function (dispatch) {
    const login = await axios.post('/user/login', val);
    return dispatch({
      type: LOGIN_USER,
      payload: login.data,
    });
  };
}

export function validateMail(mail) {
  return async function (dispatch) {
    const validate = await axios.post('/user/email', mail);
    return dispatch({
      type: VALIDATE_MAIL,
      payload: validate.data,
    });
  };
}


export function postOrder(order){
  const token = window.localStorage.getItem('access');
  console.log(token)
  if(token){
    return async function (dispatch) {
      var json = await axios.post(`http://localhost:3001/order`, order);
      console.log(json.data)
      return dispatch({
        type: POST_ORDERS,
        payload: {status: order.status, data: json.data},
      });
    }
  } else {
      if(!window.localStorage.getItem(`${order.status}`)) {
        console.log("hola2")
        const product =  {
          status: order.status,
          amount: order.amount,
          productId: order.productId,
          id: order.productId,
          title: order.title,
          shippingCost: order.shippingCost,
          stock: order.stock,
          description: order.description,
          images: order.images,
          orders: [{id:0}],
          price: order.price
        };
        var arr = []
        arr.push(product)
        window.localStorage.setItem(`${order.status}`, JSON.stringify(arr))
        var item = window.localStorage.getItem(`${order.status}`)
        console.log(JSON.parse(item))
    } else {
      const product =  {
        status: order.status,
        amount: order.amount,
        productId: order.productId,
        id: order.productId,
        title: order.title,
        shippingCost: order.shippingCost,
        stock: order.stock,
        description: order.description,
        images: order.images,
        orders: [{id:0}],
        price: order.price
      };
      var item = window.localStorage.getItem(`${order.status}`)
      var parsedItem = JSON.parse(item)
      parsedItem.push(product)
      window.localStorage.setItem(`${order.status}`, JSON.stringify(parsedItem))
    }
    return ({
      type: "NONE"

    });
  };
}
/*   const token = window.localStorage.getItem('access')
  const headers ={
    "Authorization": `Bearer ${token}`
  };

  return (dispatch) => {
    try {
      
      return axios.
      post("/order", order, {headers: headers})
        .then((res) => {
          dispatch({
            type: POST_ORDERS,
            payload: {status: order.status, data: res.data},
          });
        })
        .catch((error) => {
          if (error.response.status === 403) {
            let refreshToken = window.localStorage.getItem('refresh');
            axios
              .post('/user/token', { token: refreshToken })
              .then((res) => {
                window.localStorage.setItem('access', res.data.token);
                axios
                  .post('/order',order, {
                    headers: {
                      'Authorization': `Bearer ${res.data.token}`,
                    },
                  })
                  .then((res) => {
                    dispatch({
                      type: POST_ORDERS,
                      payload: {status: order.status, data: res.data},
                    });
                  });
              });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
} */


// para llamar cart y whislist -finali -proces
//json.data es un array de objetos
  export function getOrder(order) {
    const token = window.localStorage.getItem('access');

    if(token){
      return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/order?status=` + order.status);
        console.log(json.data)
        return dispatch({
          type: GET_ORDERS,
          payload: {status: order.status, data: json.data},
        });
      };
    } else {
        return function (dispatch) {
          const item = window.localStorage.getItem(`${order.status}`)
          const parsedItem = JSON.parse(item);
          console.log(parsedItem)
            return dispatch({
              type: GET_ORDERS,
              payload: {status: order.status, data: parsedItem},
            });
        }
    }


export function changeOrderStatus(order) {
  console.log(order)
  return async function (dispatch) {
    var json = await axios.put(`/order/${order.id}?status=${order.status}`);
    return dispatch({
      type: PUT_ORDERS,
      payload: { status: order.status, data: json.data },
    });

  }
}

export function changeOrderAmount(order) {
  console.log(order)
  return async function (dispatch) {
    var json = await axios.put(`/order/${order.id}?amount=${order.amount}`);
    return dispatch({
      type: PUT_ORDERS_AMOUNT,
      payload: { status: order.status, data: json.data },
    });
  }
}


export function getOrder(order) {
  return async function (dispatch) {
    var json = await axios.get(`/order?status=` + order.status);
    return dispatch({
      type: GET_ORDERS,
      payload: { status: order.status, data: json.data },
    });
  };
}
/*     const token = window.localStorage.getItem('access')
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    return (dispatch) => {
      try {
        return  axios.get('/order?status='+ order.status, { headers: headers })
        .then(res=> {
          dispatch({
            type: GET_ORDERS,
            payload: {status: order.status, data: res.data},
            
          });
        }) 
      .catch ((error) => {
        if(error.response.status === 403){
          let refreshToken = window.localStorage.getItem('refresh');
          axios
            .post('/order', { token: refreshToken })
            .then((res) => {
              window.localStorage.setItem('access', res.data.token);
                axios
                  .get('/order', {
                    headers: {
                      'Authorization': `Bearer ${res.data.token}`,
                    },
                  })
                  .then((res) => {
                    dispatch({
                      type: GET_ORDERS,
                      payload: {status: order.status, data: res.data},
                    });
                  });
            });
          }
        })
      } catch(error){
        console.log(error);
      }
    };

  } */

export function deleteOrder(order) {
  return async function (dispatch) {
    var json = await axios.delete(`/order/${order}`);
    return dispatch({
      type: DELETE_ORDERS,
      payload: json.data,
    });
  };
}
/*    const token = window.localStorage.getItem('access')

      const headers ={
        "Authorization": `Bearer ${token}`
      };
      return (dispatch) => {
        try {
        
          return axios
          .delete(`/order/${order}`, {headers: headers})
            .then((res) => {
              dispatch({
                type: DELETE_ORDERS,
                payload: res.data,
              });
            })
            .catch((error) => {
              if (error.response.status === 403) {
                let refreshToken = window.localStorage.getItem('refresh');
                axios
                  .post('/user/token', { token: refreshToken })
                  .then((res) => {
                    window.localStorage.setItem('access', res.data.token);
                    axios
                      .delete(`/order${order}`, {
                        headers: {
                          'Authorization': `Bearer ${res.data.token}`,
                        },
                      })
                      .then((res) => {
                        dispatch({
                          type: DELETE_ORDERS,
                          payload: res.data,
                        });
                      });
                  });
              }
            });
        } catch (error) {
          console.log(error);
        }
      }; */

/* export function getUserInfo(token) {
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  return (dispatch) => {
    try {
      return axios
        .get('/user', { headers: headers })
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
              .post('/user/token', { token: refreshToken })
              .then((res) => {
                window.localStorage.setItem('access', res.data.token);
                axios
                  .get('/user', {
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
} */

export function getUserInfo() {
  return async function (dispatch) {
    const user = await axios.get('/user');
    return dispatch({
      type: GET_USER_INFO,
      payload: user.data,
    });
  };
}

export function putUserInfo(token, body) {
  return async (dispatch) => {
    try {
      const userChangeData = await axios.put('/user', body);
      return dispatch({
        type: PUT_USER_INFO,
        payload: userChangeData.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSales() {
  return async function (dispatch) {
    var json = await axios.get('/sale');
    return dispatch({
      type: GET_SALES,
      payload: json.data,
    });
  };
}

export function postSale(body) {
  return async function (dispatch) {
    var json = await axios.post('/sale', body);
  };
}
/*   return (dispatch) => {
    try {
      return axios
        .post('/sale', body)
        .catch((error) => {
          if (error.response.status === 403) {
            let refreshToken = window.localStorage.getItem('refresh');
            axios
              .post('/user/token', { token: refreshToken })
              .then((res) => {
                window.localStorage.setItem('access', res.data.token);
                axios.post('/sale', body, {
                  headers: {
                    'Authorization': `Bearer ${res.data.token}`,
                  },
                });
              });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }; */

export function editSale(body) {
  return async function (dispatch) {
    var json = await axios.put('/sale', body);
  };
}

/*  return (dispatch) => {
    try {
      return axios
        .put('/sale', body, { headers: headers })
        .catch((error) => {
          if (error.response.status === 403) {
            let refreshToken = window.localStorage.getItem('refresh');
            axios
              .post('/user/token', { token: refreshToken })
              .then((res) => {
                window.localStorage.setItem('access', res.data.token);
                axios.put('/sale', body, {
                  headers: {
                    'Authorization': `Bearer ${res.data.token}`,
                  },
                });
              });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }; */
export function deleteSale(id) {
  return async function (dispatch) {
    var json = await axios.delete('/sale?saleId=' + id);
    return dispatch({
      type: DELETE_SALE,
      payload: json.data,
    });
  };
}
// const token = window.localStorage.getItem('access');
// const headers = {
//   'Authorization': `Bearer ${token}`,
// };

// return (dispatch) => {
//   try {
//     return axios
//       .delete('/sale?saleId=' + id, { headers: headers })
//       .catch((error) => {
//         if (error.response.status === 403) {
//           let refreshToken = window.localStorage.getItem('refresh');
//           axios
//             .post('/user/token', { token: refreshToken })
//             .then((res) => {
//               window.localStorage.setItem('access', res.data.token);
//               axios.delete('/sale?saleId=' + id, {
//                 headers: {
//                   'Authorization': `Bearer ${res.data.token}`,
//                 },
//               });
//             });
//         }
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

export function getAllProductsForSales() {
  return async function (dispatch) {
    var json = await axios.get('/products?limit=1000');
    return dispatch({
      type: GET_PRODUCTS_SALES,
      payload: json.data,
    });
  };
}
