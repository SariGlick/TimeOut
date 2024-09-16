const LABELS = {
  SEND_PREFERENCE: 'send preferences',
  CHANGE_RINGTONE: 'change-ringtone',
  SELECT_LANGUAGES: 'select language',
  CHANGE_NOTIFICATION_TIME: 'change-notification-time',
  ACCOUNT: 'account',
  NOTIFICATIONS: 'Notifications',
  DISPLAY_SETTING: 'display-setting',
  PREFERENCE: 'Preference',
  MESSAGE: 'Message',
  UPDATE: 'Update',
  SELECT_TIME_ZONE:'Select Time Zone',
  SELECT_DATE_FORMAT:'select date format',
  DISPLAY_INCOME_MESSAGES:'Display notification for income messages',
  DISPLAY_BROWSING_TIME_LIMIT:'Display browsing time limit notification',
  UPLOAD_IMAGE:'upload-image'
};
const TITLES = {
  SELECT_EMAIL_FREQUENCY: 'Select Email Frequency',
};
const MESSAGES = {
  SUCCESS_UPDATED_SETTINGS: 'Settings updated successfully!',
  ERROR_UPDATE_SETTINGS: 'Failed to update settings. Please try again.',
  ERROR_UPDATE_USER:'failed update user please try again ',
  INVALID_EMAIL_FREQUENCY: 'Invalid email frequency selected. Please choose a valid option.',
  CONFIRM_LOCATION: 'Allow us to get your location and preferred language for a better experience?',
};
const EMAIL_FREQUENCY_ENUM = {
  NEVER: 'never',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};
const LANGUAGE = {
  he: {
    text: 'עברית',
    icon: 'https://cdn.pixabay.com/photo/2013/07/13/14/15/israel-162325_640.png'
  },
  en: {
    text: 'English',
    icon: 'https://cdn.pixabay.com/photo/2017/01/07/16/55/usa-1960922_640.jpg'
  },
  es: {
    text: 'Español',
    icon: 'https://cdn.pixabay.com/photo/2013/07/13/14/17/spain-162428_640.png'
  }
};
const DATE_FORMATS = [
  { value: 'MM-DD-YYYY', label: 'MM-DD-YYYY' },
  { value: 'DD-MM-YYYY', label: 'DD-MM-YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
];

const CONSTANTS = {
  EMAIL_FREQUENCY_ENUM,
  MESSAGES,
  TITLES,
  LABELS,
  LANGUAGE,
  DATE_FORMATS
};

export default CONSTANTS;

