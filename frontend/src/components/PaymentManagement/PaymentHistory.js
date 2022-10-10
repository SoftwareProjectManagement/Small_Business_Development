import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "aos/dist/aos.css";
import Aos from "aos";
import { useParams } from "react-router-dom";

import "./PaymentHistory.css";

function PaymentHistory(props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [payments, setPayments] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState("");
  const params = useParams();

  const userID = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    if (localStorage.getItem("adminAuthToken")) {
      setIsAdmin(true);
    }
    //Fetch Payments
    async function getAllProducts() {
      axios
        .get(`http://localhost:8070/payment/viewPayments/${userID._id}`)
        .then((res) => {
          setProducts(res.data.payment[0].itemList);
          console.log(res.data.payment[0].itemList);
        })
        .catch((error) => {
          alert("Failed to fetch Category");
        });
    }
    getAllProducts();
  }, []);

  console.log(products);

  return (
    <div className="paymentContainer">
      <div className="paymentHeader">
        <h1>Payment History</h1>
      </div>

      <div className="paymentDetailsHeader"></div>

      <div className="">
        {products.map((Products, key) => (
          <div key={key}>
            <div>
              <h3>{`${Products.itemid.name}`}</h3>
            </div>
            <div className="col-sm-2">
              <div>
                <img
                  className="Payment-product-Img"
                  src={Products.itemid.imgUrl}
                  alt="product"
                ></img>
              </div>
            </div>
            <div>
              <h3>{`${Products.itemid.price}`}</h3>
            </div>
            <div>
              <h3>{`${Products.quantity}`}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentHistory;
