"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

function Feed() {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredPost, setFilteredPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const search = setTimeout(() => {
      const regexSearchText = new RegExp(searchText, "i");

      if (searchText !== "" && searchText.length > 0) {
        const searchedTextContainingPosts = posts.filter(
          (post) =>
            regexSearchText.test(post.prompt) ||
            regexSearchText.test(post.tag) ||
            regexSearchText.test(post.creator.username) ||
            regexSearchText.test(post.creator.email)
        );
        setFilteredPost(searchedTextContainingPosts);
      }
    }, 300);
    return () => clearTimeout(search);
  }, [searchText]);

  const handleSearchInput = (e) => setSearchText(e.target.value);
  const tagClickHandler = (tag) => setSearchText(tag);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search text, tag, username, email"
          value={searchText}
          onChange={handleSearchInput}
          required
          className="search_input peer"
        />
      </form>

      {searchText.length && filteredPost.length ? (
        <PromptCardList data={filteredPost} handleTagClick={tagClickHandler} />
      ) : (
        <PromptCardList data={posts} handleTagClick={tagClickHandler} />
      )}
    </section>
  );
}

export default Feed;
