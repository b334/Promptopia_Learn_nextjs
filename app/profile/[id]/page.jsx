"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const username = searchParams.get("name");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={`${username}'s`}
      desc={`Welcome to ${username}'s page. Explore ${username}'s prompts.`}
      data={posts}
    />
  );
};

export default MyProfile;
