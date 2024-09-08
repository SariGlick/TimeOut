export const BUTTON_LABELS = {
    upload: 'Upload to Google Drive',
    signIn: 'Sign in with Google',
    signOut: 'Sign out',
};

export const FILE_DETAILS = {
    name: 'yourfile.txt',
    mimeType: 'text/plain',
    content: 'Hello, world!',
};

export const URLS = {
    uploadUrl: 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
};

export const MESSAGES = {
    loginFailed: 'Login failed:',
    uploadError: 'Error uploading file:',
    signInError: 'Error signing in:',
    signOutError: 'Error signing out:',
    gapiInitError: 'Error initializing GAPI client:',
    gapiSignInSuccess: 'Successfully signed in',
    gapiClientInitialized: 'GAPI client initialized',
};

export const GOOGLE_API = {
    clientId: '1074410346984-b9bsnokpb84s4afiim9t9d797k6orsvk.apps.googleusercontent.com',
    scopes: 'https://www.googleapis.com/auth/drive.file',
    prompt: 'select_account',
};
