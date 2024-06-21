import React from 'react';
import Modal from 'react-modal';

interface EditEmployeeModalProps {
    isOpen: boolean;
    closeModal: () => void;
    usuario: {
        id: string;
        email: string;
        password: string;
        nombre: string;
        apellido: string;
        skillLevel: string;
        weeklyHours: number;
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
        setFormData({
            ...setFormData,
            [name]: value,
        });
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
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            readOnly
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                            Nombre
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="nombre"
                            name="nombre"
                            type="text"
                            value={usuario.nombre}
                            onChange={handleChange}
                            placeholder="Nombre"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                            Apellido
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="apellido"
                            name="apellido"
                            type="text"
                            value={usuario.apellido}
                            onChange={handleChange}
                            placeholder="Apellido"
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
                            {skills.map((skill) => (
                                <option key={skill} value={skill}>
                                    {skill}
                                </option>
                            ))}
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
                    {/* Agregar campo para la contraseña */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            name="password"
                            type="password"
                            value={usuario.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
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
