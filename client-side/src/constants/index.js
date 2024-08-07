const EMAIL_FREQUENCY_ENUM = {
  NEVER: 'never',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};
const MESSAGES = {
  SUCCESS_UPDATED_SETTINGS: 'Settings updated successfully!',
  ERROR_UPDATE_SETTINGS: 'Failed to update settings. Please try again.',
  INVALID_EMAIL_FREQUENCY: 'Invalid email frequency selected. Please choose a valid option.',
  CONFIRM_LOCATION: 'Allow us to get your location and preferred language for a better experience?',
  UNSUCCESS_UPLOAD_FILE_TYPE: 'Unsupported file type. Please upload an image (JPEG, PNG, GIF).!',
  UNSUCCESS_UPLOAD_FILE: 'error updating image',
  SUCCESS_UPDATED_SETTINGS: 'Settings updated successfully!',
};
const MAIN_TITLE = {
  SETTINGS:'Settings',
}

const TITLES = {
  SELECT_EMAIL_FREQUENCY: 'Select Email Frequency',
  SELECT_THEME: 'Select Theme',
};
const LABELS = {
  UPDATE_USER_SETTINGS: 'Update User Settings',
  SIGN_UP:'sign up',
  ADD_IMAGE: 'add image',
  UPLOAD_IMAGE: 'upload image',
  THEME: 'Theme',
};
const LANGUAGE = {
  en: 'english',
  he: 'עברית',
  es: 'española'
}
const TEHEMES = {
  LIGHT: 'light',
  DARK: 'dark',
}
const CONSTANTS = {
  EMAIL_FREQUENCY_ENUM,
  MESSAGES,
  MAIN_TITLE,
  TITLES,
  LABELS,
  LANGUAGE,
  TEHEMES,
};

export default CONSTANTS;