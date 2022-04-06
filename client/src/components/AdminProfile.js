import React, { useEffect } from "react";
import Footer from "./Footer/Footer";
import NavbarAdmin from "./NavbarAdmin";
import NavBarEmpty from "./NavBarEmpty";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getOrder,
  getBulkAdmin,
  getUsersInfo,
  getCategories,
} from "../Redux/Actions/actions";
import { Line, Bar, Doughnut } from "react-chartjs-2";
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
} from "chart.js";

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
  

  console.log(products)
  useEffect(()=> {

    dispatch (getBulkAdmin({ status:"finished"}))
  
  },[])

  const data = {
    labels: ["1/Mar", "2/Mar", "3/Mar", "4/Mar", "5/Mar", "6/Mar", "7/Mar"],
    datasets: [
      {
        label: "ventas",
        data: [10, 19, 3, 5, 2, 3, 10],
        fill: true,
        backgroundColor: "rgb(255,209,138)",
        borderColor: "rgb(255,170,40, 0.4)",
        pointRadius: 6,
        pointBackgroundColor: "rgb(255,162,21)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend:{
        font:{
          size:7
        }
      }
    }
  };

  const data2 = {
    labels: [1,2,3,4],
    datasets: [
      {
        label: "Products",
        data: [10, 19, 3, 5, 2, 3, 2],
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
        pointBackgroundColor: "rgb(255,162,21)",
      
      },
    ],
  };

  const data3 = {
    labels: [3,5,3,6],
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
  }, []);

  return (
    <>
      <NavBarEmpty />
      <div className="flex flex-col sm:flex-row">
        <NavbarAdmin className="w-1/5" />

        <div className="mx-auto w-4/5">
          <h1 className="mx-auto text-center"> Admin's profile </h1>
          <div className=" w-full h-2/4">
            <Line
              className=" w-full h-full "
              data={data}
              options={options}
              height="60"
            />
          </div>
          <div className="flex justify-evelyn m-auto w-2/3 ">
             
                <div className="w-full  h-200 ">
                  <Bar className="w-full" data={data2} />
                </div>
              
                  <div className="m-5 w-2/3 h-40 bg-secondary-100 rounded-lg text-center hover:bg-primary-300 overflow-auto">
                  <Link to="/admin/users" className="no-underline text-black">
                    <h3 className="bg-secondary-200 ">Usuarios</h3>
                    {user &&
                      user.length > 0 &&
                      user.map((us) => {
                        if (us.rol === "user") {
                          return <p className="border border-secondary-200 overflo  w-auto  ">{us.firstName + " " + us.lastName}</p>;
                        
                        }
                      })}
                      <p className="border border-secondary-200 overflow-auto  ">otro...</p>
                      <p className="border border-secondary-200 overflow-auto  ">otro...</p>
                     

                      </Link>
                  </div>
              
            <div className="w-full h-38">
              <Doughnut className="  w-full " data={data3} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
