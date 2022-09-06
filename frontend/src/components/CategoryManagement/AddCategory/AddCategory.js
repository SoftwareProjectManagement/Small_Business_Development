import { useState } from 'react';
import axios from 'axios';
import './AddCategory.css'
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { TextField } from '@material-ui/core';


function AddCategory() {
   
    const[name,setName]=useState(""); 
    const[description,setDescription]=useState("");

    const [previewSource, setPreviewSource] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [fileInputState, setFileInputState] = useState('');

    //handling the image uploading
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(event.target.value);
    };

    //display a preview of uploaded image
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    

    async function add(event){
        event.preventDefault();
        const config = {
            headers: {
                "content-Type": "application/json"
            }
        };
        
        let imgUrl
        

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile) 
            formData.append("upload_preset", "product_images")

           
            try {
                await axios.post("https://api.cloudinary.com/v1_1/movie-reservation/image/upload%22", formData).then((res) =>{
                    imgUrl = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

        const newProduct = {name,description,type,price,imgUrl}
        
        try {
            await axios.post("http://localhost:8070/product/add", newProduct , config)
            alert("Product Added Successfully")  
            event.target.reset(); 
        }catch (error) {         
            alert("Product can't be Added");
        }
    }
    
    return (
    <div className="container" align="center" >
            <h1>hello</h1>             
    </div>

    )
}

export default AddCategory
