import React, { useState } from "react";
import "./WorkshopAddModal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Button from "@material-ui/core/Button";

function WorkshopAdd({ setOpenWorkshopModal }) {
  const [previewSource, setPreviewSource] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [fileInputState, setFileInputState] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

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

  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };

  async function register(event) {
    event.preventDefault();

    const config = {
        headers: {
          "content-Type": "application/json",
        },
      };

    let videoUrl;

    if (previewSource) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "submissionVideo");
  
        try {
          await axios
            .post(
              "https://api.cloudinary.com/v1_1/movie-reservation/video/upload",
              formData
            )
            .then((res) => {
                videoUrl = res.data.secure_url;
            });
        } catch (error) {
          alert(error);
        }
      }

    const newWorkshop = { title, description, videoUrl };

    try {
      await axios.post(
        "http://localhost:8070/workshop/add",
        newWorkshop,
        config
      );

      Swal.fire({
        icon: "success",
        title: "Workshop Added Successfully!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/`);
        } else {
          navigate(`/`);
        }
      });
    } catch (error) {
      if (error.response.status === 409) {
        alert(error.response.data.message);
      } else {
        alert("Workshop Not Added");
      }
    }
  }

  return (
    <div>
      <div className="modalBackground2">
        <div className="modalContainer2">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOpenWorkshopModal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <h1>Add Workshop</h1>
          </div>
          <div className="subtitle">
            <h5>Fill Below Details</h5>
          </div>

          <form onSubmit={register}>
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-md-12 mb-5">
                    <div className="form-group">
                      <OutlinedInput
                        type="text"
                        id="title"
                        placeholder="Enter Workshop Title"
                        required
                        fullWidth
                        onChange={(event) => {
                          setTitle(event.target.value);
                        }}
                        inputProps={{ style: { padding: 12 } }}
                      />
                    </div>
                  </div>

                  <div className="col-md-12 mb-5">
                    <div className="form-group">
                      <OutlinedInput
                        type="text"
                        id="description"
                        placeholder="Enter Workshop Description"
                        required
                        fullWidth
                        onChange={(event) => {
                          setDescription(event.target.value);
                        }}
                        inputProps={{ style: { padding: 12 } }}
                      />
                    </div>
                  </div>

                  <div className="col-md- mb-5">
                    <div className="form-group" align="center">
                      <div>
                        {previewSource ? (
                          <img
                            src={previewSource}
                            alt="video uploaded"
                            className="previewImgProduct"
                          />
                        ) : (
                          <img
                            src="/images/product.png"
                            className="previewImgProduct"
                            alt="upload video"
                          />
                        )}
                        <div className="form-group">
                          <label htmlFor="workshopvideo">
                            <input
                              style={{ display: "none" }}
                              id="workshopvideo"
                              name="workshopvideo"
                              type="file"
                              required
                              onChange={handleFileInputChange}
                              value={fileInputState}
                            />

                            <Button
                              color="primary"
                              variant="contained"
                              component="span"
                            >
                              <AddAPhotoIcon /> &nbsp; Upload Video
                            </Button>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        className="form-submit-btn"
                        type="submit"
                        value="Submit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WorkshopAdd;
