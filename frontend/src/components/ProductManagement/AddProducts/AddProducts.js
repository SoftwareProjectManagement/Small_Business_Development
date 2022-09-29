import { useState } from "react";
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import axios from "axios";
import "./AddProducts.css";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';

function AddProducts() {
  const [categoryname, setCategoryName] = useState("");
  const [productname, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [fileInputState, setFileInputState] = useState("");
  const [availableDay,setDay] = useState([]);

  //handling the image uploading
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(event.target.value);
  };

  const dates =[
    'Footware','Ceramics','Apperal','Leather','Foods'
]

const handleChange = (event) => {
  setDay(event.target.value);
};

  //display a preview of uploaded image
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  async function add(event) {
    event.preventDefault();
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };

    let imgUrl;

    if (previewSource) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "product_images");

      try {
        await axios
          .post(
            "https://api.cloudinary.com/v1_1/movie-reservation/image/upload",
            formData
          )
          .then((res) => {
            imgUrl = res.data.secure_url;
          });
      } catch (error) {
        alert(error);
      }
    }

    const newCategory = { productname,availableDay,price,description, imgUrl };
    console.log(newCategory);

    try {
      await axios.post(
        "http://localhost:8070/product/add",
        newCategory,
        config
      );
      alert("Product Added Successfully");
      event.target.reset();
    } catch (error) {
      alert("Product can't be Added");
    }
  }


  return (
    <div className="container" align="center">
      <form onSubmit={add} className="addProduct">
        <div className="row">
         

          <div className="col-8">
            <div className="row">
              <div className="col-md-8 mb-4">
                <div className="form-name">
                  <OutlinedInput
                    type="text"
                    id="name"
                    placeholder="Product Name"
                    required
                    fullWidth
                    onChange={(e) => setProductName(e.target.value)}
                    inputProps={{ style: { padding: 12 } }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-8">
            <div className="row">
              <div className="col-md-8 mb-4">
                <div className="form-name">
                  <OutlinedInput
                    type="text"
                    id="name"
                    placeholder="Description"
                    required
                    fullWidth
                    onChange={(e) => setDescription(e.target.value)}
                    inputProps={{ style: { padding: 12 } }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-8">
            <div className="row">
              <div className="col-md-8 mb-4">
                <div className="form-name">
                  <OutlinedInput
                    type="text"
                    id="name"
                    placeholder="Price"
                    required
                    fullWidth
                    onChange={(e) => setPrice(e.target.value)}
                    inputProps={{ style: { padding: 12 } }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-8">
            <div className="row">
              <div className="col-md-8 mb-4">
                <div className="form-name">
                        <InputLabel id="demo-mutiple-chip-label">Available Category</InputLabel>
                            <Select
                                id="demo-mutiple-chip"
                                multiple fullWidth
                                value={availableDay}
                                onChange={handleChange}
                                input={<Input id="select-multiple-chip"/>}
                                renderValue={(selected) => (
                                    <div >
                                        {selected.map((value) => (
                                            <Chip key={value} label={value}  />
                                        ))}
                                    </div>
                                 )}
                            >
                            {dates.map((date) => (
                                <MenuItem key={date} value={date} >
                                    {date}
                                </MenuItem>
                            ))}
                            </Select>
                            </div>
              </div>
            </div>
          </div>
                  


          <div className="col-4 d-flex justify-content-center">
            <div>
              {previewSource ? (
                <img
                  src={previewSource}
                  alt="preview"
                  className="previewImgProduct"
                />
              ) : (
                <img
                  src="/images/product.png"
                  className="previewImgProduct"
                  alt="product pic"
                />
              )}
              <div className="form-group">
                <label htmlFor="profilepic">
                  <input
                    style={{ display: "none" }}
                    id="profilepic"
                    name="profilepic"
                    type="file"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                  />

                  <Button color="primary" variant="contained" component="span">
                    <AddAPhotoIcon /> &nbsp; Upload Image
                  </Button>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <input
                className="form-submit-btn"
                type="submit"
                value="Add product"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProducts;
