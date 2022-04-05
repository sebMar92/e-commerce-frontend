import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postEmail, getBulkOrders, getOrder } from "../Redux/Actions/actions";

export default function SendingEmails() {
  const userInfo = useSelector((state) => state.home.user);
  const bulkOrders = useSelector((state) => state.home.bulkOrders);
  const product = useSelector((state) => state.home.finished);
  const email = userInfo.email;
  const dispatch = useDispatch();
  console.log(email);
  console.log(bulkOrders);
  console.log(product);
  useEffect(() => {
    dispatch(getBulkOrders({ status: "finished" }));
    dispatch(getOrder({ status: "finished" }));
  }, [dispatch]);
  /* dispatch(
    postEmail({
      title: "Purchase finished successfully",
      message: "Purchase finished successfully",
      receivers: email,
    })
  ); */
}
