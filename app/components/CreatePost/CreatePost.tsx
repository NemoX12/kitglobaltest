"use client";

import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
import { db } from "@/app/config/firebaseConfig";
import "./CreatePost.css";
import { useDispatch } from "react-redux";
import { addPosts } from "@/app/store/postsSlice";
import { $ZodIssue } from "zod/v4/core";

const PostSchema = z.object({
  id: z.string(),
  content: z
    .string("Is not a text!")
    .min(1, "The text should be longer than 1 character.")
    .max(256, "The text should be shorter than 256 characters."),
});

const CreatePost = () => {
  const [postContent, setPostContent] = useState<string>("");
  const [error, setError] = useState<$ZodIssue[] | null>();
  const dispatch = useDispatch();

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const uid = uuidv4().slice(0, 8);

    let data = {
      id: uid,
      content: postContent,
    };

    const result = z.safeParse(PostSchema, data);
    if (result.success) {
      data = result.data;
      setError(null);
    } else {
      setError(result.error.issues);
      return;
    }

    await setDoc(doc(db, "posts", uid), data);
    dispatch(addPosts([data]));
    setPostContent("");
  };

  return (
    <div className="createpost">
      <form className="createpost__form" onSubmit={(e) => createPost(e)}>
        <textarea
          placeholder="Enter the content of a post..."
          name="createpostinput"
          id="createpostinput"
          className="createpost__form__input"
          onChange={(e) => setPostContent(e.target.value)}
          value={postContent}
        />
        <p className="form--error">{error && error[0].message}</p>
        <button className="createpost__form__button" type="submit">
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
