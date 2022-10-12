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
            background:'rgb(229 221 221)' 
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
                    <p style={{ fontSize:'35px', fontWeight:'bold',fontFamily:'Quicksand' }}>Loan Schema</p>
                    <p style={{ color: '#7c7c7c', fontSize: '30px', lineHeight: '28px' }}>Grow better in providing
                    <br/> consumer-assured nutritional values in a 
                    <br/>socially acceptable manner.</p>
                </div>
                <div className="row" align="center">
                {isAdmin === true?
                <div>
                    <button className="btn btn-info" style={{ marginRight:'5px',fontSize:'18px' }} onClick={navigateToView}>Stage 1</button>
                    <button className="btn btn-success" style={{ marginRight:'5px',fontSize:'18px' }} onClick={navigateToView2}>Stage 2</button>
                </div>
                    :
                <div>
                        <button className="btn btn-primary" style={{ marginRight:'5px',fontSize:'18px' }} onClick={navigateToForm1}>Request Loan</button>
                        <button className="btn btn-warning" style={{ marginLeft:'5px',fontSize:'18px' }} onClick={navigateToView}>View Requested Loans</button>
                </div>
                }
                </div>
            </div>
            </div>
        </div>
    )
}

export default Loan