import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import Select from '../../stories/Select/Select.jsx';
import TableComponent from '../../stories/table/TableComponent.jsx';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';
import { updateProfileApi, getProfilesByUserId } from '../../services/profileService.js';
import { deleteWebsite, updateWebsite, createWebsite } from '../../services/websiteService.js';
import { useAppSelector } from '../../redux/store.jsx';
import { setProfiles, updateProfile, setSelectProfile } from '../../redux/profile/profile.slice.js';
import { selectProfile } from '../../redux/profile/profile.selector.js';
import Loader from '../../stories/loader/loader.jsx';
import AddProfileComponent from './addProfileComponent.jsx';
import UpdateProfileComponent from './updateProfileCpmponent.jsx';
import TimerActivationButton from './timerActivationButton.jsx';
import { extractWebsiteName, isValidURL, isWebsiteInProfile, getStatusOptions } from '../../utils/profileUtil.js';
import { TOAST_MESSAGES } from '../../constants/profileConstants.js';
import DownloadAsExcel from '../Report/downloadAsExcel.jsx';
import { PROFILE_LIST_MESSAGES, PROFILE_LIST_LOADING } from '../../constants/profileConstants.js';
import '../../styles/profilePageStyle.scss';

const ProfilePageComponent = ({ userId=''}) => {
  const dispatch = useDispatch();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [editRowId, setEditRowId] = useState(null);
  const [editedRows, setEditedRows] = useState(null);

  const profiles = useAppSelector(selectProfile);
  const statusOptions = selectedProfile ? getStatusOptions(selectedProfile.statusBlockedSites) : [];

  const fetchProfiles = async () => {
    try {
      const profileData = await getProfilesByUserId(userId);
      dispatch(setProfiles(profileData));
      setLoading(false);
    } catch (err) {
      enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_FROM_SERVER_ERROR} type="error" />);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfiles(userId);
    }
  }, [userId]);

  const handleProfileSelect = (event) => {
    if (profiles) {
      const selectedProfileId = event.target.value;
      const profile = profiles.find(profile => profile._id === selectedProfileId);
      setSelectedProfile(profile);
      dispatch(setSelectProfile(selectedProfile));
      setEditRowId(null);
      setEditedRows(null);
    }
    else
      enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_NOT_FOUND} type="error" />);
  };

  const handleDelete = async (id) => {
    const updatedWebsites = selectedProfile.listWebsites.filter(website => website.websiteId._id !== id);
    const profileToUpdate = {
      ...selectedProfile,
      listWebsites: updatedWebsites
    };
    try {
      await deleteWebsite(id);
      await updateProfileApi(selectedProfile._id, profileToUpdate);
      dispatch(updateProfile(profileToUpdate));
      setSelectedProfile(profileToUpdate);
      dispatch(setSelectProfile(selectedProfile));
      enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.WEBSITE_DELETE_SUCCESS} type="success" />);
    } catch (err) {
      enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.WEBSITE_DELETED_ERROR} type="error" />);
    }
  };

  const handleEdit = (id) => {
    setEditRowId(id);
    const website = selectedProfile.listWebsites.find(website => website.websiteId._id === id);
    setEditedRows({
      name: website.websiteId.name,
      url: website.websiteId.url,
      status: website.status,
      limitedMinutes: website.status === 'limit' ? website.limitedMinutes : 0,
    });
  };
  const handleSave = async (id) => {
    if (!selectedProfile || !editRowId || !editedRows) {
      enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.WEBSITE_UPDATED_ERROR} type="error" />);
      return;
    }
    if (editedRows.status === 'limit' && (editedRows.limitedMinutes === '' || (Number(editedRows.limitedMinutes) === 0))) {
      enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.WEBSITE_WITHOUT_TIME} type="error" />);
      return;
    }
    if ((editRowId === 'new') && (editedRows.url === '' || editedRows.status === '')) {
      enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.WEBSITE_SAVE_ERROR} type="error" />);
      return;
    }
    if (!isValidURL(editedRows.url)) {
      enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.INVALID_URL} type="error" />);
      return;
    }
    if (editRowId === 'new' && (isWebsiteInProfile(editedRows.url, selectedProfile))) {
      enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.WEBSITE_ALREADY_EXISTS} type="error" />);
      return;
    }

    let updatedWebsites;

    try {
      if (editRowId === 'new') {
        const response = await createWebsite({
          name: editedRows.name,
          url: editedRows.url
        });
        const newWebsiteId = response._id;

        const newWebsite = {
          websiteId: {
            _id: newWebsiteId,
            name: editedRows.name,
            url: editedRows.url
          },
          status: editedRows.status,
          limitedMinutes: editedRows.limitedMinutes
        };

        updatedWebsites = [...selectedProfile.listWebsites, newWebsite];
        enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.WEBSITE_CREATE_SUCCESS} type="success" />);
      } else {
        const websiteAfterUpdate = {
          websiteId: {
            _id: id,
            name: editedRows.name,
            url: editedRows.url,
          },
          status: editedRows.status,
          limitedMinutes: editedRows.limitedMinutes
        };

        updatedWebsites = selectedProfile.listWebsites.map(website =>
          website.websiteId._id === id ? websiteAfterUpdate : website
        );

        await updateWebsite(id, { name: editedRows.name, url: editedRows.url });
        enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.WEBSITE_UPDATED_SUCCESS} type="success" />);
      }

      const profileToUpdate = {
        ...selectedProfile,
        listWebsites: updatedWebsites
      };

      await updateProfileApi(selectedProfile._id, profileToUpdate);
      dispatch(updateProfile(profileToUpdate));
      setSelectedProfile(profileToUpdate);
      dispatch(setSelectProfile(selectedProfile));
      setEditRowId(null);
      setEditedRows(null);
    } catch (err) {
      enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.PROFILE_SAVE_ERROR} type="error" />);
    }
  };


  const handleCancel = () => {
    setEditRowId(null);
    setEditedRows(null);
  };

  const handleFieldChange = (e) => {
    const { value, name } = e.target;

    let updatedRows = { ...editedRows, [name]: value };

    switch (name) {
      case 'url':
        const websiteName = extractWebsiteName(value);
        updatedRows = { ...updatedRows, name: websiteName };
        break;

      case 'limitedMinutes':
        if (editedRows.status !== 'limit') {
          enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.CHANGE_BLOCK_OR_OPEN_TIME} type="error" />);
          return;
        }
        break;

      case 'status':
        if (value === 'open' || value === 'block') {
          updatedRows = { ...updatedRows, limitedMinutes: 0 };
        }
        break;

      default:
        break;
    }

    setEditedRows(updatedRows);
  };

  const handleAddRow = () => {
    setEditRowId('new');
    setEditedRows({
      name: '',
      url: '',
      status: '',
      limitedMinutes: 0,
    });
  };

  const actions = [
    { func: handleDelete, icon: DeleteIcon, label: 'delete', condition: (id) => id !== editRowId },
    { func: handleEdit, icon: EditIcon, label: 'edit', condition: (id) => id !== editRowId },
    { func: handleSave, icon: SaveIcon, label: 'save', condition: (id) => id === editRowId },
    { func: handleCancel, icon: CancelIcon, label: 'cancel', condition: (id) => id === editRowId },
  ];

  const generateTableData = (profile) => {
    if (!profile || !profile.listWebsites || profile.listWebsites.length === 0) {
      return {
        headers: ['name', 'url', 'status', 'limitedMinutes', 'Actions'],
        rows: editRowId === 'new' ? [{
          id: 'new',
          name: editedRows ? editedRows.name : '',
          url: editedRows ? editedRows.url : '',
          status: editedRows ? editedRows.status : '',
          limitedMinutes: (editedRows && editedRows.limitedMinutes === 0) ? '-' : (editedRows ? editedRows.limitedMinutes : ''),
          Actions: actions.filter(action => action.condition('new'))
        }] : []
      };
    }

    const websiteIdKeys = profile.listWebsites[0]?.websiteId ? Object.keys(profile.listWebsites[0].websiteId) : [];
    const headers = websiteIdKeys.filter(header => header !== '_id' && header !== '__v');
    headers.push('status', 'limitedMinutes', 'Actions');

    const rows = profile.listWebsites.map((website) => {
      const websiteId = website.websiteId || {};
      const isEditing = editRowId === websiteId._id;
      const row = {};

      headers.forEach((header) => {
        if (header in websiteId) {
          row[header] = isEditing && editedRows ? editedRows[header] : websiteId[header];
        } else if (header in website) {
          row[header] = isEditing && editedRows ? editedRows[header] : website[header];
        } else {
          row[header] = '';
        }
      });

      row.Actions = actions.filter(action => action.condition(websiteId._id));
      return { ...row, id: websiteId._id || website._id };
    });

    if (editRowId === 'new') {
      const newRow = { id: 'new' };
      headers.forEach(header => {
        newRow[header] = (header === 'limitedMinutes' && editedRows && editedRows[header] === 0) ? '-' : (editedRows ? editedRows[header] : '');
      });
      rows.push(newRow);
    }

    return { headers, rows };
  };

  const formatProfileDataForExcel = (profile) => {
  if (!profile || !profile.listWebsites || profile.listWebsites.length === 0) {
      return [];
  }

  const profileData = {
      'Profile Name': profile.profileName, 
      'Status Blocked Sites': profile.statusBlockedSites || '',
      'Start Time': profile.timeProfile?.start || '', 
      'End Time': profile.timeProfile?.end || '', 
      'Google Maps Enabled': profile.googleMapsLocation?.enabled ? 'Yes' : 'No', 
      'Google Maps Address': profile.googleMapsLocation?.location?.address || '', 
      'Google Maps Latitude': profile.googleMapsLocation?.location?.lat, 
      'Google Maps Longitude': profile.googleMapsLocation?.location?.lng,
      'Google Calendar Enabled': profile.googleCalendarEvents?.enabled ? 'Yes' : 'No',
      'Google Calendar ID': profile.googleCalendarEvents?.calendarId || '', 
      'Google Drive Enabled': profile.googleDriveFiles?.enabled ? 'Yes' : 'No', 
      'Google Drive Folder ID': profile.googleDriveFiles?.folderId || '', 
  };

  const websiteData = profile.listWebsites.map(website => ({
      'Website Name': website.websiteId?.name || '',
      'Website URL': website.websiteId?.url || '',
      'Website Status': website.status || '', 
      'Limited Minutes': website.limitedMinutes
  }));

  return [profileData, ...websiteData];
};

