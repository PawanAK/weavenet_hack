import React from 'react';
import Header from '../components/Header';

const Profile = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-background pt-16">
        <h2 className="text-4xl font-bold mb-8 text-secondary">Your Profile</h2>
        <p className="text-lg mb-4 text-accent">Manage your account and view your activity.</p>
      </div>
    </div>
  );
};

export default Profile;