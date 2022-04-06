import React from "react";
import NavBar from "./NavBar";
import CarouselPromo from "./CarouselPromo";
import CarouselCateg from "./CarouselCateg";
import Footer from "./Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios'
import {useSearchParams,useLocation} from 'react-router-dom'
import SkeletonCarrousel from "./Skeletons/SkeletonCarrousel";
import { useDispatch,useSelector } from "react-redux";
import { getOrder,getProducts,getCategories,clearProductAndCategory } from "../Redux/Actions/actions";


export default function Home() {

  const dispatch = useDispatch()
  const categories = useSelector((state) => state.home.categories);
 /*  const [loaded,setLoaded] = useState(false) */
  const notify = () => {
    toast.success("Added to the wishlist !", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  const notify2 = () => {
    toast.success("Added to the cart !", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

/*   useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getOrder({ status: "inCart" }))
    dispatch(getOrder({ status: "inWishList" }))
    return () => {
      dispatch(clearProductAndCategory());
      setLoaded(false);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 5500);
  }, [categories]);

 */

  return (
    <>
    <div>
      <ToastContainer autoClose={2000} />
      <NavBar />
      <CarouselPromo />
      <div className="md:my-32">
        <CarouselCateg onClick={notify} onClick2={notify2} />
      </div>
      <Footer />
      </div>
    </>
  );
}
