import { useState } from 'react';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import Swal from 'sweetalert2';
import "./Home.css"
import { Input } from '@material-ui/core';
import Search from '@mui/icons-material/Search';

function Home() {

return(

    <div>
        <div className='home'>
        <img src="/images/home.jpeg" className='background'/>
        <div className='head' style={{width:600,height:500,position:'absolute',top:200,right:120,color:"white"}}>
        <h1>Welcome to Ceylon Capital Crop</h1><br/><br/>
        <p style={{fontSize:19,fontWeight:500}}>Ceylon Capital Crop is a system of inter-related practical management-skills training package for small-scale enterprise owners and managers. It encompasses a range of cost-effective and practical training, monitoring and evaluation methodologies and instruments which were designed to meet the management training needs of potential and existing small business persons.</p>
<br/><br/>
<input style={{width:300,padding:8,marginLeft:45,borderRadius:5}}></input><Search/>
        </div>
       
        </div>
        
    </div>
);

}

export default Home;