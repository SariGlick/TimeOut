import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createProfile } from '../services/profileService.js'
import GenericButton from '../stories/Button/GenericButton.jsx';
import GenericInput from '../stories/GenericInput/genericInput.jsx';
import Select from '../stories/Select/Select.jsx';
import './profileScss.scss'
import { createWebsite } from '../services/websiteService.js';
import {addProfile} from '../redux/profile/profile.slice.js'
import { useAppDispatch } from '../redux/store.jsx';
 import Tooltip from '@mui/material/Tooltip';
export default function AddProfile() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: '',
    timeStart: '00:00',
    timeEnd: '00:00',
    status: '', // white = true black = false
    url: '',
    urlTimeLimit: 0,
    urlStatus: ''
  });
  const [arrUrl, setArrUrl] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setData({ ...data,   name: '',
      timeStart: '00:00',
      timeEnd: '00:00',
      status: '',
      url: '',
      urlTimeLimit: 0,
      urlStatus: '' }); // איפוס שדה ה-URL
    setArrUrl([]);
    setOpen(false);
  };
  const options = {
    black: [
      { text: 'open', value: 'open' },
      { text: 'limit', value: 'limit' }
    ],
    white: [
      { text: 'blocked', value: 'blocked' },
      { text: 'limit', value: 'limit' }
    ]
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const adjustedName = ['limit', 'open', 'blocked'].includes(value) ? 'urlStatus' : name;
    setData(prevData => ({
      ...prevData,
      [adjustedName]: value
    }));
   
  };
  const handleAddUrl = async (event) => {
    try {
      const parsedUrl = new URL(data.url);
      const dataWebsites = {
        name: parsedUrl.hostname,
        url: data.url
      };
      // בדיקה אם ה-URL כבר קיים במערך
      if (arrUrl.some(item => item.url === data.url)) {
        alert("URL already exists in the list.");
        return;
      }
      const newWebsites = await createWebsite(dataWebsites);
      setArrUrl([{id:newWebsites._id, url: data.url, urlStatus: data.urlStatus, urlTimeLimit: data.urlTimeLimit }, ...arrUrl]);
      setData({ ...data,url:'', urlStatus: '', urlTimeLimit: 0}); // איפוס שדה ה-URL
    }
    catch (e) {
      console.error('Invalid URL:', e);
      return null;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = '669df26ef8a111309dc9e862'; // יש להחליף את ה-userId במשתמש הנוכחי
    const profileData = {
      userId: userId,
      profileName: data.name,
      statusBlockedSites: data.status === 'true' ? 'white list' : 'black list',
      listWebsites: arrUrl.map(url => ({
        websiteId: url.id,
        status: url.urlStatus === 'blocked' ? 'block' : url.urlStatus,
        limitedMinutes: url.urlStatus === 'limit' ? url.urlTimeLimit : 0,
      })),
      timeProfile: {
        start: data.timeStart,
        end:data.timeEnd,
      }
    };
   
    try {
       await createProfile(profileData);
      dispatch(addProfile(profileData))
      handleClose();
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}  className="profile-list-button">
        Add a new profile
      </Button>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>New profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new profile please enter the profile name.
          </DialogContentText>
          <GenericInput
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            size='small'
            width='300px'
            label={"name"}
            />
          <br />
          <input
            type="time"
            name="timeStart"
            value={data.timeStart}
            onChange={handleChange}
            className='custom-time-input'
          />
          <input
            type="time"
            name="timeEnd"
            value={data.timeEnd}
            onChange={handleChange}
            className='custom-time-input'
          />
          <br />
          <br />
          <div>
            <input type='radio' className="custom-radio" name='status' value={true} checked={data.status === 'true'} onChange={handleChange}></input>
            <label className="custom-label">white list</label>
            <br />
            <input type='radio' className="custom-radio" name='status' value={false} checked={data.status === 'false'} onChange={handleChange}></input>
            <label className="custom-label">black list</label>
            <br /><br /> <br />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
              <GenericInput
              name='url'
              size='small'
              type='text'
              value={data.url}
              onChange={handleChange}
              width='200px'
              label={"url"}
                 />
              <Select
                size="small"
                widthOfSelect={'150px'}
                options={data.status === 'true' ? options.white : options.black}
                value={data.urlStatus}
                onChange={handleChange}
                title='Site Status'
                className='urlStatus'
              />
              {data.urlStatus === 'limit' ? (
               <GenericInput
               name="urlTimeLimit"
               type='number'
               onChange={handleChange}
               value={data.urlTimeLimit}
               size='small'
               width='80px'
               label={"Time"}
               min={0}
                />
              ) : null}
              <GenericButton label='add url' size='medium' className='' onClick={handleAddUrl} disabled={!data.url || !data.urlStatus} />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleClose}>Cancel</Button>
        {(!data.name || !data.status) ? (
            <Tooltip title="The button is disabled because not all fields are filled.">
              <span>
              <Button color='success' type="submit" disabled={!data.name || !data.status}>adding</Button>
              </span>
            </Tooltip>
          ) : (
            <Button color='success' type="submit">adding</Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}