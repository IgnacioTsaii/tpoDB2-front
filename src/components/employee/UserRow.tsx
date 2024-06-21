import React from 'react';
import { formRegister } from '@/interface/empleados';
import { AiOutlineDelete } from 'react-icons/ai';

interface UserRowProps {
    user: {
        user_id: string;
        email: string;
        name: string;
        last_name: string;
        skillLevel: string;
        weeklyHours: string;
    };
    openDeleteModal: (userId: string) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, openDeleteModal }) => {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.last_name}
                </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.skillLevel}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.weeklyHours}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    onClick={() => openDeleteModal(user.email)}
                    className="text-red-600 hover:text-red-900"
                >
                    <AiOutlineDelete size={20} />
                </button>
            </td>
        </tr>
    );
};

export default UserRow;