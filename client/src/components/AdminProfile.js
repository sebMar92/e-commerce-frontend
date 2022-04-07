import React, { useEffect, useState } from 'react';
import Footer from './Footer/Footer';
import NavbarAdmin from './NavbarAdmin';
import NavBarEmpty from './NavBarEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getOrder,
  getBulkAdmin,
  getUsersInfo,
  getCategories,
} from '../Redux/Actions/actions';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
var dayjs = require('dayjs');

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AdminProfile() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.home.bulkAdmin);
  const user = useSelector((state) => state.home.users);
  const fecha = []; // fecha de la compra
  const cantidad = [];// cantidad por orden
  const product = []; 
  const priceCu = [];
  const ventas =[];
  const cantidadProduct = [];
  console.log(cantidad)


  


  if (products) {
    products.map((f) => {
      if (f.orders) {
        fecha.push(dayjs(f.orders[0].serverPurchaseDate).format('MMMM D, YYYY'));
      } else {
        fecha.push(dayjs(f.updatedAt).format('MMMM D, YYYY'));
      }
    });
  }

  if (products) {
    products.map((p) => {
      if (p.orders) {
        cantidad.push(p.orders[0].amount);
      } else {
        cantidad.push(p.products.length);
      }
    });
  }

  if (products) {
    products.map((p) => {
      if (p.orders) {
        cantidadProduct.push(p.orders[0].amount);
      } else {
        console.log(p.products)
        p.products.map((und)=>{
          cantidadProduct.push(und.length);
        })
     
      }
    });
  }

  if (products) {
    products.map((pr) => {
      if (pr.orders) {
        product.push(pr.title);
      } else {
        pr.products.map((gPr) => {
          product.push(gPr.title);
        });
      }
    });
  }

  if (products) {
    products.map((p) => {
      if (p.orders) {
        priceCu.push(p.price);
      } else {
        p.products.map((pr) => {
          priceCu.push(pr.price);
        });
      }
    });
  }



  useEffect(() => {
    dispatch(getBulkAdmin({ status: 'finished' }));
    dispatch(getUsersInfo())
  }, []);

  const data = {
    labels: fecha,
    datasets: [
      {
        label: 'ventas',
        data: cantidad,
        fill: true,
        backgroundColor: 'rgb(255,209,138)',
        borderColor: 'rgb(255,170,40, 0.4)',
        pointRadius: 6,
        pointBackgroundColor: 'rgb(255,162,21)',
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        font: {
          size: 7,
        },
      },
    },
  };

  const data2 = {
    labels: product,
    datasets: [
      {
        label: 'Products',
        data: priceCu,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        pointBackgroundColor: 'rgb(255,162,21)',
      },
    ],
  };

  /* const data3 = {
    labels: [3, 5, 3, 6],
    datasets: [
      {
        label: "Category",
        data: [10, 19, 3, 5, 2, 3, 10],

        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getOrder({ status: "finished" }));
    dispatch(getUsersInfo());
  }, []); */

  return (
    <>
      <NavBarEmpty />
      <div className="flex flex-col sm:flex-row font-lora">
        <NavbarAdmin />
        <div className="mx-auto w-full xl:w-full h-screen">
          <h1 className="mx-auto text-center"> Admin profile </h1>
          <div className="w-full h-[18rem] md:table hidden">
            <Line className="w-full h-full " data={data} options={options} height="70" />
          </div>
          <div className="flex justify-between  w-full ">
            <div className="w-full md:table hidden h-200 ">
              <Bar className="w-full  " data={data2} />
            </div>

            <div className="md:table hidden justify-center my-auto m-5 w-3/4 h-40 bg-secondary-100 rounded-lg text-center hover:bg-primary-300 overflow-auto">
              <Link to="/admin/users" className="no-underline text-black">
                <h3 className="bg-secondary-200">Latest users</h3>
                {user &&
                  user.length > 0 &&
                  user.map((us) => {
                    if (us.rol === 'user') {
                      var name = us.firstName.split(' ')[0].toLowerCase();
                      var apellido = us.lastName.split(' ')[0].toLowerCase();

                      return (
                        <p className="border border-secondary-200 overflo  w-auto  ">
                          {name.charAt(0).toUpperCase() +
                            name.slice(1) +
                            ' ' +
                            apellido.charAt(0).toUpperCase() +
                            apellido.slice(1)}
                        </p>
                      );
                    }
                  })}
                <p className="border border-secondary-200 overflow-auto  ">otro...</p>
                <p className="border border-secondary-200 overflow-auto  ">otro...</p>
              </Link>
            </div>

            {/* <div className="w-[20rem] md:table hidden">
              <Doughnut data={data3} />
            </div> */}
          </div>
          <div className="w-full md:hidden ">
            <div className="w-full h-40 ">
              <Line
                className="w-full h-full "
                data={data}
                options={options}
                height="60"
              />
            </div>
            <div className="w-full h-200 ">
              <Bar className="w-full  " data={data2} />
            </div>
            <div className=" m-5 w-3/4 h-40 justify-center bg-secondary-100 rounded-lg text-center hover:bg-primary-300 overflow-auto">
              <Link to="/admin/users" className="no-underline text-black">
                <h3 className="bg-secondary-200">Latest users</h3>
                {user &&
                  user.length > 0 &&
                  user.map((us) => {
                    if (us.rol === 'user') {
                      var name = us.firstName.split(' ')[0].toLowerCase();
                      var apellido = us.lastName.split(' ')[0].toLowerCase();

                      return (
                        <p className="border border-secondary-200 overflo  w-auto  ">
                          {name.charAt(0).toUpperCase() +
                            name.slice(1) +
                            ' ' +
                            apellido.charAt(0).toUpperCase() +
                            apellido.slice(1)}
                        </p>
                      );
                    }
                  })}
                <p className="border border-secondary-200 overflow-auto  ">otro...</p>
                <p className="border border-secondary-200 overflow-auto  ">otro...</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
