import React, { useEffect } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { addPosts, getAllPosts } from "./postsSlice";
import userEvent from "@testing-library/user-event";
import { PostType } from "../components/Posts/Posts";
import postsStore from "./postsStore";

const FetchPosts = ({ posts }: { posts: PostType[] }) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state: any) => state.posts.posts);

  useEffect(() => {
    dispatch(getAllPosts(posts));
  }, []);

  return (
    <div>
      {allPosts.map((post: PostType) => (
        <li key={post.id}>
          #{post.id} {post.content}
        </li>
      ))}
    </div>
  );
};

const AddPosts = ({ post }: { post: PostType }) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state: any) => state.posts.posts);

  useEffect(() => {
    const posts = [
      { id: "1", content: "Magna eu ad enim mollit adipisicing sit nostrud." },
      {
        id: "2",
        content: "Reprehenderit nisi esse anim velit do excepteur enim aliquip et est.",
      },
      { id: "3", content: "Velit ea irure labore ut tempor aliquip." },
    ];

    dispatch(getAllPosts(posts));
  }, []);

  const addNewPost = () => {
    dispatch(addPosts([post]));
  };

  return (
    <div>
      <button name="postbtn" onClick={addNewPost}>
        Post
      </button>
      {allPosts.map((post: PostType) => (
        <li key={post.id}>
          #{post.id} {post.content}
        </li>
      ))}
    </div>
  );
};

describe("Redux posts store test", () => {
  it("Stores all posts", async () => {
    const posts = [
      { id: "1", content: "Magna eu ad enim mollit adipisicing sit nostrud." },
      {
        id: "2",
        content: "Reprehenderit nisi esse anim velit do excepteur enim aliquip et est.",
      },
      { id: "3", content: "Velit ea irure labore ut tempor aliquip." },
    ];

    render(
      <Provider store={postsStore}>
        <FetchPosts posts={posts} />
      </Provider>
    );

    const renderedPosts = await screen.findAllByText(/^#\d/i);
    expect(renderedPosts).toHaveLength(3);
    expect(renderedPosts[0]).toHaveTextContent(posts[0].content);
  });

  it("Creates a post", async () => {
    render(
      <Provider store={postsStore}>
        <AddPosts
          post={{
            id: "4",
            content:
              "Eiusmod culpa dolore consectetur incididunt consequat veniam ullamco aliquip ut sunt fugiat ex fugiat.",
          }}
        />
      </Provider>
    );

    const renderedPosts = await screen.findAllByText(/^#\d/i);
    expect(renderedPosts).toHaveLength(3);
    const button = await screen.findByRole("button", { name: /post/i });
    userEvent.click(button);
    await waitFor(() => {
      expect(screen.getAllByText(/^#\d/i)).toHaveLength(4);
    });
  });
});
