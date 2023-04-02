import React, { useEffect, useState } from "react";
import "./mainPost.css";
import ContentPost from "../ContentPost/ContentPost";
import Post from "../Post/Post";
import axios from "axios";
import { useSelector } from "react-redux";

const MainPost = () => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let id = user.user._id;
  const accesstoken = user.accessToken;
  const [post, setPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/followers-post/${id}/?page=${currentPage}`,
          {
            headers: {
              token: accesstoken,
            },
          }
        );

        if (res.data.length === 0) {
          setHasMorePosts(false);
        } else {
          setPost((prevPosts) => [...prevPosts, ...res.data]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [currentPage, accesstoken]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className='main-post'>
      <ContentPost />
      {post.map((item) =>
        item.map((postDetails) => (
          <Post post={postDetails} key={postDetails._id} />
        ))
      )}
      {hasMorePosts && (
        <button className='load-more-btn' onClick={handleLoadMore}>
          Load More ...
        </button>
      )}
    </div>
  );
};

export default MainPost;
