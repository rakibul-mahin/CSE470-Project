import React, { useState } from "react";
import "./contentPost.css";
import PhotoIcon from "@mui/icons-material/Photo";
import { useSelector } from "react-redux";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const ContentPost = () => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  const { username, userimage } = user.user;
  const accessToken = user.accessToken;
  const [file, setFile] = useState("");
  const [desc, setDesc] = useState("");
  const sharePostHandler = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const StorageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(StorageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          fetch(`http://localhost:5000/api/create/post`, {
            method: "POST",
            headers: { "Content-Type": "application/JSON", token: accessToken },
            body: JSON.stringify({ desc: desc, image: downloadURL }),
          });
        });
      }
    );
  };
  return (
    <div>
      <div className='content-upload-container'>
        <div className='message'>
          <img src={`${userimage}`} alt='profileimg' className='profile-img' />
          <input
            type='text'
            placeholder={`Dive in with your thoughts ${username}...`}
            className='content-text'
            name='desc'
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className='icons-p-container'>
          <div className='bottom'>
            <label htmlFor='file'>
              <PhotoIcon className='icons-p' />
              <input
                type='file'
                name='file'
                id='file'
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <button className='share-btn' onClick={sharePostHandler}>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPost;
