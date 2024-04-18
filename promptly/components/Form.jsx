import Link from "next/link";
import React from "react";

const PostForm = ({ type, post, setPost, submitting, handler }) => {
  return (
    <section className="flex-start flex-col items-center justify-center w-full max-w-full h-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left maz-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handler}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label className="font-satoshi font-semibold text-base text-gray-700">
          Your AI Prompt
        </label>
        <textarea
          value={post.prompt}
          onChange={(e) => {
            setPost({ ...post, prompt: e.target.value });
          }}
          placeholder="Write your prompt here..."
          required
          className="form_textarea"
        />

        <label className="font-satoshi font-semibold text-base text-gray-700">
          Tag
        </label>
        <input
          value={post.tag}
          onChange={(e) => {
            setPost({ ...post, tag: e.target.value });
          }}
          placeholder="#tag"
          required
          className="form_input"
        />
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-sm text-gray-500">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 rounded-full text-sm bg-primary-orange text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PostForm;
