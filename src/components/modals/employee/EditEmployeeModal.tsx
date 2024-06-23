import React from 'react';
import Modal from 'react-modal';
import User from '@/interface/user';

interface EditEmployeeModalProps {
    isOpen: boolean;
    closeModal: () => void;
    usuario: {
        userId: string;
        email: string;
        firstname: string;
        lastname: string;
        username: string;
        userPassword: string;
        skillLevel: string;
        weeklyHours: number;
        role: string;
    };
    setFormData: (formData: any) => void;
    handleAction: () => void;
    actionName: string;
    skills: string[];
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
    isOpen,
    closeModal,
    usuario,
    setFormData,
    handleAction,
    actionName,
    skills,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel={`${actionName} User`}
            className="fixed inset-0 flex items-center justify-center"
            overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50"
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{actionName} User</h2>
                <form>
                    <div className="flex flex-row gap-4">
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={usuario.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
                                    Nombre
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    value={usuario.firstname}
                                    onChange={handleChange}
                                    placeholder="Nombre"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                                    Apellido
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    value={usuario.lastname}
                                    onChange={handleChange}
                                    placeholder="Apellido"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Usuario
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={usuario.username}
                                    onChange={handleChange}
                                    placeholder="Usuario"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userPassword">
                                    Contraseña
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="userPassword"
                                    name="userPassword"
                                    type="password"
                                    value={usuario.userPassword}
                                    onChange={handleChange}
                                    placeholder="Password"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skillLevel">
                                    Skill Level
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="skillLevel"
                                    name="skillLevel"
                                    value={usuario.skillLevel}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Skill Level</option>
                                    {skills.map((skill) => (
                                        <option key={skill} value={skill}>
                                            {skill}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                                    Role
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="role"
                                    name="role"
                                    value={usuario.role}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Role</option>
                                    <option value="Employee">Employee</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weeklyHours">
                                    Weekly Hours
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="weeklyHours"
                                    name="weeklyHours"
                                    type="text"
                                    value={usuario.weeklyHours}
                                    onChange={handleChange}
                                    placeholder="Weekly Hours"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handleAction}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {actionName}
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default EditEmployeeModal;
