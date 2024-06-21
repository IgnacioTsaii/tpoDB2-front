import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import User from "@/interface/User";

interface UserRowProps {
    user: User;
    openDeleteModal: (userId: string) => void;
    openEditModal: (user: User) => void;
}

const UserRow: React.FC<UserRowProps> = ({
    user,
    openDeleteModal,
    openEditModal,
}) => {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.name}
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
                    tabIndex={0}>
                    Edit
                </button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    onClick={() => openDeleteModal(user.user_id)}
                    className="text-red-600 hover:text-red-900">
                    <AiOutlineDelete size={20} />
                </button>
            </td>
        </tr>
    );
};

export default UserRow;
