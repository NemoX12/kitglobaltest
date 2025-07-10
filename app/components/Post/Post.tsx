import React from "react";
import "./Post.css";
import Image from "next/image";

const Post = ({
  id,
  content,
  deletePost,
}: {
  id: string;
  content: string;
  deletePost: any;
}) => {
  return (
    <div className="post">
      <div className="post__header">
        <h3 className="post__header__heading">#{id}</h3>
      </div>
      <div className="post__body">
        <p className="post__body__content">{content}</p>
      </div>
      <div className="post__footer">
        <button
          className="post__footer__button post--icon"
          onClick={() => deletePost(id)}
        ></button>
      </div>
    </div>
  );
};

export default Post;
