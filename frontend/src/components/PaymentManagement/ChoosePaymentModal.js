import React from "react";
import "./ChoosePaymentModal.css";

function ChoosePaymentModal({ setOpenModal }) {

  function cardPayView() {
    alert('Card Pay');
    setOpenModal(false);
  }

  function mobilePayView() {
    alert('Mobile Pay');
    setOpenModal(false);
  }

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
                    <div className="card" onClick={cardPayView}>
                        <img src="/images/card.png"></img>
                        <p>Card Pay</p>
                    </div>
                </div>

                <div className="column">
                    <div className="card" onClick={mobilePayView}>
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
