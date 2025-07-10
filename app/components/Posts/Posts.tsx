"use client";

import React, { useEffect } from "react";
import "./Posts.css";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import Post from "../Post/Post";
import CreatePost from "../CreatePost/CreatePost";
import { db } from "@/app/config/firebaseConfig";
import { getAllPosts, removePost } from "@/app/store/postsSlice";

type PostType = {
  id: string;
  content: string;
};

const Posts = () => {
  const postsList: PostType[] = useSelector((state: any) => state.posts.posts);
  const dispatch = useDispatch();

  const getPosts = async () => {
    const postsSnap = await getDocs(collection(db, "posts"));

    const allPosts: PostType[] = postsSnap.docs.map((post) => ({
      id: post.id,
      content: post.data().content,
    }));

    dispatch(getAllPosts(allPosts));
  };

  const deletePost = async (id: string) => {
    await deleteDoc(doc(db, "posts", id));
    dispatch(removePost(id));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="posts">
      <CreatePost />
      <div className="posts__container">
        {postsList?.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            content={post.content}
            deletePost={deletePost}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
