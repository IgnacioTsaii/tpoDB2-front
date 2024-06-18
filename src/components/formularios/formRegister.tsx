import React, { useState } from 'react';
import { formRegister } from '@luca/interface/empleados';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<formRegister>({ username: '', password: '', nombre: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Aquí puedes manejar la lógica de envío del formulario, como enviar los datos a un API.
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block">Username</label>
        <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className="input" />
      </div>
      <div>
        <label htmlFor="password" className="block">Password</label>
        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="input" />
      </div>
      <div>
        <label htmlFor="nombre" className="block">Nombre</label>
        <input type="text" name="nombre" id="nombre" value={formData.nombre} onChange={handleChange} className="input" />
      </div>
      <div>
        <label htmlFor="email" className="block">Email</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="input" />
      </div>
      <button type="submit" className="btn">Register</button>
    </form>
  );
};

export default RegisterForm;