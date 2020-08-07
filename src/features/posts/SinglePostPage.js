import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// match is made available by react-router-dom
// it allows us access to the parameters specified as part of the url
const SinglePostPage = ({ match }) => {
  // take the post id from the url, then use it to get the post from the redux
  // store using a selector
  const { postId } = match.params;

  // note we find the smallest amount of information needed by the component here
  // this is because react will rerender every time this information changes, so
  // the more specific it is, the fewer rerenders will be triggered by information
  // changes
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
};

export default SinglePostPage;
