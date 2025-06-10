import React, { useState, useEffect } from 'react';
import { User } from '../types/User';
import { userApi } from '../services/api';

interface UserListProps {
  onEditUser: (user: User) => void;
  refreshTrigger: number;
}

const UserList: React.FC<UserListProps> = ({ onEditUser, refreshTrigger }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await userApi.getUsers();
      setUsers(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [refreshTrigger]);

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await userApi.deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  const formatTimezone = (timezone: number): string => {
    const hours = Math.floor(Math.abs(timezone) / 3600);
    const minutes = Math.floor((Math.abs(timezone) % 3600) / 60);
    const sign = timezone >= 0 ? '+' : '-';
    return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <p className="text-red-700 mb-4">Error: {error}</p>
          <button 
            onClick={loadUsers} 
            className="btn btn-danger"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold text-white text-center md:text-left">
          Users ({users.length})
        </h2>
        <button 
          onClick={loadUsers} 
          className="btn btn-primary px-4 py-2 mx-auto md:mx-0"
        >
          🔄 Refresh
        </button>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto">
            <p className="text-white text-lg">No users found. Create your first user!</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="card animate-slide-up">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 truncate">
                    {user.name}
                  </h3>
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => onEditUser(user)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit User"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete User"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 flex items-center">
                      📍 Location:
                    </span>
                    <span className="text-sm text-gray-700 font-medium">
                      {user.zipCode}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 flex items-center">
                      🌍 Coordinates:
                    </span>
                    <span className="text-sm text-gray-700 font-mono">
                      {user.latitude.toFixed(4)}, {user.longitude.toFixed(4)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 flex items-center">
                      🕐 Timezone:
                    </span>
                    <span className="text-sm text-gray-700 font-mono">
                      {formatTimezone(user.timezone)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 flex items-center">
                      📅 Created:
                    </span>
                    <span className="text-sm text-gray-700">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {user.updatedAt !== user.createdAt && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500 flex items-center">
                        ✏️ Updated:
                      </span>
                      <span className="text-sm text-gray-700">
                        {new Date(user.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList; 