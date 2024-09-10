
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
  MESSAGES_COUNT:'Messages Count',
  INBOX_MESSAGES:'Inbox messages'
};

const TITLES = {
  SELECT_EMAIL_FREQUENCY: 'Select Email Frequency',
  MESSAGE_BOX: 'Message Box',
  MESSAGES_INBOX:'Messages Inbox'
};

const MESSAGES = {
  SUCCESS_UPDATED_SETTINGS: 'Settings updated successfully!',
  ERROR_UPDATE_SETTINGS: 'Failed to update settings. Please try again.',
  INVALID_EMAIL_FREQUENCY: 'Invalid email frequency selected. Please choose a valid option.',
  CONFIRM_LOCATION: 'Allow us to get your location and preferred language for a better experience?',
};


const MESSAGE_DISPLAY_ENUM = [
  { value: 'TITLE_ONLY', label: 'title only' },
  { value: 'ABBREVIATED_MESSAGE', label: 'abbreviated message'},
  { value: 'FULL_MESSAGES', label: 'full messages' },
];

const INBOX_ENUM = [
  { value: ' GROUP_BY_DATE', label: 'group by date' },
  { value: 'GROUP_BY_READ', label: 'group by read' },
  { value: 'GROUP_BY_UNREAD', label: 'group by unread' },
];
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
  MESSAGE_DISPLAY_ENUM,
  EMAIL_FREQUENCY_ENUM,
  MESSAGES,
  TITLES,
  LABELS,
  LANGUAGE,
  DATE_FORMATS,
  INBOX_ENUM
};

export default CONSTANTS;

