import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CommentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    taskId: '',
    userId: '',
    comment: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    // Puedes añadir lógica adicional después de enviar el formulario si es necesario
    // Por ejemplo, limpiar el formulario o mostrar un mensaje de éxito.
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Task ID"
        name="taskId"
        value={formData.taskId}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="User ID"
        name="userId"
        value={formData.userId}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Comment"
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        multiline
        rows={4}
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default CommentForm;
