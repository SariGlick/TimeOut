
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
    CONFIRM_DELETE: 'Are you sure you want to delete this profile?'
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
    CONFIRM_DELETION: 'Confirm Deletion',
    PROFILE_TIME:' Enter profile start time and profile end time',
    CREATE_FORM:'  To create a new profile please enter the required data.',
    NEW_PROFILE:'New profile',
    ADD_WEBSITE:'Enter the URL of the site you want to add, select a site status and add to your list of sites',
    STATUS_LIST:'Choose a white/black list to set how the sites are blocked.'
};

export const TOAST_MESSAGES = {
    PROFILE_UPDATED_SUCCESS: 'Profile updated successfully!',
    PROFILE_UPDATED_ERROR: 'Error updating profile!',
    PROFILE_DELETED_SUCCESS: 'Profile deleted successfully!',
    PROFILE_DELETED_ERROR: 'Error deleting profile!',
    PROFILE_FROM_SERVER_ERROR: 'An error occurred in fetching the data from the server!',
    TYPE_LIST_CHANGE_ERROR: 'You cannot change the list type after adding URLs.',
    WEBSITE_DELETED_ERROR: 'Error deleting webSite!',
    WEBSITE_WITHOUT_TIME: 'It is not possible to set a limited site without time!',
    WEBSITE_UPDATED_ERROR: 'Error updating website!',
    WEBSITE_CREATE_ERROR: 'Error creating new website!',
    PROFILE_SAVE_ERROR: 'Error saving profile!',
    WEBSITE_SAVE_ERROR: 'Not all mandatory fields are filled!',
    WEBSITE_DELETE_SUCCESS:'Website deleted successfully!',
    WEBSITE_UPDATED_SUCCESS: 'The site has been successfully update!',
    CHANGE_BLOCK_OR_OPEN_TIME: 'There is no time setting on a blocked or open site!',
    WEBSITE_ALREADY_EXISTS:'The URL already exists in this profile',
    INVALID_URL:'The URL is invalid!',
};

export const VALIDATE_MESSAGES = {
    PROFILE_NAME_SHORT: 'Name must be at least 2 characters long.',
    PROFILE_NAME_LONG: 'Name cannot be more than 50 characters long.',
    UPDATE_NAME_LENGHT:'Profile name must be between 2 and 25 characters',
    TIME_START:'Start time is a mandatory field',
    TIME_END:'End time is a mandatory field',
};

export const CONSOLE_MESSAGES = {
    PROFILE_CREATE_ERROR: 'Error creating profile:',
};

export const TOOLTIP_MESSAGES = {
    FORM_NOT_FILLED: 'The button is disabled because not all fields are filled.',
};
