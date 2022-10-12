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

  async function GenerateReport(){
    alert("hello");
  }

  console.log(userID.firstname)
  return (
    <div className="paymentContainer">
      <div className="paymentHeader">
        <h1>Payment History</h1>
      </div>

      <div className="paymentDetailsHeader">
        <h3>
          <b>Product</b>
        </h3>
        <h3>
          <b>Quantity</b>
        </h3>
        <h3>
          <b>Sub Total</b>
        </h3>
      </div>

      <div className="paymentProductBox">
        <div className="row">
          <div className="col-xl-12">
            {/* map */}
            {products.map((Products, key) => (
              <div key={key}>
                <div className="payment-box">
                  <div className="row align-items-center ">
                    <div className="col-sm-2">
                      <img
                        className="Payment-product-Img"
                        src={Products.itemid.imgUrl}
                        alt="product"
                      ></img>
                    </div>

                    <div className="col-sm-4">
                      <div>
                        <h5>
                          <b>{Products.itemid.name}</b>
                        </h5>
                        <h6>Rs.{Products.itemid.price}.00</h6>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <h5>
                        <b>{Products.quantity}</b>
                      </h5>
                    </div>

                    <div className="col-sm-2">
                      <h5>
                        <b>Rs.{Products.itemid.price * Products.quantity}.00</b>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="PaymentButtonContainer">
        <button onClick={() => GenerateReport()}>
          Generate Report
        </button>
      </div>
    </div>
  );
}

export default PaymentHistory;
