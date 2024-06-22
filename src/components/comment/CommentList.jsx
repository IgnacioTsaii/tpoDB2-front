import React from "react";
import CommentCard from "./CommentCard";

export default function CommentList({ list }) {

return (
    <div>
        <h2 className="text-2xl font-bold mt-6">Comentarios</h2>
        <ul>
            {list.map((comment) => (
                <CommentCard key={comment.id} comments={comment} />
            ))}
        </ul>
    </div>
);
}