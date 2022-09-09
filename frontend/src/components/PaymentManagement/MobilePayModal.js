import React, { useState } from "react";
import "./MobilePayModal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function MobilePay({ setOpenMobileModal }) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [pinNo, setPinNo] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  

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
        icon: 'success',
        title: 'Payment Successful!'
      }).then((result) => {
        if (result.isConfirmed) {
            navigate(`/`)
        }else{
            navigate(`/`)
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
                setOpenMobileModal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <h1>Mobile Payment</h1>
          </div>
          <div className="subtitle">
            <h5>Fill Below Details</h5>
          </div>

          <form onSubmit={register}>
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-md-12 mb-5 mt-4">
                    <div className="form-group">
                      <OutlinedInput
                        type="text"
                        id="mobileNumber"
                        placeholder="Mobile Number"
                        required
                        fullWidth
                        onChange={(event) => {
                          setMobileNumber(event.target.value);
                        }}
                        inputProps={{ style: { padding: 12 },pattern:"[0-9]{10}" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-12 mb-5">
                    <div className="form-group">
                      <OutlinedInput
                        type="password"
                        id="pinNo"
                        placeholder="Pin Number"
                        required
                        fullWidth
                        onChange={(event) => {
                          setPinNo(event.target.value);
                        }}
                        inputProps={{ style: { padding: 12 },pattern:"[0-9]{6}" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-12 mb-5">
                    <div className="form-group">
                      <OutlinedInput
                        type="date"
                        id="date"
                        placeholder="Date"
                        required
                        fullWidth
                        onChange={(event) => {
                          setDate(event.target.value);
                        }}
                        inputProps={{ style: { padding: 12 } }}
                      />
                    </div>
                  </div>

                    <div className="col-md-12">
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

export default MobilePay;