const formattedData = selectedProfile ? formatProfileDataForExcel(selectedProfile) : [];

  return (
    <div className="profile-list-container">
      <div className="profile-list-select-wrapper">
        <div className="component-add">
          <AddProfileComponent userId={userId} />
        </div>
        <Select
          options={profiles.map((profile) => ({ text: profile.profileName, value: profile._id }))}
          onChange={handleProfileSelect}
          className="profile-list-select"
        />
        {selectedProfile && (
          <div>
            <div className="component-update">
              <UpdateProfileComponent profile={selectedProfile} />
            </div>
            <div className="component-timer">
              <TimerActivationButton profileName={selectedProfile.profileName} />
            </div>
          </div>
        )}
      </div>
      {loading ? (
        <div className="profile-list-loading">
          <Loader />
          {PROFILE_LIST_LOADING}
        </div>
      ) : selectedProfile ? (
        <div className="profile-list-details">
          <h1>
            {PROFILE_LIST_MESSAGES.HELLO_SELECTED_PROFILE.replace("{profileName}", selectedProfile.profileName)}
            {PROFILE_LIST_MESSAGES.OPERATES_BETWEEN}
            <br />
          </h1>
          <h1 className='green_title'>{selectedProfile?.timeProfile?.start + " / " + selectedProfile?.timeProfile?.end}</h1>
          <h2>{PROFILE_LIST_MESSAGES.BELOW_SITES}</h2>
          <TableComponent
            dataObject={generateTableData(selectedProfile)}
            widthOfTable="80%"
            widthOfColums={[200, 300, 100, 150, 200]}
            actions={actions}
            editRowId={editRowId}
            handleFieldChange={handleFieldChange}
            statusOptions={statusOptions}
            addButton={true}
            handleAddRow={handleAddRow}
            pageSize={5}
          />
        </div>
      ) : (
        <div>
          <h1 className='green_title'>{PROFILE_LIST_MESSAGES.NO_PROFILE_SELECTED}</h1>
          <h2>{PROFILE_LIST_MESSAGES.PLEASE_SELECT_PROFILE}</h2>
        </div>
      )}
      {selectedProfile && (
        <div className="export-section">
          <DownloadAsExcel
            data={formattedData}
            sheetName={`${selectedProfile.profileName} Profile`}  
            fileName={`${selectedProfile.profileName}_profile.xlsx`} 
          />
        </div>
      )}
    </div>
  );
};
ProfilePageComponent.propTypes = {
  userId: PropTypes.string.isRequired,
};
export default ProfilePageComponent;