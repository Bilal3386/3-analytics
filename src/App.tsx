import "./App.css";
import PostDetailPage from "./components/pages/PostDetailPage";
import PostListingPage from "./components/pages/PostListingPage";

import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import Login from "./components/auth/Login";
import Header from "./components/layout/Header";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
interface State {
  posts: Post[];
  comments: Comment[];
  isLoggedIn: boolean;
}

class App extends Component<{}, State> {
  state = {
    posts: [],
    isLoggedIn: false,
    comments: [],
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => this.setState({ posts: response.data }));

    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => this.setState({ comments: response.data }));
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: !false,
    });
  };

  render() {
    const { posts, isLoggedIn, comments } = this.state;
    return (
      <>
        <Header
          name="3 Analytics"
          isLoggedIn
          onLogoutClick={this.handleLogout}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <PostListingPage posts={posts} />}
          />
          <Route
            exact
            path="/post-detail/:id"
            render={(a) => (
              <PostDetailPage {...a} posts={posts} comments={comments} />
            )}
          />

          <Route path="/auth">
            <Login />
          </Route>
        </Switch>
      </>
    );
  }
}

export default App;
