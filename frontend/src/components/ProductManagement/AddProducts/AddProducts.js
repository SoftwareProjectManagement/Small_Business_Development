import { useState, useEffect } from "react";
import { useNavigate,useLocation  } from 'react-router-dom'
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import axios from "axios";
import "./AddProducts.css";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Swal from "sweetalert2";

function AddProducts() {
  const navigate = useNavigate();
  const [name, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [fileInputState, setFileInputState] = useState("");
  const [category, setCategory] = useState();
  const [categoryList, setCategoryList] = useState([]);

  //handling the image uploading
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(event.target.value);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
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

    const payload = {
      name,
      category,
      price,
      description,
      imgUrl,
    };

    try {
      const res = await axios.post(
        "http://localhost:8070/product/add",
        payload,
        config
      );
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Product Added Successfully!",
        });
        event.target.reset();
        navigate(`/category/view`);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Product Can Not be Added!",
      });
    }
  }

  async function getAllCategory() {
    await axios
      .get(`http://localhost:8070/category/`)
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((error) => {
        alert("Failed to fetch Category");
      });
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="container" align="center">
      <br />
      <br />
      <br />
      <form onSubmit={add} className="addProduct12">
        <h1 className="headText">Add Product</h1>
        <div className="row">
          <div className="">
            <div className="row">
              <div className="col-md-12 mb-4">
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

          <div className="">
            <div className="row">
              <div className="col-md-12 mb-4">
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

          <div className="">
            <div className="row">
              <div className="col-md-12 mb-4">
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

          <div className="">
            <div className="row">
              <div className="col-md-12 mb-4">
                <div className="form-name">
                  <InputLabel id="demo-mutiple-chip-label">
                    Available Category
                  </InputLabel>
                  <Select
                    id="demo-mutiple-chip"
                    fullWidth
                    value={category}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                  >
                    {categoryList.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.categoryname}
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
                  src="/images/imageIcon.png"
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

                  <Button
                    className="image_upload_button"
                    variant="contained"
                    component="span"
                  >
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
                className="form-submit-btn submit_button"
                type="submit"
                value="Add product"
              />
            </div>
          </div>
        </div>
      </form>
      <br />
      <br />
      <br />
    </div>
  );
}

export default AddProducts;
