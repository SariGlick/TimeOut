import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { updateProfileApi, getProfilesByUserId } from '../../services/profileService.js';
import { deleteWebsite, updateWebsite } from '../../services/websiteService.js';
import { useAppSelector } from '../../redux/store.jsx';
import { setProfiles, updateProfile } from '../../redux/profile/profile.slice.js';
import { selectProfile } from '../../redux/profile/profile.selector.js';

import { Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';

import Select from '../../stories/Select/Select.jsx';
import TableComponent from '../../stories/table/TableComponent.jsx';
import Loader from '../../stories/loader/loader.jsx';

import AddProfileComponent from './addProfileComponent.jsx';
import UpdateProfileComponent from './updateProfileCpmponent.jsx';
import ProfileActivationTimer from './profileActivationComponent.jsx';

import '../../styles/profilePageStyle.scss';

const ProfilePageComponent = ({userId}) => {
  const dispatch = useDispatch();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editRowId, setEditRowId] = useState(null);
  const [editedRows, setEditedRows] = useState(null);
  const [time, setTime] = useState(0);
  const profiles = useAppSelector(selectProfile);
  const navigate = useNavigate();
  
  const fetchProfiles = async () => {
    try {
      const profileData = await getProfilesByUserId(userId);
      dispatch(setProfiles(profileData));
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch profiles:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfiles(userId);
    }
  }, [dispatch, userId]);

  const handleProfileSelect = (event) => {
    const selectedProfileId = event.target.value;
    const profile = profiles.find(profile => profile._id === selectedProfileId);
    setSelectedProfile(profile);
    setEditRowId(null);
    setEditedRows(null);

    const start = parseTimeStringToDate(profile.timeProfile.start);
    const end = parseTimeStringToDate(profile.timeProfile.end);
    const durationMinutes = (end - start) / 1000 / 60;
    if (durationMinutes >= 0) {
      setTime(durationMinutes);
    } else {
      setTime(durationMinutes * -1);
    }

  };

  function parseTimeStringToDate(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  const handleDelete = async (id) => {
    const updatedWebsites = selectedProfile.listWebsites.filter(website => website.websiteId._id !== id);
    const profileToUpdate = {
      ...selectedProfile,
      listWebsites: updatedWebsites
    };
    try {
      deleteWebsite(id)
      await updateProfileApi(selectedProfile._id, profileToUpdate);
      dispatch(updateProfile(profileToUpdate));
      setSelectedProfile(profileToUpdate);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleEdit = (id) => {
    setEditRowId(id);
    const website = selectedProfile.listWebsites.find(website => website.websiteId._id === id);
    setEditedRows({
      name: website.websiteId.name,
      url: website.websiteId.url,
      status: website.status,
      limitedMinutes: website.status === 'limit' ? website.limitedMinutes : '-',
    });
  };

  const handleSave = async (id) => {
    if (!selectedProfile || !editRowId || !editedRows) return;

    const websiteAfterUpdate = {
      websiteId: {
        _id: id,
        name: editedRows.name,
        url: editedRows.url,
      },
      status: selectedProfile.listWebsites.find(website => website.websiteId._id === id).status,
      limitedMinutes: selectedProfile.listWebsites.find(website => website.websiteId._id === id).status === 'limit' ? editedRows.limitedMinutes : selectedProfile.listWebsites.find(website => website.websiteId._id === id).limitedMinutes,
    };

    const updatedWebsites = selectedProfile.listWebsites.map(website =>
      website.websiteId._id === id ? websiteAfterUpdate : website
    );

    const profileToUpdate = {
      ...selectedProfile,
      listWebsites: updatedWebsites
    };

    try {
      await updateWebsite(id, { name: editedRows.name, url: editedRows.url });
      await updateProfileApi(selectedProfile._id, profileToUpdate);
      dispatch(updateProfile(profileToUpdate));
      setSelectedProfile(profileToUpdate);
      setEditRowId(null);
      setEditedRows(null);
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditedRows(null);
  };

  const handleFieldChange = (e, id) => {
    const { value, name } = e.target;
    if (name === 'status' && editRowId === id) {
      return;
    }
    if (name === 'limitedMinutes' && selectedProfile.listWebsites.find(website => website.websiteId._id === id).status !== 'limit') {
      return;
    }
    setEditedRows({
      ...editedRows,
      [name]: value
    });
  };

  const handleProfileUpdated = async (updatedProfile) => {
    dispatch(updateProfile(updatedProfile));
    navigate(0);
    await fetchProfiles();
    setSelectedProfile(updatedProfile);
  };

  const actions = [
    { func: handleDelete, icon: DeleteIcon, label: 'delete', condition: (id) => id !== editRowId },
    { func: handleEdit, icon: EditIcon, label: 'edit', condition: (id) => id !== editRowId },
    { func: handleSave, icon: SaveIcon, label: 'save', condition: (id) => id === editRowId },
    { func: handleCancel, icon: CancelIcon, label: 'cancel', condition: (id) => id === editRowId },
  ];

  const generateTableData = (profile) => {
    if (!profile || !profile.listWebsites || profile.listWebsites.length === 0) {
      return { headers: [], rows: [] };
    }
    const rows = profile.listWebsites
      .filter(website => website && website.websiteId)
      .map(website => ({
        id: website.websiteId ? website.websiteId._id : '',
        name: (editRowId === website.websiteId._id && editedRows) ? editedRows.name : website.websiteId.name,
        url: (editRowId === website.websiteId._id && editedRows) ? editedRows.url : website.websiteId.url,
        status: website.status || '',
        limitedMinutes: (editRowId === website.websiteId._id && editedRows)
          ? (editedRows.limitedMinutes === 0 ? '-' : editedRows.limitedMinutes)
          : (website.limitedMinutes === 0 ? '-' : website.limitedMinutes),
        Actions: 'Actions',
      }));

    return {
      headers: ['name', 'url', 'status', 'limitedMinutes', 'Actions'],
      rows: rows,
    };
  };


  return (
    <div className="profile-list-container">
      <div className="profile-list-select-wrapper">
        <div className="component-add">
          <AddProfileComponent  userId={userId}/>
        </div>
        <Select
          options={profiles.map((profile) => ({ text: profile.profileName, value: profile._id }))}
          onChange={handleProfileSelect}
          className="profile-list-select"
        />



        {time !== 0 &&
          <div className='timer'>
            <ProfileActivationTimer profileActivationTime={time} />
          </div>}
        {selectedProfile &&
          <div className="component-update">
            <UpdateProfileComponent profile={selectedProfile} onProfileUpdated={handleProfileUpdated} />
          </div>}
      </div>
      {loading ? (
        <div className="profile-list-loading"><Loader /> </div>
      ) : selectedProfile ? (
        <div className="profile-list-details">
          <h1>
            Hello! You have selected your {selectedProfile.profileName} profile that
            operates between <br />
            {selectedProfile?.timeProfile?.start + " / " + selectedProfile?.timeProfile?.end}
            . Below are the sites that your profile contains:
          </h1>
          <TableComponent
            dataObject={generateTableData(selectedProfile)}
            widthOfTable="80%"
            widthOfColums={[200, 300, 100, 150, 200]}
            actions={actions}
            editRowId={editRowId}
            handleFieldChange={handleFieldChange}
            className="profile-list-table"
          />
        </div>
      ) : (
        <h1>No profile selected</h1>
      )}
    </div>
  );
};
export default ProfilePageComponent;
