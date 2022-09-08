import React, { useEffect, useState } from 'react'
import './ViewLoans.css'
import axios from 'axios'

function ViewLoans() {
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
                            // onChange={handleSearchAll}
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
                        {/* {topics.map((Topic, key) => ( */}
                            <div>
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
                                                <td className="text-l tb-border" style={{ width: 400, padding: '5px 15px'}}>dsaffads</td>
                                                <td className="text-l tb-border" style={{ width: 260, padding: '5px 15px' }}>asdf</td>
                                                <td className="text-l tb-border" style={{ width: 400, padding: '5px 15px' }}>asdf</td>
                                                <td className="text-l tb-border"  style={{ width: 260, padding: '5px 15px' }}>asdf</td>
                                                <td className="text-l tb-border"  style={{ width: 260, padding: '5px 15px' }}>asdf</td>
                                                {/* <div>
                                                    {isStaff === true ?
                                                        <div style={{width:180}}>
                                                            <button
                                                                className="btn btn-success"
                                                                // disabled={
                                                                //     Topic.tstatus === "Accepted" 
                                                                // }
                                                                // onClick={() => setData("Accepted", Topic._id)}
                                                            >
                                                                &nbsp;Approve
                                                            </button>

                                                            &nbsp;&nbsp;&nbsp;
                                                            <button
                                                                class="btn btn-info"
                                                                // disabled={
                                                                //     Topic.tstatus === "Rejected" 
                                                                // }
                                                                // onClick={() => setEvaluate("Rejected", Topic._id)}
                                                            >
                                                                &nbsp;Reject
                                                            </button>
                                                        </div>
                                                        :

                                                        <div>
                                                            
                                                            <button
                                                                // disabled={
                                                                //     Topic.tstatus === "Submitted for grading" ||
                                                                //     Topic.tstatus === "Rejected"
                                                                // }
                                                                className="btn btn-warning ms-3"
                                                                // onClick={() => add()}
                                                            >
                                                                &nbsp;Document Upload
                                                            </button>
                                                        </div>



                                                    }</div> */}

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        {/* ))} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewLoans