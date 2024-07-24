import React from 'react';


const staticUser = {
    "_id": "669f86c302f253ec5a6f5162",
    "name": "Test-User",
    "email": "testuser@example.com",
    "password": "$2b$10$IlUR0EDO.Eu8O4K8BgaFfeXWgeLxdZ6WSw0GXBWm7XZDZ1ouQmdeC",
    "formatedDate": "yyyy-MM-dd",
    "profileImage": "profile.jpg",
    "visitsWebsites": [],
    "profiles": [],
    "preferences": [{
        "emailFrequency": "never",
        "sendNotificationTime": 20,
        "soundVoice": "mmm.mp3",
        "_id": "66a0b3c52dd0dde7df269f6a",
        "__v": 0
    }]
};

const UserProfile = () => {
  return (
    <div>
      <h2>User Profile</h2>
      <img src={staticUser.profileImage} alt={`${staticUser.name}'s profile`} />
      <p><strong>Name:</strong> {staticUser.name}</p>
      <p><strong>Email:</strong> {staticUser.email}</p>
      <p><strong>Google ID:</strong> {staticUser.googleId}</p>
      <p><strong>Formatted Date:</strong> {staticUser.formatedDate}</p>
      <p><strong>Visited Websites:</strong> {staticUser.visitsWebsites.join(', ')}</p>
      <p><strong>Profiles:</strong> {staticUser.profiles.join(', ')}</p>
      <p><strong>Preferences:</strong> {staticUser.preferences.join(', ')}</p>
    </div>
  );
};

export default UserProfile;
