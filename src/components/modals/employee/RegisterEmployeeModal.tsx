import React from "react";
import Modal from "react-modal";

interface RegisterEmployeeModalProps {
    isOpen: boolean;
    closeModal: () => void;
    formData: {
        userId: string;
        userPassword: string | number | readonly string[] | undefined;
        email: string;
        firstname: string;
        username: string;
        lastname: string;
        skillLevel: string;
        weeklyHours: number;
        role: string;
    };
    setFormData: (formData: any) => void;
    handleRegister: () => void;
    skills: string[];
}

const RegisterEmployeeModal: React.FC<RegisterEmployeeModalProps> = ({
    isOpen,
    closeModal,
    formData,
    setFormData,
    handleRegister,
    skills,
}) => {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Register New User"
            className="fixed inset-0 flex items-center justify-center"
            overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Register New User</h2>
                <form>
                    <div className="flex flex-row gap-4">
                        <div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="nombre">
                                    Nombre
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    onChange={handleChange}
                                    placeholder="Nombre"
                                />
                            </div>
                            {/* apellido */}

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="apellido
                        ">
                                    Apellido
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    onChange={handleChange}
                                    placeholder="Apellido"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="apellido
                        ">
                                    usuario
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username"
                                    name="username"
                                    type="text"
                                    onChange={handleChange}
                                    placeholder="Usuario"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="nombre">
                                    Contraseña
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="userPassword"
                                    name="userPassword"
                                    type="password"
                                    onChange={handleChange}
                                    placeholder="password"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="skillLevel">
                                    Skill Level
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="skillLevel"
                                    name="skillLevel"
                                    onChange={handleChange}>
                                    <option value="">Select Skill Level</option>

                                    {skills.map((skill) => (
                                        <option key={skill} value={skill}>
                                            {skill}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="role">
                                    Role
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="role"
                                    name="role"
                                    onChange={handleChange}>
                                    <option value="">Select Role</option>

                                    <option value="Employee">Employee</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="weeklyHours">
                                    Weekly Hours
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="weeklyHours"
                                    name="weeklyHours"
                                    type="text"
                                    onChange={handleChange}
                                    placeholder="Weekly Hours"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handleRegister}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Register
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default RegisterEmployeeModal;
