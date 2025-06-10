import React, { useState, useEffect } from 'react';
import { User, CreateUserRequest, UpdateUserRequest } from '../types/User';
import { userApi } from '../services/api';

interface UserFormProps {
  user?: User | null;
  onSubmit: () => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    zipCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        zipCode: user.zipCode
      });
    } else {
      setFormData({
        name: '',
        zipCode: ''
      });
    }
    setError(null);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    
    if (!formData.zipCode.trim()) {
      setError('Zip code is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (user) {
        const updateData: UpdateUserRequest = {};
        if (formData.name !== user.name) updateData.name = formData.name.trim();
        if (formData.zipCode !== user.zipCode) updateData.zipCode = formData.zipCode.trim();
        
        if (Object.keys(updateData).length > 0) {
          await userApi.updateUser(user.id, updateData);
        }
      } else {
        const createData: CreateUserRequest = {
          name: formData.name.trim(),
          zipCode: formData.zipCode.trim()
        };
        await userApi.createUser(createData);
      }
      
      onSubmit();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
          <h2 className="text-xl font-semibold text-gray-800">
            {user ? 'Edit User' : 'Create New User'}
          </h2>
          <button 
            onClick={onCancel} 
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter user name"
              disabled={loading}
              required
              className="input disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
              Zip Code *
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="Enter zip code (e.g., 10001)"
              disabled={loading}
              required
              className="input disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Location data (latitude, longitude, timezone) will be automatically fetched
            </p>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>{user ? 'Updating...' : 'Creating...'}</span>
                </div>
              ) : (
                user ? 'Update User' : 'Create User'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm; 