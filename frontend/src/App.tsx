import React, { useState } from 'react';
import { User } from './types/User';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreateUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingUser(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-700">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-white/20 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl font-bold text-center md:text-left">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                👥 User Management System
              </span>
            </h1>
            <button 
              onClick={handleCreateUser}
              className="btn btn-success px-6 py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 mx-auto md:mx-0"
            >
              ➕ Add New User
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <UserList 
          onEditUser={handleEditUser}
          refreshTrigger={refreshTrigger}
        />
      </main>

      {showForm && (
        <UserForm
          user={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default App; 