import React, { useState } from "react";
import "./updateCoverPic.css";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";

const UpdateCoverPic = () => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  const accessToken = user.accessToken;
  const [file, setFile] = useState("");
  const updatePicHandler = (e) => {
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
          fetch(`http://localhost:5000/api/update/cover/pic/${user.user._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/JSON",
              token: accessToken,
            },
            body: JSON.stringify({ coverimage: downloadURL }),
          });
          //   updateProPic(dispatch, downloadURL, user.user._id, accessToken);
        });
      }
    );
  };
  return (
    <div>
      <label htmlFor='file'>
        <input
          type='file'
          name='file'
          id='file'
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>
      <button className='share-btn' onClick={updatePicHandler}>
        Change
      </button>
    </div>
  );
};

export default UpdateCoverPic;
