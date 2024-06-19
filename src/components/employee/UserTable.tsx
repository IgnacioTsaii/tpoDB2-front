import React from 'react';
import { formRegister } from '@luca/interface/empleados';

interface UserTableProps {
    users: formRegister[];
  }
  
  const UserTable: React.FC<UserTableProps> = ({ users }) => {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Users</h2>
        </div>
        <p className="mb-6 text-gray-600">A list of all the users in your account including their name, title, email and role.</p>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.email}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                  {/* NO SE SI ESTA BIEN MOSTRAR EL PSW AJJAA */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-graformRegister0">{user.password}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm formRegister-gray-500">{user.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap formRegister-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default UserTable;
