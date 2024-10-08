"use client";

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs'; // Clerk's useUser hook
import Sidebar from "@/components/dashboard/Sidebar"; // Assuming you have this Sidebar component
import Navbar from "@/components/dashboard/DashboardNavbar";

const UserSettings: React.FC = () => {
  const { user } = useUser(); // Fetch user details using Clerk
  const [newEmail, setNewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangeEmail = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Changing email to:', newEmail);
    // Here, implement the logic for changing email.
    setNewEmail('');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Changing password');
    // Implement the logic for password change.
    setOldPassword('');
    setNewPassword('');
  };

  const handleDeleteAccount = () => {
    console.log('Deleting account');
    // Implement account deletion logic here.
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Navbar />
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-black mb-6">User Settings</h1>

        {/* User Information */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow">
          <h2 className="text-xl font-semibold mb-4 text-black">User Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-black">Name</p>
              <p className="font-medium text-black">{user?.fullName || 'Anonymous User'}</p> {/* Fetching name from Clerk */}
            </div>
            <div>
              <p className="text-black">Email</p>
              <p className="font-medium text-black">{user?.emailAddresses[0]?.emailAddress || 'No Email'}</p> {/* Fetching email from Clerk */}
            </div>
          </div>
        </div>

        {/* Change Email Section */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-black">Change Email</h2>
          <form onSubmit={handleChangeEmail}>
            <div className="mb-4">
              <label className="block text-black mb-2" htmlFor="newEmail">New Email</label>
              <input
                type="email"
                id="newEmail"
                className="w-full p-2 border rounded"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Change Email
            </button>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-black">Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <div className="mb-4">
              <label className="block text-black mb-2" htmlFor="oldPassword">Old Password</label>
              <input
                type="password"
                id="oldPassword"
                className="w-full p-2 border rounded"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-2" htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                className="w-full p-2 border rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Change Password
            </button>
          </form>
        </div>

        {/* Delete Account Section */}
        <div className="text-center">
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Delete My Account
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Deleting your account will erase all the information uploaded to Vivo.
          </p>
        </div>
      </main>
    </div>
  );
};

export default UserSettings;