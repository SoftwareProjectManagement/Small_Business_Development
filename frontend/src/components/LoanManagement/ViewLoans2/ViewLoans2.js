import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router';
import './ViewLoans2.css'
import axios from 'axios'

function ViewLoans2() {

    const [isAdmin, setIsAdmin] = useState(false);
    const [loans, setLoans] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState("");

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }

        if (localStorage.getItem("adminAuthToken")) {
            setIsAdmin(true)
        }

        async function getAllRequests() {
            axios.get(`http://localhost:8070/loan2`).then((res) => {
                setLoans(res.data)
            }).catch((error) => {
                alert("Failed to fetch document")
            })
        }

        getAllRequests();
    }, [location, isAdmin])

    function filterContent(data, searchTerm) {
        const result = data.filter((loans) =>
            loans.group.toLowerCase().includes(searchTerm)
        )
        setLoans(result)
    }

    function handleSearchAll(event) {
        const searchTerm = event.currentTarget.value
        axios.get(`http://localhost:8070/topic`).then((res) => {
            filterContent(res.data, searchTerm.toLowerCase())
        }).catch((error) => {
            alert("Failed to fetch documents")
        })
    }

    function add() {
        navigate(`/`)
    }

    const setData = async (loanStatus, id) => {

        const value = {
            loanStatus,
        };

        await axios
            .put(`http://localhost:8070/loan2/${id}`, value)
            .then(() => {
                alert(`Loan is ${loanStatus}ed`);
                window.location.reload(false);
            })
            .catch((err) => {
                alert(`Something went to wrong !!!`);
            });
    };

    const setEvaluate = async (loanStatus, id) => {

        const value = {
            loanStatus,
        };

        await axios
            .put(`http://localhost:8070/loan/${id}`, value)
            .then(() => {
                alert(`Loan is ${loanStatus}ed`);
                window.location.reload(false);
            })
            .catch((err) => {
                alert(`Something went to wrong !!!`);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12 heading">
                <h1>Seller's Loan Request List</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-2 search-box">
                    <div className="px-3 search" align="right" style={{ top: '10px', position: 'relative' }}>
                        <input style={{ color: "black", fontWeight: "500", borderRadius: "8px", border: "2px solid grey", padding: '6px 12px' }}
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search"
                            onChange={handleSearchAll}
                            required
                        /><div style={{ position: 'relative', right: '510px', top: '-35px' }}>
                            {/* <SearchIcon /> */}
                            </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="productGrid"  >
                            <div>
                                <div className="p-2">
                                    <table>
                                        <thead className="table-head">
                                            <tr>
                                                <th className="table-head-title th-border">Name</th>
                                                <th className="table-head-title th-border">NIC</th>
                                                <th className="table-head-title th-border">Mobile</th>
                                                <th className="table-head-title th-border">Email</th>
                                                <th className="table-head-title th-border" style={{ textAlign:'center' }}>Status</th>
                                                {isAdmin === true ?
                                                        <th className="table-head-title th-border">Action</th>
                                                        :
                                                        <th className="table-head-title th-border"></th>
                                                    }
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {loans.map((Loan, key) => (
                                            <tr key={key} className="table-body">
                                                <td className="text-l tb-border" style={{ width: 400, padding: '5px 15px'}}>{Loan.name}</td>
                                                <td className="text-l tb-border"  style={{ width: 260, padding: '5px 15px' }}>{Loan.nic}</td>
                                                <td className="text-l tb-border" style={{ width: 400, padding: '5px 15px' }}>{Loan.email}</td>
                                                <td className="text-l tb-border"  style={{ width: 260, padding: '5px 15px' }}>{Loan.mobile}</td>
                                                <td className="text-l tb-border"  style={{ width: 260, padding: '5px 15px', textAlign:'center' }}>{
                                                Loan.loanStatus === "Rejected" ? <span className="bg-danger rounded text-white p-1">Rejected</span>:
                                                Loan.loanStatus === "Accepted" ? <span className="bg-success rounded text-white p-1">Accepted</span>
                                                :
                                                <span className="bg-warning rounded text-black p-1">Pending</span>
                                                }</td>
                                                <td className="text-l tb-border"  style={{ width: 260, padding: '5px 15px' }}>
                                                {isAdmin === true ?
                                                        <div style={{width:180}}>
                                                            <button
                                                                className="btn btn-success"
                                                                disabled={
                                                                    Loan.loanStatus === "Accepted" 
                                                                }
                                                                onClick={() => setData("Accepted", Loan._id)}
                                                            >
                                                                &nbsp;Approve
                                                            </button>
                                                            &nbsp;&nbsp;&nbsp;
                                                            <button
                                                                class="btn btn-danger"
                                                                disabled={
                                                                    Loan.loanStatus === "Rejected" 
                                                                }
                                                                onClick={() => setEvaluate("Rejected", Loan._id)}
                                                            >
                                                                &nbsp;Reject
                                                            </button>
                                                        </div>
                                                        :
                                                        <div>
                                                            
                                                            <button
                                                                disabled={
                                                                    Loan.loanStatus === "Submitted for grading" ||
                                                                    Loan.loanStatus === "Accepted"
                                                                }
                                                                className="btn btn-warning ms-3"
                                                                onClick={() => add()}
                                                            >
                                                                &nbsp;Document Upload
                                                            </button>
                                                        </div>
                                                    }
                                                </td>
                                            </tr>
                                            ))} 
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewLoans2