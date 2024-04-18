"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirm) {
      try {
        const res = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setPosts(posts.filter((p) => p._id !== post._id));
        }
      } catch (error) {
        console.error("Delete Prompt Error:", error);
      }
    }
  };

  useEffect(() => {
    const fetchMyPosts = async () => {
      const res = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    if (session?.user?.id) {
      fetchMyPosts();
    }
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      editHandler={handleEdit}
      deleteHandler={handleDelete}
    ></Profile>
  );
};

export default MyProfile;
