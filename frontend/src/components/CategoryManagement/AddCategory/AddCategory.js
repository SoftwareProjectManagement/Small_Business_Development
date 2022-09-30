import { useState } from "react";
import { useNavigate,useLocation  } from 'react-router-dom'
import axios from "axios";
import "./AddCategory.css";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Swal from "sweetalert2";

function AddCategory() {

  const navigate = useNavigate();
  const [categoryname, setCategoryName] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [fileInputState, setFileInputState] = useState("");

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

    const newCategory = { categoryname, imgUrl };

    try {
      await axios.post(
        "http://localhost:8070/category/add",
        newCategory,
        config
      );
      Swal.fire({
        icon: "success",
        title: "Category Added Successfully!",
      });
      event.target.reset();
      navigate(`/category/view`);
    } catch (error) {
      alert("Category can't be Added");
      navigate(`/category/view`);
    }
  }

  return (
    <div className="container" align="center"><br/><br/><br/><br/>
      <form onSubmit={add} className="addProduct">
        <h1 className="headText">Add category</h1>
        <div className="row">
          <div className="">
            <div className="row">
              <div className="col-md-12 mb-4">
                <div className="form-name">
                  <OutlinedInput
                    type="text"
                    id="name"
                    placeholder="Category Name"
                    required
                    fullWidth
                    onChange={(e) => setCategoryName(e.target.value)}
                    inputProps={{ style: { padding: 12 } }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-8">
            <div className="row">
              <div className="col-md-8 mb-4">
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
                  alt="Image"
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
                    required
                  />

                  <Button className="image_upload_button" variant="contained" component="span">
                    <AddAPhotoIcon /> &nbsp; Upload Image
                  </Button>
                </label>
              </div>
            </div>
          </div>

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
                value="Add Category"
              />
            </div>
          </div>
        </div>
      </form><br/><br/><br/><br/>
    </div>
  );
}

export default AddCategory;
