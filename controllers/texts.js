// text.js

// הודעות כלשהן לתקשורת עם המשתמש
const messages = {

    // הודעות הצלחה
    success: {
        operationCompleted: "Operation completed successfully!",
        dataSaved: "Data saved successfully!",
        sendCodeToEmail: "We will send you a verification code to your email: ",
        addUser: 'User added successfully',
    },

    // הודעות שגיאה
    error: {
        // general: "An unexpected error occurred. Please try again later.",
        // network: "Network error. Please check your internet connection.",
        // validation: "Validation error. Please ensure all fields are filled out correctly.",
        // unauthorized: "You are not authorized to access this resource.",
        notFound: "Resource not found.",
        data: 'Unable to query database',
        googleError: 'Google login failed', 
        dataSave: 'Error saving user',
    },

    // הודעות אזהרה
    warning: {
        unsavedChanges: "You have unsaved changes. Are you sure you want to leave?",
        lowDiskSpace: "You are running low on disk space.",
    },
};

module.exports = messages;
