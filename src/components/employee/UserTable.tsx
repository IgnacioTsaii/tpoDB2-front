import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import UserRow from './UserRow';
import RegisterEmployeeModal from '../modals/employee/RegisterEmployeeModal';
import EditEmployeeModal from '../modals/employee/EditEmployeeModal';
import DeleteUserModal from '../modals/employee/DeleteUserModal';

interface UserTableProps {
    users: {user_id: string;
        email: string;
        password: string;
        name: string;
        last_name: string;
        skillLevel: string;
        weeklyHours: number;}[];
    skills: string[];
}

const UserTable: React.FC<UserTableProps> = ({ users, skills }) => {
    
    const [successMessage, setSuccessMessage] = useState('');
    
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    const [formData, setFormData] = useState({
        email: '',
        name: '',
        last_name: '',
        skillLevel: '',
        weeklyHours: 0, // Inicializar como string para que coincida con el tipo en el modal de edición
        password: '', // Agregar campo para la contraseña
    });


    
    // registrar usuario MODAL -------------------------------------
    
    const openRegisterModal = () => setIsRegisterModalOpen(true);
    const closeRegisterModal = () => setIsRegisterModalOpen(false);

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
                closeRegisterModal();
            } else {
                console.error('Failed to register user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    
    // editar usuario MODAL -------------------------------------
    
    // O TIENE UN USUARIO VACIO O TIENE UNO PARA EDITAR
    const [userToEdit, setUserToEdit] = useState<
    | {
        user_id: string;
        email: string;
        password: string;
        name: string;
        last_name: string;
        skillLevel: string;
        weeklyHours: number;
    }>(
        {
            user_id: '',
            password: '',
            name: '',
            last_name: '',
            skillLevel: '',
            weeklyHours: 0,
            email: '',
        }
    );
    //  cuando se abre el modal de edición, se establece el usuario a editar y se abre el modal
    const openEditModal = (user: {
        user_id: string;
        password: string;
        name: string;
        last_name: string;
        skillLevel: string;
        weeklyHours: number;
        email: string;
    }) => {
        setFormData({
            email: user.email,
            name: user.name,
            last_name: user.last_name,
            password: user.password,
            skillLevel: user.skillLevel,
            weeklyHours: user.weeklyHours, // Convertir a string para que coincida con el tipo en el modal
        });
        setUserToEdit(user);
        setIsEditModalOpen(true);
    };
    
    // 
    const handleEdit = async () => {
        if (!userToEdit) return;
        
        try {
            const response = await fetch(`/api/edit/${userToEdit.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setSuccessMessage('User updated successfully');
                setTimeout(() => setSuccessMessage(''), 3000);
                closeEditModal();
            } else {
                console.error('Failed to edit user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    // cuando se cierra el modal de edición, se restablece el usuario a editar y se cierra el modal
    const closeEditModal = () => {setIsEditModalOpen(false)
        setUserToEdit({
            user_id: '',
            password: '',
            name: '',
            last_name: '',
            skillLevel: '',
            weeklyHours: 0,
            email: '',
        });
        setFormData({
            email: '',
            name: '',
            last_name: '',
            skillLevel: '',
            weeklyHours: 0,
            password: '',
        });
    };
    
    
    // eliminar usuario MODAL-------------------------------------
    
    // tiene un usuario a eliminar o es nulo
    const [userToDelete, setUserToDelete] = useState<null | string>(null);
    
    // cuando se abre el modal de eliminación, se establece el usuario a eliminar y se abre el modal
    const openDeleteModal = (userId: string) => {
        setUserToDelete(userId);
        setIsDeleteModalOpen(true);
    };
    
    const closeDeleteModal = () => setIsDeleteModalOpen(false);
    
    
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
                    onClick={openRegisterModal}
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
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Email
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Skill level
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
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
                            <UserRow openEditModal={openEditModal} key={user.user_id} user={user} openDeleteModal={openDeleteModal} />
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Modales para administrar al empleado */}
            <RegisterEmployeeModal
                isOpen={isRegisterModalOpen}
                closeModal={closeRegisterModal}
                formData={formData}
                setFormData={setFormData}
                handleRegister={handleRegister}
                skills={skills}
            />
            <EditEmployeeModal
                isOpen={isEditModalOpen}
                closeModal={closeEditModal}
                usuario={userToEdit}
                setFormData={setFormData}
                handleAction={handleEdit}
                actionName="Edit"
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