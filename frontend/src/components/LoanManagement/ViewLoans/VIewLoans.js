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

    const config = {
        headers: {
            "content-Type": "application/json"
        }
    };

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

    async function deleteRequest(id) {
        console.log(id);
        await axios.delete(`http://localhost:8070/loan/delete/${id}`, config).then(() => {
            alert("Successfully Deleted")
            navigate('/loan/view_loan')
        }).catch((error) => {
            alert(`Cancellation Failed\n${error.message}`)
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12 heading">
                <h1>Seller's Loan Request List</h1>
                </div>
            </div>
            <div className="row">
                {isAdmin === true ?
                <div>
                    <button
                        className="btn btn-warning ms-3">
                        &nbsp;Generate Report
                    </button>
                </div>
                :
                <div></div>}

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
                <div className="col-xl-12">
                                <div className="p-5">
                                    <table>
                                        <thead className="table-head">
                                            <tr>
                                                <th className="table-head-title th-border">Name</th>
                                                <th className="table-head-title th-border">Seller ID</th>
                                                <th className="table-head-title th-border">Email</th>
                                                <th className="table-head-title th-border">Mobile</th>
                                                <th className="table-head-title th-border" style={{ textAlign:'center' }}>Status</th>
                                                {isAdmin === true ?
                                                        <th className="table-head-title th-border" style={{ textAlign:'center' }}>Action</th>
                                                        :
                                                        <div></div>
                                                    }
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {loans.map((Loan, key) => (
                                            <tr key={key} className="table-body">
                                                <td className="text-l tb-border" style={{ width: 400, padding: '5px 15px'}}>{Loan.name}</td>
                                                <td className="text-l tb-border" style={{ width: 260, padding: '5px 15px' }}>{Loan.sellerID}</td>
                                                <td className="text-l tb-border" style={{ width: 400, padding: '5px 15px' }}>{Loan.email}</td>
                                                <td className="text-l tb-border"  style={{ width: 260, padding: '5px 15px' }}>{Loan.mobile}</td>
                                                <td className="text-l tb-border" align="center"  style={{ width: 260, padding: '5px 15px',textAlign:'center' }}>{
                                                Loan.tstatus === "Rejected" ? <span className="bg-danger rounded text-white p-1">Rejected</span>:
                                                Loan.tstatus === "Accepted" ? <span className="bg-success rounded text-white p-1">Accepted</span>
                                                :
                                                <div>
                                                <span className="bg-warning rounded text-black p-1" style={{ marginRight: '5px' }}>Pending</span>
                                                <button
                                                className="btn btn-danger"
                                                onClick={() => deleteRequest(Loan._id)}
                                            >Delete</button>
                                            </div>
                                                }
                                                </td>
                                                {isAdmin === true ?
                                                <td className="text-l tb-border"  style={{ width: 260, padding: '5px 15px', textAlign:'center' }}>
                                                
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
                                                                class="btn btn-danger"
                                                                disabled={
                                                                    Loan.tstatus === "Rejected" 
                                                                }
                                                                onClick={() => setEvaluate("Rejected", Loan._id)}
                                                            >
                                                                &nbsp;Reject
                                                            </button>
                                                        </div>
                                                </td>
                                                        :
                                                        <div>

                                                        </div>                                        
                                                }
                                            </tr>
                                            ))} 
                                        </tbody>
                                    </table>
                                </div>
                </div>
            </div>
        </div>
    )
}

export default ViewLoans