import React, { useState } from "react";
import "./Post.css";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import * as z from "zod";
import { PostType } from "../Posts/Posts";
import { useDispatch } from "react-redux";
import { $ZodIssue } from "zod/v4/core";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/config/firebaseConfig";
import { editPost } from "@/app/store/postsSlice";

const PostSchema = z.object({
  id: z.string(),
  content: z
    .string("Is not a text!")
    .min(1, "The text should be longer than 1 character.")
    .max(256, "The text should be shorter than 256 characters."),
});

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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<$ZodIssue[] | null>();
  const [editedText, setEditedText] = useState<string>(content);

  const dispatch = useDispatch();

  const updatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editedText === content) {
      setIsEditing(false);
      return;
    }

    let data = {
      id: id,
      content: editedText,
    };

    const result = z.safeParse(PostSchema, data);
    if (result.success) {
      data = result.data;
      setError(null);
    } else {
      setError(result.error.issues);
      return;
    }

    await setDoc(doc(db, "posts", id), data);
    dispatch(editPost(data));
    setEditedText("");
    setIsEditing(false);
  };

  return (
    <div className="post" onClick={() => openModal({ id, content })}>
      <div className="post__header">
        <h3 className="post__header__heading">#{id}</h3>
      </div>
      <div className="post__body">
        {isEditing ? (
          <form
            className="post__body__form"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => updatePost(e)}
          >
            <textarea
              placeholder="Modify an existing post..."
              className="post__body__form__input"
              name="post__body__form__input"
              id="post__body__form__input"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <p className="form--error">{error && error[0].message}</p>
            <button className="post__body__form__button">Edit</button>
          </form>
        ) : (
          <p className="post__body__content">{content}</p>
        )}
      </div>
      <div className="post__footer">
        <button
          className="post--icon delete"
          onClick={(e) => {
            e.stopPropagation();
            deletePost(id);
          }}
        >
          <FaRegTrashAlt size={16} />
        </button>
        <button
          className="post--icon"
          onClick={(e) => {
            e.stopPropagation();
            setEditedText(content);
            setIsEditing((prev) => !prev);
          }}
        >
          <FaPencilAlt size={16} />
        </button>
      </div>
    </div>
  );
};

export default Post;
