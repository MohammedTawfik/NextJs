"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import copyIcon from "@public/icons/copy.svg";
import { set } from "mongoose";

const PromptCard = ({ post, tagClickHandler, editHandler, deleteHandler }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [copied, setCopied] = useState("");
  const copyHandler = () => {
    navigator.clipboard.writeText(post.Prompt);
    setCopied(post.Prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.Creator?.image}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.Creator?.userName}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.Creator?.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={copyHandler}>
          <Image
            src={copied === post.Prompt ? "/icons/tick.svg" : "/icons/copy.svg"}
            width={20}
            height={20}
            alt="copy icon"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.Prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => tagClickHandler && tagClickHandler(post.Tag)}
      >
        {post.Tag}
      </p>
      {session?.user?.id === post.Creator?._id && pathName === "/profile" && (
        <div className="flex justify-end items-center gap-5">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={editHandler}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={deleteHandler}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
