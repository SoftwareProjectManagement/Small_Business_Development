import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router';
import './ViewLoans.css'
import axios from 'axios'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Swal from 'sweetalert2';

function ViewLoans() {

    const [isAdmin, setIsAdmin] = useState(false);
    const [loans, setLoans] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState("");
    const navigateToForm2 = () => {
        navigate('/loan/form2');
    };

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
            loans.name.toLowerCase().includes(searchTerm)
        )
        setLoans(result)
    }

    function handleSearchAll(event) {
        const searchTerm = event.currentTarget.value
        axios.get(`http://localhost:8070/loan`).then((res) => {
            filterContent(res.data, searchTerm.toLowerCase())
        }).catch((error) => {
            alert("Failed to fetch documents with ".error)
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
                Swal.fire({
                    icon: 'success',
                    text: `Loan is ${tstatus}ed`,
                    showConfirmButton: false,
                  })
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
                Swal.fire({
                    icon: 'success',
                    text: `Loan is ${tstatus}ed`,
                    showConfirmButton: false,
                  })
                window.location.reload(false);
            })
            .catch((err) => {
                alert(`Something went to wrong !!!`);
            });
    };

    async function deleteRequest(id) {
        console.log(id);
        await axios.delete(`http://localhost:8070/loan/delete/${id}`, config).then(() => {
            Swal.fire({
                icon: 'success',
                text: 'Successfully Deleted!',
                showConfirmButton: false,
              })
            navigate('/loan/view_loan')
        }).catch((error) => {
            alert(`Cancellation Failed\n${error.message}`)
        })
    }

    const navigateToReport = () => {
        navigate('/loan/view_loan/report');
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
                        className="btn btn-warning ms-3"
                        onClick={navigateToReport}>
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
                            <SearchRoundedIcon />
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
                                                <th width="15%" className="table-head-title th-border">Name</th>
                                                <th width="15%" className="table-head-title th-border">Seller ID</th>
                                                <th width="15%" className="table-head-title th-border">Email</th>
                                                <th width="15%" className="table-head-title th-border">Mobile</th>
                                                <th width="15%" className="table-head-title th-border" style={{ textAlign:'center' }}>Status</th>
                                                {isAdmin === true ?
                                                        <th className="table-head-title th-border" style={{ textAlign:'center' }}>Action</th>
                                                        :
                                                        <th className="table-head-title th-border" style={{ textAlign:'center' }}>Availability</th>
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
                                                <td className="text-l tb-border" align="center"  style={{ width: 260, padding: '5px 15px',textAlign:'center' }}>
                                                {
                                                Loan.tstatus === "Rejected" ? <span className="bg-danger rounded text-white p-1">Rejected</span>:
                                                Loan.tstatus === "Accepted" ? 
                                                <div>
                                                    <span className="bg-success rounded text-white p-1">Accepted</span>
                                                </div>
                                                :
                                                <div>
                                                    <span className="bg-warning rounded text-black p-1" style={{ marginRight: '5px' }}>Pending</span>
                                                </div>
                                                }
                                                </td>
                                                {isAdmin === true ?
                                                <td className="text-l tb-border"  style={{ width: 250, textAlign:'center' }}>
                                                            <button
                                                                style={{ margin: '3px 5px 5px 5px' }}
                                                                className="btn btn-success"
                                                                disabled={
                                                                    Loan.tstatus === "Accepted" 
                                                                }
                                                                onClick={() => setData("Accepted", Loan._id)}
                                                            >
                                                                &nbsp;Approve
                                                            </button>
                                                            <button
                                                                style={{ margin: '3px 5px 5px 5px' }}
                                                                className="btn btn-danger"
                                                                disabled={
                                                                    Loan.tstatus === "Rejected" 
                                                                }
                                                                onClick={() => setEvaluate("Rejected", Loan._id)}
                                                            >
                                                                &nbsp;Reject
                                                            </button>
                                                            <button
                                                                style={{ margin: '3px 5px 5px 5px', padding: '2px 0px' }}
                                                                className="btn btn-danger"
                                                                onClick={() => deleteRequest(Loan._id)}
                                                            ><DeleteRoundedIcon/></button>
                                                </td>
                                                :
                                                <td className="text-l tb-border"  style={{ width: 300, textAlign:'center' }}>
                                                <button className="btn btn-primary p-1 m-1"
                                                    disabled={
                                                        Loan.tstatus === "Rejected" || Loan.tstatus === "Pending"
                                                    }
                                                    onClick={navigateToForm2}>Loan Request 2</button>    
                                                </td>                                     
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