import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Workshop.css";
import axios from "axios";
import { orange, red, blue, green } from "@material-ui/core/colors";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import WorkshopModal from "./WorkshopAddModal";

function ViewProdcuts() {
  const [openWorkshopModal, setOpenWorkshopModal] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [workshops, setWorkshops] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    if (localStorage.getItem("adminAuthToken")) {
      setIsAdmin(true);
    }

    async function getAllWorkshops() {
      axios
        .get(`http://localhost:8070/workshop/`)
        .then((res) => {
          setWorkshops(res.data);
        })
        .catch((error) => {
          alert("Failed to fetch Category");
        });
    }
    getAllWorkshops();
  }, [location, isAdmin]);

  return (
    <div className="workshopMainContainer">
      <div className="workshopHeadercontainer">
        <h5>Home {">"} Workshops</h5>
        <button>Back</button>
      </div>
      <div className="workshopContainer">
        <h1>
          Workshops
          <hr />
        </h1>
        <div className="workshopGrid">
          {isAdmin && (
            <Button
              className="mx-3 workshopAddBtn"
              style={{ backgroundColor: orange[800], color: "white" }}
              onClick={() => setOpenWorkshopModal(true)}
            >
              Add Workshop <AddIcon />
            </Button>
          )}
          {workshops.map((Workshops, key) => (
            <div key={key}>
              <div className="workshopCard">
                <div className="imgBx">
                  <video className="workshopVideo" autoPlay muted loop>
                    <source src={`${Workshops.videoUrl}`} />
                  </video>
                </div>
                <div className="p-3" align="center">
                  <h5>{Workshops.title}</h5>
                  <p>{Workshops.description}</p>

                  <div align="center">
                    <span>
                    <a href={`${Workshops.videoUrl}`} download="workshop_video">
                      <button
                        className="workshopBtn"
                      >
                        Download
                      </button></a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {openWorkshopModal && (
        <WorkshopModal setOpenWorkshopModal={setOpenWorkshopModal} />
      )}
    </div>
  );
}

export default ViewProdcuts;
