import React, { Fragment, useEffect, useState } from "react";
// import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createEVENT } from "../../actions/eventAction";
import { Button } from "@material-ui/core";
import MetaData from "../admin/MetaData";
import DescriptionIcon from "@mui/icons-material/Description";
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import { NEW_EVENT_RESET } from "../../constants/eventConstants";
import { useNavigate } from "react-router-dom";
import "./style.css";

const NewEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newEvent);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/home");
      dispatch({ type: NEW_EVENT_RESET });
    }
  }, [dispatch, error, navigate, success]);

  const createEventSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("contact", contact);
    myForm.set("date", date);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createEVENT(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData name="Create Event" />
      <div className="Event">
        <div className="newEventContainer">
          <form
            className="createEventForm"
            encType="multipart/form-data"
            onSubmit={createEventSubmitHandler}
          >
            <h1>Create Event</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Event name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Event Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="50"
                rows="5"
              ></textarea>
            </div>

            <div>
              <DescriptionIcon />

              <input
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              ></input>
            </div>

            <div>
              <DescriptionIcon />

              <input
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              ></input>
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

                  {/* Preview All Images */}
            <div id="createProductFormImage">      
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Event Preview" />
              ))}
            </div>

            <Button
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewEvent;