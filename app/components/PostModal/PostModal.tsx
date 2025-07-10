import React, { useState, useEffect, useCallback } from "react";
import "./PostModal.css";
import { useDispatch, useSelector } from "react-redux";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { PostType } from "../Posts/Posts";
import { FaTimes } from "react-icons/fa";
import { closeModalAction } from "@/app/store/postModalSlice";
import * as z from "zod";
import { db } from "@/app/config/firebaseConfig";
import { $ZodIssue } from "zod/v4/core";
import { addComments, getAllComments } from "@/app/store/postsCommentsSlice";
import { RootState } from "@/app/store/postsStore";

const CommentSchema = z.object({
  id: z.string(),
  comment: z
    .string("This is not a string!")
    .min(1, "The text should be longer than 1 character.")
    .max(256, "The text should be shorter than 256 characters."),
});

type CommentType = {
  id: string;
  comment: string;
};

const PostModal = () => {
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<$ZodIssue[] | null>();

  const postsModal: PostType | null = useSelector(
    (state: RootState) => state.postModal.post
  );
  const postsComments: CommentType[] = useSelector(
    (state: RootState) => state.postComments.comments
  );
  const dispatch = useDispatch();

  const postComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (postsModal === null) {
      return;
    }

    let data = {
      id: postsModal.id,
      comment: comment,
    };

    const result = z.safeParse(CommentSchema, data);
    if (result.success) {
      data = result.data;
      setError(null);
    } else {
      setError(result.error.issues);
      return;
    }

    await addDoc(collection(db, "comments"), data);
    dispatch(addComments([data]));
    setComment("");
  };

  const getComments = useCallback(async () => {
    if (postsModal === null) {
      return;
    }

    const q = query(collection(db, "comments"), where("id", "==", postsModal.id));

    const querySnapshot = await getDocs(q);

    const allComments: CommentType[] = querySnapshot.docs.map((comment) => ({
      id: comment.data().id,
      comment: comment.data().comment,
    }));

    dispatch(getAllComments(allComments));
  }, [dispatch, postsModal]);

  const closeModal = () => {
    dispatch(closeModalAction());
  };

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <div className="postmodal">
      <div className="postmodal__post">
        <div className="postmodal__post__header">
          <p className="postmodal__post__header__heading">#{postsModal?.id}</p>
          <button className="modal--icon" onClick={closeModal}>
            <FaTimes size={16} />
          </button>
        </div>
        <div className="postmodal__post__body">
          <p className="postmodal__post__body__content">{postsModal?.content}</p>
        </div>
        <div className="postmodal__post__footer">
          <div className="postmodal__post__footer__comments">
            <h1 className="postmodal__post__footer__comments__heading">Comments:</h1>
            <div className="postmodal__post__footer__comments__list">
              {postsComments.map((comment, index) => (
                <p className="post--comment" key={index}>
                  {comment.comment}
                </p>
              ))}
            </div>
          </div>
          <div className="postmodal__post__footer__form">
            <form
              onSubmit={(e) => postComment(e)}
              className="postmodal__post__footer__form__elt"
            >
              <div className="postmodal__post__footer__form__elt__input">
                <input
                  type="text"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  placeholder="Write a new comment..."
                />

                <p className="form--error">{error && error[0].message}</p>
              </div>
              <button type="submit">Comment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
