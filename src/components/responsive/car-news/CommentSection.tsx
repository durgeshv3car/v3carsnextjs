'use client'
import { useState } from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaRegHeart,
  FaHeart,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from "react-icons/fa6";
import { HiOutlineDotsVertical, HiChevronDown } from "react-icons/hi";
import { FaUserCheck } from "react-icons/fa";

interface Reply {
  id: number;
  name: string;
  text: string;
  author?: boolean;
}

interface Comment {
  id: number;
  name: string;
  avatar?: string;
  time: string;
  text: string;
  likes: number;
  dislikes: number;
  replies: Reply[];
  author?: boolean;
  likedByAuthor?: boolean;
}

const initialComments: Comment[] = [
  {
    id: 1,
    name: "@ravidhaiya97",
    time: "2 days ago",
    text: "No one can beat Maruti in Base Variants",
    likes: 14,
    dislikes: 0,
    replies: [
      {
        id: 1,
        name: "@V3cars",
        text: "Totally agreed!",
        author: true,
      },
    ],
    author: false,
    likedByAuthor: true,
  },

  {
    id: 2,
    name: "@ravidhaiya97",
    time: "2 days ago",
    text: "No one can beat Maruti in Base Variants",
    likes: 14,
    dislikes: 0,
    replies: [
      {
        id: 1,
        name: "@V3cars",
        text: "Totally agreed!",
        author: true,
      },
    ],
    author: true,
    likedByAuthor: true,
  },
];

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleLike = (id: number) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, likes: c.likes + 1 } : c
      )
    );
  };

  const handleDislike = (id: number) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, dislikes: c.dislikes + 1 } : c
      )
    );
  };

  return (
    <div className="py-6 px-4 rounded-lg space-y-6 mt-5">
      {/* Share icons */}

      <div className="flex justify-end items-center gap-4 pr-2">
        {[FaFacebookF, FaXTwitter, FaLinkedinIn, FaWhatsapp].map((Icon, i) => (
          <span
            key={i}
            className="w-10 h-10 rounded-full bg-white dark:bg-[#171717] flex items-center justify-center text-[18px] shadow cursor-pointer hover:opacity-80"
          >
            <Icon className="" />
          </span>
        ))}
        <span className="w-10 h-10 rounded-full bg-white dark:bg-[#171717] flex items-center justify-center text-[18px] shadow cursor-pointer hover:opacity-80">
          <HiOutlineDotsVertical className="" />
        </span>
      </div>

      {/* Add Comment */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
          D
        </div>
        <input
          placeholder="Add a comment..."
          className="flex-1 border-b border-gray-300 dark:border-[#2E2E2E] bg-transparent text-sm outline-none py-1"
        />
      </div>

      {/* Comment List */}
      <div className="space-y-6">
        {comments.map((c) => (
          <div key={c.id} className="space-y-2">
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 bg-gray-200 dark:bg-[#171717] rounded-full flex items-center justify-center text-sm font-semibold ">
                {c.name.charAt(1)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-semibold  mr-1">{c.name}</span>
                    <span className=" text-xs">{c.time}</span>
                    {c.author && (
                      <FaUserCheck className="inline ml-2 text-blue-600 text-[14px]" title="Author" />
                    )}
                  </div>
                  <HiOutlineDotsVertical className=" text-lg cursor-pointer" />
                </div>
                <p className="text-sm  mt-1 whitespace-pre-line">{c.text}</p>
                <div className="flex items-center gap-4 text-xs  mt-2">
                  <button onClick={() => handleLike(c.id)} className="hover:opacity-80">
                    <FaRegThumbsUp className="inline mr-1 text-base" />{c.likes > 0 && c.likes}
                  </button>
                  <button onClick={() => handleDislike(c.id)} className="hover:opacity-80">
                    <FaRegThumbsDown className="inline text-base " />
                  </button>
                  {c.likedByAuthor && (
                    <FaHeart className="text-red-500 text-[14px] -ml-1" title="Liked by Author" />
                  )}
                  <button className="hover:underline">Reply</button>
                </div>
              </div>
            </div>

            {/* Reply Section */}
            {c.replies.length > 0 && (
              <div className="pl-10 flex gap-2 items-start text-sm ">
                <HiChevronDown className=" text-base mt-1" />
                <span className="text-blue-600 hover:underline cursor-pointer">
                  • {c.replies.length} {c.replies.length === 1 ? "reply" : "replies"}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
