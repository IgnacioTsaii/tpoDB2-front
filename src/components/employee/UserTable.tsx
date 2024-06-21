import React, { useState } from 'react';
import { formRegister } from '@/interface/empleados';
import { AiOutlinePlus } from 'react-icons/ai';
import UserRow from './UserRow';
import RegisterEmployeeModal from '@/components/modals/RegisterEmployeeModal';
import DeleteUserModal from '@/components/modals/DeleteUserModal';

interface UserTableProps {
    users: formRegister[];
    skills: string[];
}

const UserTable: React.FC<UserTableProps> = ({ users, skills }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        nombre: '',
        skillLevel: '',
        weeklyHours: '',
    });
    const [userToDelete, setUserToDelete] = useState<null | string>(null);
    const [successMessage, setSuccessMessage] = useState('');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openDeleteModal = (userId: string) => {
        setUserToDelete(userId);
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const handleRegister = async () => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setSuccessMessage('User registered successfully');
                setTimeout(() => setSuccessMessage(''), 3000);
                closeModal();
            } else {
                console.error('Failed to register user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async () => {
        if (!userToDelete) return;

        try {
            const response = await fetch(`/api/delete/${userToDelete}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setSuccessMessage('User deleted successfully');
                setTimeout(() => setSuccessMessage(''), 3000);
                closeDeleteModal();
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
            {successMessage && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
                    {successMessage}
                </div>
            )}
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
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <UserRow key={user.email} user={user} openDeleteModal={openDeleteModal} />
                        ))}
                    </tbody>
                </table>
            </div>
            <RegisterEmployeeModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                formData={formData}
                setFormData={setFormData}
                handleRegister={handleRegister}
                skills={skills}
            />
            <DeleteUserModal
                isOpen={isDeleteModalOpen}
                closeModal={closeDeleteModal}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default UserTable;