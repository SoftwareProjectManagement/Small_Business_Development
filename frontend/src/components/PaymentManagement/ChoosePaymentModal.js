import React, {useState} from "react";
import "./ChoosePaymentModal.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import MobilePayModal from "../PaymentManagement/MobilePayModal"
import CardPayModal from "../PaymentManagement/CardPayModal"

function ChoosePaymentModal({ setOpenModal }) {

  const [openMobileModal, setOpenMobileModal] = useState(false);
  const [openCardModal, setOpenCardModal] = useState(false);

  return (
    <div>
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
                    <div className="card"
                    onClick={() => {
                      setOpenCardModal(true);
                    }}>
                        <img src="/images/card.png"></img>
                        <p>Card Pay</p>
                    </div>
                </div>

                <div className="column">
                    <div className="card"
                    onClick={() => {
                      setOpenMobileModal(true);
                    }}>
                        <img src="/images/mobilePay.png"></img>
                        <p>Mobile Pay</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    {openMobileModal && <MobilePayModal setOpenMobileModal={setOpenMobileModal} />}
    {openCardModal && <CardPayModal setOpenCardModal={setOpenCardModal} />}
    </div>
  );
}

export default ChoosePaymentModal;
