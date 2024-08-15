import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import Select from '../../stories/Select/Select.jsx';
import TableComponent from '../../stories/table/TableComponent.jsx';
import ToastMessage from '../../stories/Toast/ToastMessage.jsx';
import { updateProfileApi, getProfilesByUserId } from '../../services/profileService.js';
import { deleteWebsite, updateWebsite, createWebsite } from '../../services/websiteService.js';
import { useAppSelector } from '../../redux/store.jsx';
import { setProfiles, updateProfile } from '../../redux/profile/profile.slice.js';
import { selectProfile } from '../../redux/profile/profile.selector.js';
import Loader from '../../stories/loader/loader.jsx';
import AddProfileComponent from './addProfileComponent.jsx';
import UpdateProfileComponent from './updateProfileCpmponent.jsx';
import TimerActivationButton from './timerActivationButton.jsx';
import { extractWebsiteName, isValidURL, isWebsiteInProfile, getStatusOptions } from '../../utils/profileUtil.js';
import { TOAST_MESSAGES } from '../../constants/profileConstants.js';
import '../../styles/profilePageStyle.scss';

const ProfilePageComponent = ({ userId }) => {
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
      //const userId = '6698da056e5c07ebd3c11ec1';
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
  }, [dispatch, userId]);


  const handleProfileSelect = (event) => {
    const selectedProfileId = event.target.value;
    const profile = profiles.find(profile => profile._id === selectedProfileId);
    setSelectedProfile(profile);
    setEditRowId(null);
    setEditedRows(null);
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
      await deleteWebsite(id);
      await updateProfileApi(selectedProfile._id, profileToUpdate);
      dispatch(updateProfile(profileToUpdate));
      setSelectedProfile(profileToUpdate);
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
    if (editedRows.status === 'limit' && (editedRows.limitedMinutes === '' || editedRows.limitedMinutes === 0)) {
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
    if (editedRows.id === 'new' && (isWebsiteInProfile(editedRows.url, selectedProfile))) {
      enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.WEBSITE_ALREADY_EXISTS} type="error" />);
      return;
    }

    let updatedWebsites;
    if (editRowId === 'new') {
      try {
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
      } catch (err) {
        enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.WEBSITE_WITHOUT_TIME} type="error" />);
        return;
      }
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
    }

    const profileToUpdate = {
      ...selectedProfile,
      listWebsites: updatedWebsites
    };

    try {
      if (editRowId !== 'new') {
        await updateWebsite(id, { name: editedRows.name, url: editedRows.url });
        enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.WEBSITE_UPDATED_SUCCESS} type="success" />);
      }
      await updateProfileApi(selectedProfile._id, profileToUpdate);
      dispatch(updateProfile(profileToUpdate));
      setSelectedProfile(profileToUpdate);
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

    if (name === 'url') {
      const websiteName = extractWebsiteName(value);
      updatedRows = { ...updatedRows, name: websiteName };
    }

    if (name === 'limitedMinutes' && editedRows.status !== 'limit') {
      enqueueSnackbar(<ToastMessage message={TOAST_MESSAGES.CHANGE_BLOCK_OR_OPEN_TIME} type="error" />);
      return;
    }

    if (name === 'status' && (value === 'open' || value === 'block')) {
      updatedRows = { ...updatedRows, limitedMinutes: 0 };
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
        {selectedProfile &&
          <div >
            <div className="component-update">
              <UpdateProfileComponent profile={selectedProfile} />
            </div>
            <div className="component-timer">
              <TimerActivationButton profileName={selectedProfile.profileName}/>
            </div>
          </div>}
      </div>
      {loading ? (
        <div className="profile-list-loading"><Loader /></div>
      ) : selectedProfile ? (
        <div className="profile-list-details">
          <h1>
            Hello! You have selected your {selectedProfile.profileName} profile that
            operates between <br />

          </h1>
          <h1 className='green_title'>{selectedProfile?.timeProfile?.start + " / " + selectedProfile?.timeProfile?.end}</h1>
          <h2>Below are the sites that your profile contains:</h2>
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
          <h1 className='green_title'>No profile selected</h1>
          <h2>Please select a profile</h2>
        </div>
      )}

    </div>
  );
};
export default ProfilePageComponent;
