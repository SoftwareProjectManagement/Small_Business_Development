import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./UpdateProduct.css";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { TextField } from "@material-ui/core";

function UpdateProduct(props) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState();
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [previewSource, setPreviewSource] = useState();
  const productId = useParams();

  useEffect(() => {
    async function fetchproduct() {
      await axios
        .get(`http://localhost:8070/product/item/${productId.id}`)
        .then((res) => {
          console.log(res);
          setId(res.data.product._id);
          setName(res.data.product.name);
          setCategory(res.data.product.category);
          setPrice(res.data.product.price);
          setDescription(res.data.product.description);
          setImgUrl(res.data.product.imgUrl);
        })
        .catch((error) => {
          alert("Failed to fetch item data");
        });
    }
    fetchproduct();
  }, [props]);

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

  console.log(id);
  //update the Product
  async function Update(event) {
    event.preventDefault();

    let imgUrl;

    if (previewSource) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "product_pictures");

      try {
        await axios
          .post(
            "https://api.cloudinary.com/v1_1/aspirushealthcare/image/upload",
            formData
          )
          .then((res) => {
            imgUrl = res.data.secure_url;
          });
      } catch (error) {
        alert(error);
      }
    }

    const updatedproduct = { name, category, price, description, imgUrl };

    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        `http://localhost:8070/product/update/${productId.id}`,
        updatedproduct,
        config
      );
      alert("Product Updated Successfully");
      navigate(`/product/item/${productId.id}`);
    } catch (error) {
      alert("Product Updating Failed");
    }
  }

  return (
    <div className="container" align="center">
      <div className="row">
        <div className="col-12">
          <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
            <h2>Update Product</h2>
          </div>
        </div>
      </div>
      <div className="update_product">
        <form onSubmit={Update} className="updateProduct">
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
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                      inputProps={{ style: { padding: 12 } }}
                    />
                  </div>
                </div>
                <div>
                  <div className="col-md-8 mb-4">
                    <div className="form-price">
                      <OutlinedInput
                        type="price"
                        id="price"
                        placeholder="Product Price"
                        required
                        fullWidth
                        value={price}
                        onChange={(event) => {
                          setPrice(event.target.value);
                        }}
                        inputProps={{ style: { padding: 12 } }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <br></br>
                  <div className="col-md-10 mb-4">
                    <div className="form-description">
                      <TextField
                        multiline
                        rows={5}
                        id="description"
                        placeholder="Product Description"
                        required
                        fullWidth
                        variant="outlined"
                        value={description}
                        onChange={(event) => {
                          setDescription(event.target.value);
                        }}
                        inputProps={{ style: { padding: 12 } }}
                      />
                    </div>
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
                    src={`${imgUrl}`}
                    className="updatePreviewImgProduct"
                    alt="product pic"
                  />
                )}
                <div className="form-group">
                  <label htmlFor="productImg">
                    <input
                      style={{ display: "none" }}
                      id="productImg"
                      name="productImg"
                      type="file"
                      onChange={handleFileInputChange}
                      value={fileInputState}
                    />
                    <Button
                      color="primary"
                      variant="contained"
                      component="span"
                    >
                      <AddAPhotoIcon /> &nbsp; Update Image
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
                  value="Update Product"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default UpdateProduct;
