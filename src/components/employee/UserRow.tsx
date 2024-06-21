import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

interface UserRowProps {
    user: {
        id: string;
        email: string;
        password: string;
        nombre: string;
        apellido: string;
        skillLevel: string;
        weeklyHours: number;
    };
    openDeleteModal: (userId: string) => void;
    openEditModal: (user: 
    {   
        id: string;
        password: string;
        nombre: string;
        apellido: string;
        skillLevel: string;
        weeklyHours: number;
        email: string
    }
    ) => void;
    
}

const UserRow: React.FC<UserRowProps> = ({ user, openDeleteModal,openEditModal }) => {
    return (
        <tr>
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
                <button
                    onClick={() => openEditModal(user)}
                    className="text-indigo-600 hover:text-indigo-900"
                    type="button"
                    role="button"
                    tabIndex={0}
                >Edit</button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    onClick={() => openDeleteModal(user.id)}
                    className="text-red-600 hover:text-red-900"
                >
                    <AiOutlineDelete size={20} />
                </button>
            </td>
        </tr>
    );
};

export default UserRow;