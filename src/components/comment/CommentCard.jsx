
import React from "react";


export default function CommentCard({ comments }) {
      // Obtener el timestamp como una cadena
      const timestampString = comments.timestamp;

      // Crear un objeto Date a partir del timestamp
      const dateObject = new Date(timestampString);
  
      // Formatear la fecha y hora en formato legible
      const formattedTimestamp = `${dateObject.toLocaleDateString()}`;

return (
    <div className="border rounded-md shadow-md p-4 mb-4">
    {/* <p className="text-lg font-semibold">Comment ID: {comment.id}</p> */}
    <p className="text-sm text-gray-600"> {comments.user.name} {comments.user.last_name}</p>
    <p className="text-base mt-2">{comments.comment}</p>
    <p className="text-sm text-gray-600">{formattedTimestamp}</p>
  </div>
);
}
