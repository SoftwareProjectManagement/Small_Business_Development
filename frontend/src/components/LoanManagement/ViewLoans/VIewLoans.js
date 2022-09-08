import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router';
import './ViewLoans.css'
import axios from 'axios'

function ViewLoans() {

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
            axios.get(`http://localhost:8070/loan`).then((res) => {
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

    const setData = async (tstatus, id) => {

        const value = {
            tstatus,
        };

        await axios
            .put(`http://localhost:8070/loan/${id}`, value)
            .then(() => {
                alert(`Loan is ${tstatus}ed`);
                window.location.reload(false);
            })
            .catch((err) => {
                alert(`Something went to wrong !!!`);
            });
    };

    const setEvaluate = async (tstatus, id) => {

        const value = {
            tstatus,
        };

        await axios
            .put(`http://localhost:8070/loan/${id}`, value)
            .then(() => {
                alert(`Loan is ${tstatus}ed`);
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
                <div className="col-xl-10">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    </div>
                </div>
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
                        {loans.map((Loan, key) => (
                            <div key={key}>
                                <div className="p-2">
                                    <table>
                                        <thead className="table-head">
                                            <tr>
                                                <th className="table-head-title th-border">Name</th>
                                                <th className="table-head-title th-border">Seller ID</th>
                                                <th className="table-head-title th-border">Email</th>
                                                <th className="table-head-title th-border">Mobile</th>
                                                <th className="table-head-title th-border">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="table-body">
                                                <td className="text-l tb-border" style={{ width: 400, padding: '5px 15px'}}>{Loan.name}</td>
                                                <td className="text-l tb-border" style={{ width: 260, padding: '5px 15px' }}>{Loan.sellerID}</td>
                                                <td className="text-l tb-border" style={{ width: 400, padding: '5px 15px' }}>{Loan.email}</td>
                                                <td className="text-l tb-border"  style={{ width: 260, padding: '5px 15px' }}>{Loan.mobile}</td>
                                                <td className="text-l tb-border"  style={{ width: 260, padding: '5px 15px' }}>
                                                {isAdmin === true ?
                                                        <div style={{width:180}}>
                                                            <button
                                                                className="btn btn-success"
                                                                disabled={
                                                                    Loan.tstatus === "Accepted" 
                                                                }
                                                                onClick={() => setData("Accepted", Loan._id)}
                                                            >
                                                                &nbsp;Approve
                                                            </button>
                                                            &nbsp;&nbsp;&nbsp;
                                                            <button
                                                                class="btn btn-info"
                                                                disabled={
                                                                    Loan.tstatus === "Rejected" 
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
                                                                    Loan.tstatus === "Submitted for grading" ||
                                                                    Loan.tstatus === "Rejected"
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
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))} 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewLoans