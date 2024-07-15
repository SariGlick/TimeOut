// export default ProfileList;
import React, { useEffect, useState } from 'react';
import { getAllProfiles, getProfileById } from '../service/profile-service.ts';
// Define the Profile type
import Select from '../stories/Select/Select.jsx';
interface Website {
    _id: string;
    name: string;
    url: string;
}
type WebsiteStatus = 'block' | 'open' | 'limit';
type BlockedSitesStatus = 'black list' | 'white list';
interface ListWebsite {
    websiteId: Website;
    status: WebsiteStatus;
    limitedMinutes: number;
}
interface ProfileTime {
    start: Date;
    end: Date;
}
interface Profile {
    _id: string;
    userId: string;
    profileName: string;
    statusBlockedSites: BlockedSitesStatus;
    listWebsites: ListWebsite[];
    profileTime: ProfileTime[];
}
const ProfileList = () => {
    const [profiles, setProfiles] = useState<Profile[] | []>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileId = '6694feac0694af4103ed5dfb'; // כאן יש לשים את ה-ID המתאים
                const profileData = await getProfileById(profileId);
                // const profileData = await getAllProfiles();
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
        const selectedProfileId = event.target.value.value;
        const profile: Profile | undefined = profiles.find((p) => p._id === selectedProfileId);
        setSelectedProfile(profile ?? null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>Profile List</h1>
            <Select
                options={profiles.map(profile => ({ text: profile.profileName, value: profile._id }))}
                title="Select a profile..."
                onChange={handleProfileSelect}
                className="custom-select"
                widthOfSelect={200} // הוספת הפרמטר widthOfSelect
            />
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
                        <th>STATUS</th>
                        <th>FROM</th>
                        <th>TO</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedProfile?.listWebsites.map((profile) => (
                        <tr key={profile.websiteId._id}>
                            <td>{profile.websiteId.name}</td>
                            <td>{profile.websiteId.url}</td>
                            <td>{profile.status}</td>
                            <td>{profile.limitedMinutes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default ProfileList;
