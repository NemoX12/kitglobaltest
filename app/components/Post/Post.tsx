import React from "react";
import "./Post.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { PostType } from "../Posts/Posts";
import { useDispatch } from "react-redux";

const Post = ({
  id,
  content,
  deletePost,
  openModal,
}: {
  id: string;
  content: string;
  deletePost: (id: string) => void;
  openModal: ({ id, content }: PostType) => void;
}) => {
  return (
    <div className="post" onClick={() => openModal({ id, content })}>
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
        >
          <FaRegTrashAlt size={16} />
        </button>
      </div>
    </div>
  );
};

export default Post;
