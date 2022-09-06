import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChoosePaymentModal from "../PaymentManagement/ChoosePaymentModal"

function Cart() {
    const [openModal, setOpenModal] = useState(false);
    return(
        <div>
            <Button 
                variant="primary"
                onClick={() => {
                    setOpenModal(true);
                }}
                >Primary
            </Button>
            {openModal && <ChoosePaymentModal setOpenModal={setOpenModal} />}
        </div>
    );
}

export default Cart;