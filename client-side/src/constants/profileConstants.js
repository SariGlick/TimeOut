
export const INPUT_LABELS = {
    PROFILE_NAME: 'Profile Name',
    TIME_START: 'Time Start',
    TIME_END: 'Time End',
    STATUS_BLOCKED_SITES: 'Status Blocked Sites',
    WEBSITE_NAME: 'Website Name',
    URL: 'URL',
    STATUS: 'status',
    LIMIT_MINUTES: 'Limit Minutes'
};

export const TOOLTIP_TEXTS = {
    ADD_WEBSITE: 'Add Website',
    WEBSITE_NAME: 'This field is optional',
    URL: 'Enter the URL of the website',
    STATUS: 'Select the site mode',
    LIMIT_MINUTES: 'Enter the number of minutes limited to the website',
    CANCEL: 'Cancel',
    SAVE: 'Save',
    EDIT_PROFILE: 'Edit Profile',
    PROFILE_NAME: 'Profile Name',
    TIME_START: 'Start Time',
    TIME_END: 'End Time',
    STATUS_BLOCKED_SITES: 'Blocked Sites Status',
    DELETE_PROFILE: 'Delete Profile',
    DELETE: 'Delete',
    CONFIRM_DELETE: 'Are you sure you want to delete this profile?',
    FORM_NOT_FILLED: 'The button is disabled because not all fields are filled.',
};

export const SELECT_OPTIONS = {
    STATUS_BLOCKED_SITES: [
        { label: 'Black List',text: 'Black List', value: 'black list' },
        { label: 'White List', text: 'White List',  value: 'white list' }
    ],
    WEBSITE_STATUS_BLOCK: [
        { text: 'open', value: 'open' },
        { text: 'limit', value: 'limit' },
    ],
    WEBSITE_STATUS_OPEN: [
        { text: 'limit', value: 'limit' },
        { text: 'block', value: 'block' }
    ]
};

export const BUTTON_LABELS = {
    EDIT_PROFILE: 'Edit Profile',
    ADD_WEBSITE: 'Add Website',
    CANCEL: 'Cancel',
    DELETE_PROFILE: 'Delete Profile',
    SAVE: 'Save',
    DELETE: 'Delete',
    ADDING: 'Adding'

};

export const DIALOG_TITLES = {
    ADD_PROFILE: 'Add a new profile',
    EDIT_PROFILE: 'Edit Profile',
    PROFILE_TIME:' Enter profile start time and profile end time',
    CREATE_FORM:'  To create a new profile please enter the required data.',
    NEW_PROFILE:'New profile',
    STATUS_LIST:'Choose a white/black list to set how the sites are blocked.'
};

export const TOAST_MESSAGES = {
    PROFILE_UPDATED_SUCCESS: 'Profile updated successfully!',
    PROFILE_UPDATED_ERROR: 'Error updating profile!',
    PROFILE_DELETED_SUCCESS: 'Profile deleted successfully!',
    PROFILE_DELETED_ERROR: 'Error deleting profile!',
    TYPE_LIST_CHANGE_ERROR: 'You cannot change the list type after adding URLs.',
    PROFILE_CREATE_ERROR: 'Error creating profile',
    PROFILE_CREATE_SUCCESS: 'Success creating profile',


};

export const VALIDATE_MESSAGES = {
    PROFILE_NAME_SHORT: 'Name must be at least 2 characters long.',
    PROFILE_NAME_LONG: 'Name cannot be more than 50 characters long.'
};
