import React, { Component } from "react";
import Pagination from "../Pagination/Pagination";
import classes from "./PostListingPage.module.css";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: string;
}

interface Props {
  posts: Post[];
}

interface State {
  searchTerm: string;
  selectedUserId: string;
  currentPage: number;
  postsPerPage: number;
}

class PostListingPage extends Component<Props, State> {
  state = {
    searchTerm: "",
    selectedUserId: "",
    currentPage: 1,
    postsPerPage: 10,
  };

  handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleUserFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedUserId: e.target.value });
  };

  handlePageChange = (pageNumber: number) => {
    this.setState({ currentPage: pageNumber });
  };

  filteredPosts() {
    const { posts } = this.props;
    // console.log(posts)
    const { searchTerm, selectedUserId } = this.state;
    let filteredPosts = posts;
    if (searchTerm) {
      filteredPosts = filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedUserId) {
      filteredPosts = filteredPosts.filter(
        (post) => post.userId === selectedUserId
      );
    }

    return filteredPosts;
  }
  render() {
    const { searchTerm, currentPage, postsPerPage } = this.state;
    const filteredPosts = this.filteredPosts();

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    return (
      <div className={classes["post-listing-page"]}>
        <form className={classes["post-listing-page__search-form"]}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            className={classes["post-listing-page__search-input"]}
            onChange={this.handleSearch}
          />
        </form>
        <ul className={classes["post-listing-page__post-list"]}>
          {currentPosts.map((post) => (
            <li
              key={post.id}
              className={classes["post-listing-page__post-list"]}
            >
              <Link to={`/post-detail/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredPosts.length}
          paginate={this.handlePageChange}
        />
      </div>
    );
  }
}

export default PostListingPage;
