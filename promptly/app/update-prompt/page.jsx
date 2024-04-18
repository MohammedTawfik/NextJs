"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PostForm from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const fetchPrompt = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();
      setPost({ prompt: data.Prompt, tag: data.Tag });
    };
    if (promptId) fetchPrompt();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) alert("Prompt Id not found");
    // Create the prompt
    try {
      // Call the API to create the prompt
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handler={updatePrompt}
    ></PostForm>
  );
};

export default EditPrompt;
