import React, { useState } from 'react';
import { formRegister } from '@/interface/empleados';
import { AiOutlinePlus } from 'react-icons/ai';
import Modal from 'react-modal';

interface UserTableProps {
    users: formRegister[];
}



const UserTable: React.FC<UserTableProps> = ({ users }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleRegister = () => {
        // handle user registration logic
        closeModal();
    };

    return (
        <div className="max-w-6xl mx-auto py-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-gray-900">Users</h2>
                <button
                    onClick={openModal}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    <AiOutlinePlus className="mr-2" size={20} />
                    Add User
                </button>
            </div>
            <p className="mb-6 text-gray-600">
                A list of all the users in your account including their name,
                title, email and role.
            </p>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Skill level
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Weekly Hours
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.email}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.nombre}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.skillLevel}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.weeklyHours}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a
                                        href="#"
                                        className="text-indigo-600 hover:text-indigo-900">
                                        Edit
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Register New User"
                className="fixed inset-0 flex items-center justify-center"
                overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50"
            >
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4">Register New User</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
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
                                type="text"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skillLevel">
                                Skill Level
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="skillLevel"
                                type="text"
                                placeholder="Skill Level"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weeklyHours">
                                Weekly Hours
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="weeklyHours"
                                type="text"
                                placeholder="Weekly Hours"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={handleRegister}
                            >
                                Register
                            </button>
                            <button
                                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                type="button"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default UserTable;
