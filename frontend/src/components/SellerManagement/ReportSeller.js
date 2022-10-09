import { useReactToPrint } from "react-to-print";
import {useRef} from 'react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router';
import './ReportSeller.css'
import axios from 'axios'
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';
import { green} from '@material-ui/core/colors';


function ReportSeller() {
    const [sellers, setSellers] = useState([])
    const navigate = useNavigate()
    const location = useLocation()

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    useEffect(() => {

        async function getAllSellers() {
            axios.get(`http://localhost:8070/request`).then((res) => {
                setSellers(res.data)
            }).catch((error) => {
                alert("Failed to fetch the details")
            })
        }

        getAllSellers();
    }, [location])

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
  


    return (
        <div className="container">
             <div ref={componentRef}>
            <br /><br /><br />
            <div className="row">
                                        <div className="col-xl-2" align='center'>
                                            <img src="/images/Logo.png" width="100px" alt="logo" />
                                        </div>
                                        <div className="col-xl-8" align='center'>
                                            <h3>DIHP Capital Crop</h3>
                                            <h6 >Digitally Generated Seller Details Report</h6>
                                        </div>
                                        <div className="col-xl-2" align='right'>
                                            <p>{date}/{month}/{year}</p>
                                        </div>
                                    </div>
            <div className="product"  >
                {sellers.map((Seller, key) => (
                    <div key={key}>
                        <div className="p-3" align="center" style={{ overflowX: 'auto' }}>
                            <table style={{ border: "4px solid black"}}>
                                <thead align="center" style={{height:70,background:"black",color:"white"}}>
                                    <tr>
                                        <td>Full Name</td>
                                        <td>Permenet Address</td>
                                        <td>NIC Number</td>
                                        <td>Mobile Number</td>
                                        <td>Email Address</td>
                                        <td>Business Registration Number</td>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ width: 560 }}>{Seller.name}</td>
                                        <td style={{ width: 800 }}>{Seller.address}</td>
                                        <td style={{ width: 400 }}>{Seller.nic}</td>
                                        <td style={{ width: 400 }}>{Seller.mobile}</td>
                                        <td style={{ width: 400 }}>{Seller.email}</td>
                                        <td style={{ width: 600 }}>{Seller.reg}</td>


                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
            </div>
            <center><div className="w-25 p-3" align='center'>
                        <Button
                        className="print__button"
                        variant="contained"
                        color="secondary"
                        endIcon={<GetAppIcon />}
                        style={{ backgroundColor: green[700], color: 'white'}}
                        disableElevation
                        onClick={handlePrint}
                        fullWidth
                    >
                        Download Details 
                    </Button>
                    </div></center>
        
        </div>
    )
}

export default ReportSeller