import React, { useEffect, useState } from 'react';
import { getAllProfiles } from '../services/profileService.tsx';

// // Define the Profile type
// interface Profile {
//     _id: string;
//     userId: string;
//     profileName: string;
//     blockedSites: string[];
//     limitedWebsites: {
//         websiteId: string;
//         status: 'block' | 'open';
//         limitedTimes: {
//             start: Date;
//             end: Date;
//         }[];
//     }[];
// }
export interface Website {
    _id: string;
    name: string;
    url: string;
  }
  
  export interface LimitedTime {
    start: Date;
    end: Date;
  }
  
  export interface LimitedWebsite {
    websiteId: Website;
    status: 'block' | 'open';
    limitedTimes: LimitedTime[];
  }
  
  export interface Profile {
    _id: string;
    userId: string;
    profileName: string;
    blockedSites: Website[];
    limitedWebsites: LimitedWebsite[];
  }
  
const ProfileList = () => {
    const [profiles, setProfiles] = useState<Profile[] | []>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getAllProfiles();
                console.log("Fetched profile:", profileData);
                setProfiles(profileData); // מניח ש-getAllProfiles מחזיר מערך של פרופילים
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch profile:', err);
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleProfileSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProfileId = event.target.value;
        const profile: Profile | undefined = profiles.find((p) => p._id === selectedProfileId);
        setSelectedProfile(profile ?? null); // מבטיח שהערך יהיה או פרופיל או null
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
                    {selectedProfile?.limitedWebsites.map((profile) => (
                        <tr key={profile.websiteId._id}>
                            <td>{profile.websiteId.name}</td>
                            <td>{profile.blockedSites ? profile.blockedSites.join(', ') : 'No data'}</td>
                            <td>
                                {profile.limitedWebsites.map((website) => (
                                    <div key={website.websiteId}>
                                        {website.websiteId}: {website.status}
                                        {website.limitedTimes.map((time, index) => (
                                            <div key={index}>
                                                {time.start.toLocaleTimeString()} - {time.end.toLocaleTimeString()}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProfileList;
// import React, { useEffect, useState } from 'react';
// import { getAllProfiles} from '../services/profileService.tsx';
// import { deleteWebsite } from '../services/webSiteService.tsx';

// // Define the Profile and Website types
// interface Profile {
//     _id: string;
//     userId: string;
//     profileName: string;
//     blockedSites: string[];
//     limitedWebsites: {
//         websiteId: string;
//         status: 'block' | 'open';
//         limitedTimes: {
//             start: Date;
//             end: Date;
//         }[];
//     }[];
// }

// const ProfileList = () => {
//     const [profiles, setProfiles] = useState<Profile[] | []>([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const profileData = await getAllProfiles();
//                 console.log("Fetched profile:", profileData);
//                 setProfiles(profileData); // מניח ש-getAllProfiles מחזיר מערך של פרופילים
//                 setLoading(false);
//             } catch (err) {
//                 console.error('Failed to fetch profile:', err);
//                 setLoading(false);
//             }
//         };
//         fetchProfile();
//     }, []);

//     const handleProfileSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         const selectedProfileId = event.target.value;
//         const profile: Profile | undefined = profiles.find((p) => p._id === selectedProfileId);
//         setSelectedProfile(profile ?? null); // מבטיח שהערך יהיה או פרופיל או null
//     };

//     const handleDeleteWebsite = async (profileId: string, websiteId: string) => {
//         try {
//             await deleteWebsite(websiteId);
//             const updatedProfiles = profiles.map(profile =>
//                 profile._id === profileId
//                     ? {
//                         ...profile,
//                         blockedSites: profile.blockedSites.filter(siteId => siteId !== websiteId),
//                         limitedWebsites: profile.limitedWebsites.filter(website => website.websiteId !== websiteId)
//                     }
//                     : profile
//             );
//             setProfiles(updatedProfiles);
//             if (selectedProfile && selectedProfile._id === profileId) {
//                 setSelectedProfile(updatedProfiles.find(p => p._id === profileId) ?? null);
//             }
//         } catch (err) {
//             console.error('Failed to delete website:', err);
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h1>Profile List</h1>
//             <select onChange={handleProfileSelect}>
//                 <option value="">Select a profile...</option>
//                 {profiles.map((profile) => (
//                     <option key={profile._id} value={profile._id}>
//                         {profile.profileName}
//                     </option>
//                 ))}
//             </select>

//             {selectedProfile && (
//                 <div>
//                     <h2>Selected Profile Details</h2>
//                     <p>Profile Name: {selectedProfile.profileName}</p>
//                 </div>
//             )}

//             <h2>Profile Table</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>SITE</th>
//                         <th>STATE</th>
//                         <th>FROM</th>
//                         <th>TO</th>
//                         <th>ACTION</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {selectedProfile?.blockedSites.map((siteId, index) => (
//                         <tr key={index}>
//                             <td>{siteId}</td>
//                             <td>Blocked</td>
//                             <td colSpan={2}>N/A</td>
//                             <td>
//                                 <button onClick={() => handleDeleteWebsite(selectedProfile._id, siteId)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                     {selectedProfile?.limitedWebsites.map((website, index) => (
//                         <tr key={index}>
//                             <td>{website.websiteId}</td>
//                             <td>{website.status}</td>
//                             <td>{website.limitedTimes[0]?.start.toLocaleTimeString() || ''}</td>
//                             <td>{website.limitedTimes[0]?.end.toLocaleTimeString() || ''}</td>
//                             <td>
//                                 <button onClick={() => handleDeleteWebsite(selectedProfile._id, website.websiteId)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ProfileList;

