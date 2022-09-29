import React, { useState } from "react";
import "./CardPayModal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";

function CardPay({ setOpenCardModal }) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [pinNo, setPinNo] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [creditCardNumber,setCreditCardNumber]= useState("");

  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };

  async function register(event) {
    event.preventDefault();

    const newPayment = { mobileNumber, pinNo, date };

    try {
      // await axios.post(
      //   "http://localhost:8070/",
      //   newPayment,
      //   config
      // );
      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/`);
        } else {
          navigate(`/`);
        }
      });
    } catch (error) {
      if (error.response.status === 409) {
        alert(error.response.data.message);
      } else {
        alert("Payment Unsuccessfull");
      }
    }
  }

  return (
    <div>
      <div className="modalBackground">
        <div className="modalContainer1">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOpenCardModal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <h1>Card Payment</h1>
          </div>
          <div className="subtitle">
            <h5>Fill Below Details</h5>
          </div>

          <form onSubmit={register}>
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-md-6 mb-5 mt-5">
                    <div className="form-group">
                      <OutlinedInput
                        type="text"
                        id="creditCardNumber"
                        placeholder="Credit Card Number"
                        required
                        fullWidth
                        onChange={(event) => {
                          setCreditCardNumber(event.target.value);
                        }}
                        inputProps={{
                          style: { padding: 12 },
                          pattern:
                            "(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}",
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-5 mt-5">
                    <div className="form-group">
                      <OutlinedInput
                        type="text"
                        id="cvv"
                        placeholder="CVV"
                        required
                        fullWidth
                        inputProps={{
                          style: { padding: 12 },
                          pattern: "[0-9]{3,4}",
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-5 mt-3">
                    <div className="form-group">
                      <OutlinedInput
                        type="text"
                        id="Expire Date"
                        placeholder="Expiry Date"
                        required
                        fullWidth
                        inputProps={{ style: { padding: 12 } }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-5 mt-3">
                    <div className="form-group">
                      <OutlinedInput
                        type="text"
                        id="amount"
                        placeholder="Total Amount"
                        required
                        fullWidth
                        value="500"
                        readOnly
                        inputProps={{ style: { padding: 12 } }}
                        startAdornment={
                          <InputAdornment position="start">LKR</InputAdornment>
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-12 mt-3">
                    <div className="form-group">
                      <input
                        className="form-submit-btn"
                        type="submit"
                        value="Pay"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CardPay;
