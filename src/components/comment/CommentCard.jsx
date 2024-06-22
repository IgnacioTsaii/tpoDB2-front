import { comment } from "postcss";
import React from "react";


export default function CommentCard({ comments }) {

return (
    <div className="border rounded-md shadow-md p-4 mb-4">
    {/* <p className="text-lg font-semibold">Comment ID: {comment.id}</p> */}
    <p className="text-sm text-gray-600"> {comments.users.name} {comments.users.last_name}</p>
    <p className="text-base mt-2">Comment: {comments.comment}</p>
    <p className="text-sm text-gray-600">{comments.timestamp}</p>
  </div>
);
}
