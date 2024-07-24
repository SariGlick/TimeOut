const EMAIL_FREQUENCY_ENUM = {
  NEVER: 'never',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};
const MESSAGES = {
  EMAIL_FREQUENCY_UPDATED: 'Email frequency preference updated successfully!',
  EMAIL_FREQUENCY_UPDATE_ERROR: 'Error updating email frequency preference. Please try again later.',
  INVALID_EMAIL_FREQUENCY: 'Invalid email frequency selected. Please choose a valid option.',
};

const TITLES = {
  SELECT_EMAIL_FREQUENCY: 'Select Email Frequency',
};
const LABELS = {
  UPDATE_USER_SETTINGS: 'Update User Settings',
};
const CONSTANTS = {
  EMAIL_FREQUENCY_ENUM,
  MESSAGES,
  TITLES,
  LABELS,
};

export default CONSTANTS;