import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./ChoosePaymentModal.css";

function ChoosePaymentModal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Payment Method</h1>
        </div>
        <div className="subtitle">
          <h5>Select Your Payment Method</h5>
        </div>
        <div className="body">
            <div className="row">
                <div className="column">
                    <div className="card">
                        <img src="/images/visa.png"></img>
                        <p>VISA</p>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <img src="/images/mobilePay.png"></img>
                        <p>Mobile Pay</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ChoosePaymentModal;
