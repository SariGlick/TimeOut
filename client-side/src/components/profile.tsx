import React, { useEffect, useState } from 'react';
import { getAllProfiles, getProfileById } from '../service/profile-service.ts';
// Define the Profile type
interface Profile {
    _id: string;
    userId: string;
    profileName: string;
    blockedSites: string[];
    limitedWebsites: {
        websiteId: string;
        status: 'block' | 'open';
        limitedTimes: {
            start: Date;
            end: Date;
        }[];
    }[];
}
const ProfileList = () => {
    const [profiles, setProfiles] = useState<Profile[] | []>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileId = '6693906f0aa956f960770e63'; // כאן יש לשים את ה-ID המתאים
                const profileData = await getProfileById(profileId);
                console.log("Fetched profile:", profileData);
                setProfiles([profileData]); // שם את הפרופיל במערך כדי שנוכל להשתמש ב-map
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch profile:', err);
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);
    const handleProfileSelect = (event) => {
        const selectedProfileId = event.target.value;
        const profile: Profile | undefined = profiles.find((p) => p._id === selectedProfileId);
        setSelectedProfile(profile ?? null);
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>Profile List</h1>
            <select onChange={handleProfileSelect}>
                <option value="">Select a profile...</option>
                {profiles.map((profile) => (
                    <option key={profile._id} value={profile._id}>
                        {profile.profileName}
                    </option>
                ))}
            </select>
            {selectedProfile && (
                <div>
                    <h2>Selected Profile Details</h2>
                    <p>Profile Name: {selectedProfile.profileName}</p>
                </div>
            )}
            <h2>Profile Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>SITE</th>
                        <th>STATE</th>
                        <th>FROM</th>
                        <th>TO</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles.map((profile) => (
                        <tr key={profile._id}>
                            <td>{profile.limitedWebsites.SITE}</td>
                            <td>{profile.limitedWebsites.STATE}</td>
                            <td>{profile.limitedWebsites.FROM}</td>
                            <td>{profile.limitedWebsites.TO}</td>
                         
                            {/* <td>{profile.blockedSites ? profile.blockedSites.join(', ') : 'No data'}</td>
                            <td>{profile.limitedWebsites ? profile.limitedWebsites.join(', ') : 'No data'}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default ProfileList;