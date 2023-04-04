import React, { useEffect, useState } from "react";
import "./contentPost.css";
import PhotoIcon from "@mui/icons-material/Photo";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";

const ContentPost = () => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  const { username, userimage } = user.user;
  const accessToken = user.accessToken;
  const [file, setFile] = useState("");
  const [desc, setDesc] = useState("");
  const [cUser, setCUser] = useState({});
  const [preview, setPreview] = useState("");
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get/user-details/${user.user._id}`
        );
        setCUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);
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
      async () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        try {
          // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //   fetch(`http://localhost:5000/api/create/post`, {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/JSON",
          //       token: accessToken,
          //     },
          //     body: JSON.stringify({ desc: desc, image: downloadURL }),
          //   });
          // });
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await axios.post(
            `http://localhost:5000/api/create/post`,
            { desc: desc, image: downloadURL },
            {
              headers: {
                token: accessToken,
              },
            }
          );
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      }
    );
  };
  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleClearImage = () => {
    setFile("");
    setPreview("");
  };
  return (
    <div>
      <div className='mt-4 flex flex-col gap-1 bg-slate-900 card p-3'>
        <div className='mt-4 flex flex-row gap-4 justify-center items-center'>
          <img
            src={`${cUser.userimage}`}
            alt='profileimg'
            className='w-14 rounded-full'
          />
          <input
            type='text'
            placeholder={`Dive into GameVerse ${username}!!!`}
            name='desc'
            onChange={(e) => setDesc(e.target.value)}
            className='input input-bordered input-success w-full max-w-xs'
          />
        </div>
        <div>
          <div className='mt-9 flex flex-row justify-around items-center gap-5'>
            <label htmlFor='file'>
              <PhotoIcon className='text-slate-50 hover:text-slate-400' />
              <input
                type='file'
                name='file'
                id='file'
                style={{ display: "none" }}
                onChange={handleFileInputChange}
              />
              {preview && (
                <div className='relative'>
                  <img src={preview} alt='previewimg' className='w-20' />
                  <ClearIcon
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      right: "0px",
                      top: "0px",
                    }}
                    onClick={handleClearImage}
                    className='text-slate-50 hover:text-slate-400'
                  />
                </div>
              )}
            </label>
            <button
              onClick={sharePostHandler}
              className='rounded-full p-2 w-24 my-4 bg-logo-text-green text-zinc-950 hover:bg-lime-300'
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPost;
