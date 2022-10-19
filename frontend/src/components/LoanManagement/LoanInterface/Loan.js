import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';

import img1 from './loans1.jpg';
import img2 from './loans2.jpg';
import img3 from './loans3.jpg';
import './Loan.css';


function Loan() {

    const [isAdmin, setIsAdmin] = useState(false);
    const [loans, setLoans] = useState([])
    const location = useLocation()
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    const navigateToForm1 = () => {
        navigate('/loan/form1');
    };
  
    const navigateToView = () => {
      navigate('/loan/view_loan');
    };

    const navigateToView2 = () => {
      navigate('/loan/view_loan2');
    }

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }

        if (localStorage.getItem("adminAuthToken")) {
            setIsAdmin(true)
        }

        async function getAllRequests() {
            axios.get(`http://localhost:8070/loan`).then((res) => {
                setLoans(res.data)
            }).catch((error) => {
                alert("Failed to fetch document")
            })
        }

        getAllRequests();
    }, [location, isAdmin])

    return (
        <div className="row" style={{
            // background:'rgb(229 221 221)' 
            // background:'#ffffff' 
            }}>
            <div className="col-xl-12">
            <div className="pt-2 pb-3">
                    <div  id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="2000">
                            <img src={img1} className="d-block w-10" alt="img1"/>
                            <div className="corousal-shadow carousel-caption d-none d-md-block">
                                <h1 className="corousal-text">Expand Your Business</h1>
                                <h5 className="corousal-text">Do not worry about money, there are lots of people who want to help you!</h5>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img src={img2} className="d-block w-10" alt="img2"/>
                            <div className="corousal-shadow carousel-caption d-none d-md-block">
                                <h1 className="corousal-text">Request For A Loan</h1>
                                <h5 className="corousal-text">Give a brief description about the loan.</h5>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img src={img3} className="d-block w-10" alt="img3"/>
                            <div className="corousal-shadow carousel-caption d-none d-md-block">
                                <h1 className="corousal-text">Use Loan For Your Business</h1>
                                <h5 className="corousal-text">After accepting the loan, you can whatever you want.</h5>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"  data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" ></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    </div>

                <div className="row mt-3" style={{ textAlign: 'center' }}>
                    <p style={{ fontSize:'40px', fontWeight:'bold',fontFamily:'Quicksand', letterSpacing: '2.5px' }}>Loan Schema</p>
                    <div className="col-md-4">
                        <div className="ml-2 guidance-div">
                            <p className="guidance-p">
                            01. You have to fill the <br/>'Loan Request 1' form and get in touch with us  to check whether your request is accepted or rejected.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="ml-2 guidance-div">
                            <p className="guidance-p">
                                02. If 'Loan Request 1' is accepted, you have to submit 'Loan Request 2' with business registration document. Be sure to keep in touch!
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="ml-2 guidance-div">
                            <p className="guidance-p">
                            03. If 'Loan Request 2' is accepted, you will be notified by our team. Then you can contact us to retrieve your loan request!
                            </p>
                        </div>
                    </div>
                </div>
                {isAdmin === true?
                <div className="row mt-3" style={{ textAlign: 'center' }}>
                    <div className="col-md-6">
                        <div className="ml-2" style={{ width:'auto', padding: '25px', float:'center', background: 'rgb(28 25 25 / 93%)', borderRadius:'10px', }}>
                            <p style={{ color: '#ffffff', fontSize: '30px', lineHeight: '25px', lineHeight: '1' }}>
                               Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin Admin
                            </p>
                            <button className="btn btn-info" style={{ marginRight:'5px',fontSize:'18px' }} onClick={navigateToView}>Stage 1</button>
                            <button className="btn btn-success" style={{ marginRight:'5px',fontSize:'18px' }} onClick={navigateToView2}>Stage 2</button>
                        </div>
                    </div>
                </div>
                    :
                <div className="row mt-3" style={{ textAlign: 'center' }}>
                    <div className="col-md-6">
                        <div style={{ width:'auto', padding: '25px 0 30px 0', float:'center', background: 'rgb(28 25 25 / 93%)', borderRadius:'10px', }}>
                            <p style={{ color: '#ffffff', fontSize: '30px', lineHeight: '25px', lineHeight: '1.4' }}>
                                " Grow your business by requesting 
                                <br/>for a loan. When you providing your details, 
                                <br/>be sure to give description about request 
                                <br/>in acceptable manner. "
                            </p>
                        <button className="btn btn-primary mt-2" style={{ marginRight:'12px',fontSize:'25px' }} onClick={navigateToForm1}>Loan Request 1</button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="ml-1" style={{ width:'auto', padding: '25px', float:'center', background: 'rgb(28 25 25 / 93%)', borderRadius:'10px', }}>
                            <p style={{ color: '#ffffff', fontSize: '30px', lineHeight: '25px', lineHeight: '1.4' }}>
                                " Keep in touch with your loan request
                                <br/>until you retrieve the response 
                                <br/>from our team. Please be patient 
                                <br/>if your request status is still in 'pending'! "
                            </p>
                            <button className="btn btn-warning mt-2" style={{ fontSize:'25px' }} onClick={navigateToView}>Request 1 Status</button>
                            <button className="btn btn-warning mt-2" style={{ marginLeft:'12px',fontSize:'25px' }} onClick={navigateToView2}>Request 2 Status</button>
                        </div>
                    </div>
                </div>

                }
            </div>
            </div>
        </div>
    )
}

export default Loan