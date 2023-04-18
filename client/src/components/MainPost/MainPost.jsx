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
          `http://localhost:5000/api/followers-post/${id}?page=${currentPage}`,
          {
            headers: {
              token: accesstoken,
            },
          }
        );

        if (res.data.length === 0) {
          setHasMorePosts(false);
        } else {
          if (currentPage === 1) {
            setPost(res.data);
          } else {
            setPost((prevPosts) => [...prevPosts, ...res.data]);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [currentPage, accesstoken]);

  console.log(post, 1000);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    console.log(currentPage);
  };

  return (
    <div className='flex flex-col gap-3'>
      <ContentPost />
      {post.map((item) =>
        item.map((postDetails) => <Post post={postDetails} />)
      )}
      {hasMorePosts && (
        <button
          className='rounded-full p-2 w-28 my-4 bg-logo-text-green text-zinc-950'
          onClick={handleLoadMore}
        >
          Load More ...
        </button>
      )}
    </div>
  );
};

export default MainPost;
