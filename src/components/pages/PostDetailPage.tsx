import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  body: string;
  userId: string;
}

interface Comment {
  id: string;
  postId: string;
  name: string;
  email: string;
  body: string;
}

interface Props extends RouteComponentProps<{ id: string }> {
  posts: Post[];
  comments: Comment[];
}

class PostDetailPage extends Component<Props> {
  render() {
    const { match, posts, comments } = this.props;
    const postId = match.params.id;
    const post = posts.find((p) => Number(p.id) === Number(postId));
    console.log(posts);
    if (!post) {
      return <div>Post not found</div>;
    }

    const postComments = comments.filter(
      (c) => Number(c.postId) === Number(post.id)
    );

    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <h2>Comments</h2>
        <ul>
          {postComments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.name}</p>
              <p>{comment.body}</p>
              <p>{comment.email}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PostDetailPage;
