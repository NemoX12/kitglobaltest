"use client";

import React, { useCallback, useEffect } from "react";
import "./Posts.css";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import Post from "../Post/Post";
import CreatePost from "../CreatePost/CreatePost";
import { db } from "@/app/config/firebaseConfig";
import { getAllPosts, removePost } from "@/app/store/postsSlice";
import { openModalAction } from "@/app/store/postModalSlice";
import PostModal from "../PostModal/PostModal";
import { RootState } from "@/app/store/postsStore";

export type PostType = {
  id: string;
  content: string;
};

const Posts = () => {
  const postsList: PostType[] = useSelector((state: RootState) => state.posts.posts);
  const postsModal: PostType | null = useSelector(
    (state: RootState) => state.postModal.post
  );

  const dispatch = useDispatch();

  const getPosts = useCallback(async () => {
    const postsSnap = await getDocs(collection(db, "posts"));

    const allPosts: PostType[] = postsSnap.docs.map((post) => ({
      id: post.id,
      content: post.data().content,
    }));

    dispatch(getAllPosts(allPosts));
  }, [dispatch]);

  const deletePost = async (id: string) => {
    await deleteDoc(doc(db, "posts", id));
    dispatch(removePost(id));
  };

  const openModal = ({ id, content }: PostType) => {
    dispatch(openModalAction({ id, content }));
  };

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      {postsModal !== null && <PostModal />}
      <div className="posts">
        <CreatePost />
        <div className="posts__container">
          {postsList?.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              content={post.content}
              deletePost={deletePost}
              openModal={openModal}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Posts;
