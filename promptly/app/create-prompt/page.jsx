"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PostForm from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Create the prompt
    try {
      // Call the API to create the prompt
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Create Prompt Error:", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <PostForm
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handler={createPrompt}
    ></PostForm>
  );
};

export default CreatePrompt;
