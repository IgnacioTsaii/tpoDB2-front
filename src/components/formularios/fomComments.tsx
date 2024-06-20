import React, { useState } from 'react';
import { Comment } from '@luca/interface/comments';

interface CommentFormProps {
  onSubmit: (comment: Comment) => void;
}

const initialCommentData: Comment = {
  id: 0,
  content: '',
};

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState<string>('');

  const handleSubmit = () => {
    if (content) {
      const newComment: Comment = { id: Date.now(), content };
      onSubmit(newComment);
      setContent('');
    } else {
      alert("Por favor ingrese un comentario.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
          Comentario
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="text-right">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Enviar Comentario
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
