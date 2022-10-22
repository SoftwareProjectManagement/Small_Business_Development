import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "aos/dist/aos.css";
import Aos from "aos";
import { useParams } from "react-router-dom";
import GetAppIcon from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";
import { orange } from "@material-ui/core/colors";
import { useReactToPrint } from "react-to-print";

import "./History.css";

function History(props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [payments, setPayments] = useState([]);
  const [user, setUser] = useState("");
  const params = useParams();

  const userID = JSON.parse(localStorage.getItem("user"));

  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    if (localStorage.getItem("adminAuthToken")) {
      setIsAdmin(true);
    }
    //Fetch Payments
    async function getAllPayments() {
      axios
        .get(`http://localhost:8070/payment/viewPayments/${userID._id}`)
        .then((res) => {
          setPayments(res.data.payment);
          console.log(res.data.payment);
        })
        .catch((error) => {
          alert("Failed to fetch Category");
        });
    }
    getAllPayments();
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  async function GenerateReport() {
    alert("hello");
  }

  console.log(userID);

  return (
    <div className="paymentContainer">
      <div ref={componentRef}>
        <div className="row">
          <div className="col-xl-2" align="center">
            <img src="/images/Logo.png" width="100px" alt="logo" />
          </div>
          <div className="col-xl-8" align="center">
            <h3>Ceylon Capital Crop</h3>
            <h6>Digitally Generated Payment History Report</h6>
          </div>
          <div className="col-xl-2" align="right">
            <p>
              {date}/{month}/{year}
            </p>
          </div>
        </div>

        <div className="paymentProductBox">
          <div className="row">
            <div className="col-xl-12">
              <div className="col-xl-12 detailsUser">
                <img
                  className="Payment-product-Img"
                  src={userID.imgUrl}
                  alt="product"
                ></img>
                <h5>
                  <b>
                    {userID.firstname} {userID.lastname}
                  </b>
                  <br />
                  <br />
                  {userID.email}
                </h5>
              </div>

              <div className="paymentDetailsHeader"></div>

              {payments.map((Payments, key) => (
                <div key={key}>
                  <div className="payment-box">
                    <div className="row align-items-center item-center">
                      <div className="col-sm-6">
                        <h5>
                          <b>Paid Amount : Rs.{Payments.amount}.00</b>
                        </h5>
                      </div>

                      <div className="col-sm-6">
                        <h5>
                          <b>Date : {Payments.date}</b>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <center>
        <div className="w-25 p-3" align="center">
          <Button
            className="print__button"
            variant="contained"
            color="secondary"
            endIcon={<GetAppIcon />}
            style={{ backgroundColor: orange[900], color: "white" }}
            disableElevation
            onClick={handlePrint}
            fullWidth
          >
            Download Details
          </Button>
        </div>
      </center>
    </div>
  );
}

export default History;
