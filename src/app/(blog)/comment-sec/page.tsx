"use client";
import React, { useState, useEffect } from "react";

const CommentSec = ({ blogId }: { blogId: string }) => {
  const [comments, setComments] = useState<{ name: string; text: string; rating: number }[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [visibleComments, setVisibleComments] = useState(3);

  // Load comments from localStorage for each blog
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(`comments-${blogId}`) || "[]");
    setComments(savedComments);
  }, [blogId]);

  // Save comments to localStorage
  useEffect(() => {
    localStorage.setItem(`comments-${blogId}`, JSON.stringify(comments));
  }, [comments, blogId]);

  // Add or Edit Comment
  const addComment = () => {
    if (name.trim() && text.trim() && rating > 0) {
      if (editIndex !== null) {
        // Edit Mode
        const updatedComments = [...comments];
        updatedComments[editIndex] = { name, text, rating };
        setComments(updatedComments);
        setEditIndex(null);
      } else {
        // Add New Comment
        setComments([...comments, { name, text, rating }]);
      }
      setName("");
      setText("");
      setRating(0);
    }
  };

  // Delete Comment
  const deleteComment = (index: number) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  // Edit Comment
  const editComment = (index: number) => {
    setName(comments[index].name);
    setText(comments[index].text);
    setRating(comments[index].rating);
    setEditIndex(index);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-xl backdrop-blur-lg border border-pink-500">
      {/* Tagline */}
      <h2 className="text-2xl font-bold mb-2 text-center text-pink-400">
        💬 Share Your Thoughts!
      </h2>
      <p className="text-center text-gray-300 mb-4 text-sm">
        Leave a comment and rate this blog.
      </p>

      {/* Input Fields */}
      <div className="mb-4 flex flex-col sm:flex-row sm:space-x-3">
        <input
          type="text"
          placeholder="Your Name"
          className="flex-1 p-2 border rounded bg-gray-700 border-gray-500 focus:ring-2 focus:ring-pink-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Write a comment..."
          className="flex-1 p-2 border rounded bg-gray-700 border-gray-500 focus:ring-2 focus:ring-pink-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {/* Star Rating */}
      <div className="flex items-center mb-4 space-x-1">
        <p className="text-sm text-gray-400">Rate:</p>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`text-xl ${star <= rating ? "text-yellow-400" : "text-gray-500"} hover:text-yellow-300 transition`}
            onClick={() => setRating(star)}
          >
            ★
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <button
        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded transition font-semibold"
        onClick={addComment}
      >
        {editIndex !== null ? "Update Comment" : "Add Comment"}
      </button>

      {/* Display Comments */}
      <div className="mt-6 space-y-3">
        {comments.length > 0 ? (
          comments.slice(0, visibleComments).map((comment, index) => (
            <div key={index} className="p-4 bg-gray-700 rounded flex justify-between items-center border border-gray-600 shadow-md">
              <div className="flex-1">
                <p className="text-sm text-pink-300 font-bold">@{comment.name}</p>
                <p className="text-gray-200 text-sm">{comment.text}</p>
                {/* Star Rating Display */}
                <div className="flex mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`text-lg ${star <= comment.rating ? "text-yellow-400" : "text-gray-500"}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              {/* Edit & Delete Buttons */}
              <div className="flex space-x-3">
                <button onClick={() => editComment(index)} className="text-green-400 hover:text-green-500 transition text-sm">
                  ✏️ Edit
                </button>
                <button onClick={() => deleteComment(index)} className="text-red-400 hover:text-red-500 transition text-sm">
                  ❌ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm">No comments yet. Be the first! 🚀</p>
        )}
      </div>

      {/* See More Button */}
      {comments.length > visibleComments && (
        <button
          className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded transition font-semibold"
          onClick={() => setVisibleComments(visibleComments + 2)}
        >
          See {comments.length - visibleComments} More Comments 👇
        </button>
      )}
    </div>
  );
};

export default CommentSec;
