import { useReactToPrint } from "react-to-print";
import {useRef} from 'react'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import './ViewLoans.css'
import axios from 'axios'
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';
import { green} from '@material-ui/core/colors';


function ReportPage() {
    const location = useLocation();

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState("");
    const [loans, setLoans] = useState([]);

    useEffect(() => {

        async function getAllRequests() {
            axios.get(`http://localhost:8070/loan`).then((res) => {
                setLoans(res.data)
            }).catch((error) => {
                alert("Failed to fetch document")
            })
        }

        getAllRequests();
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
                                            <h3>Ceylon Capital Crop</h3>
                                            <h6 >Digitally Generated Loan Request 1 Report</h6>
                                        </div>
                                        <div className="col-xl-2" align='right'>
                                            <p>{date}/{month}/{year}</p>
                                        </div>
                                    </div>
            <div className="product"  >
                
                    <div>
                        <div className="p-3" align="center" style={{ overflowX: 'auto' }}>
                            <table style={{ border: "4px solid black"}}>
                                <thead align="center" style={{height:70,background:"black",color:"white"}}>
                                    <tr>
                                        <td>Name</td>
                                        <td>Seller ID</td>
                                        <td>Email</td>
                                        <td>Mobile</td>
                                        <td>Status</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loans.map((Loan, key) => (
                                    <tr key={key}>
                                        <td style={{ width: 400, padding: '5px 15px'}}>{Loan.name}</td>
                                        <td style={{ width: 400, padding: '5px 15px'}}>{Loan.sellerID}</td>
                                        <td style={{ width: 400, padding: '5px 15px'}}>{Loan.email}</td>
                                        <td style={{ width: 400, padding: '5px 15px'}}>{Loan.mobile}</td>
                                        <td style={{ width: 400, padding: '5px 15px'}}>{Loan.tstatus}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>   
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

export default ReportPage