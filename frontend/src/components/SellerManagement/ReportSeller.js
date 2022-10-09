import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router';
import './ReportSeller.css'
import axios from 'axios'


function ReportSeller() {
    const [sellers, setSellers] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState("");

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

    function print(){
        window.print();
    }



    return (
        <div className="container">
<button style={{width:100,height:100}} onClick={() => print()}>Print</button>
            <br /><br /><br />
            <div className="product"  >
                {sellers.map((Seller, key) => (
                    <div key={key}>
                        <div className="p-3" align="center" style={{ overflowX: 'auto', width: 1500 }}>
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
    )
}

export default ReportSeller