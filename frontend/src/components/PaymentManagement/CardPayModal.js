import React, { useState, useEffect } from "react";
import "./CardPayModal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";

function CardPay({ setOpenCardModal }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user._id;
  let date = new Date().toLocaleDateString();
  const amount = JSON.parse(localStorage.getItem("total"));
  const [itemList, setItemList] = useState([]);
  const cartItem = JSON.parse(localStorage.getItem("selectedItem"));

  useEffect(() => {
    const List = [...itemList];
    cartItem.map((Cart) => getCartItems(Cart));

    async function getCartItems(Cart) {
      await axios
        .get(`http://localhost:8070/cart/view1/${Cart}`)
        .then((res) => {
          let itemid = res.data.result.itemid;
          let quantity = res.data.result.quantity;
          List.push({ itemid, quantity });
        })
        .catch((error) => {
          alert("Failed to fetch Items");
        });
    }
    setItemList(List);
  }, []);

  const config = {
    headers: {
      "content-Type": "application/json"
    },
  };

  async function register(event) {
    event.preventDefault();

    const newPayment = {
      userID,
      date,
      amount,
      itemList,
    };

    try {
      await axios.post("http://localhost:8070/payment/add", newPayment,  config)
      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
      }).then((result) => {
        if (result.isConfirmed) {
          cartItem.map((Cart) => deleteItem(Cart));
          localStorage.removeItem("selectedItem");
          navigate(`/`);
        } else {
          cartItem.map((Cart) => deleteItem(Cart));
          localStorage.removeItem("selectedItem");
          navigate(`/`);
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

  async function deleteItem(id){    
    await axios.delete(`http://localhost:8070/cart/delete/${id}`, config).then(() => {
    }).catch((error) => {
        alert(`Failed to delete the item\n${error.message}`)
    })
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
                        value={amount}
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
