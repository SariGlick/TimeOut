import React from 'react';
import GoogleDriveUploader from './googleDriveUploader';
import UploadToGoogleDrive from './uploadToGoogleDrive';

const ManagerGoogleDrive = () => {
    const fileContent = "Hello, world!";
    const fileName = 'yourfile.txt';
    const fileMimeType = 'text/plain';

    return (
        <div>
            <UploadToGoogleDrive
                fileContent={fileContent}
                fileName={fileName}
                fileMimeType={fileMimeType}
            />
            <GoogleDriveUploader />
        </div>
    );
};

export default ManagerGoogleDrive;
