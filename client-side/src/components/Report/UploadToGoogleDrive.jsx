import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import GenericButton from '../../stories/Button/GenericButton';  // עדכני את הנתיב לפי המקום שבו נמצא הקובץ

const UploadToGoogleDrive = () => {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const accessToken = tokenResponse.access_token;

            const fileData = new Blob(["Hello, world!"], { type: "text/plain" });

            const metadata = {
                name: 'yourfile.txt',
                mimeType: 'text/plain',
            };

            const form = new FormData();
            form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            form.append('file', fileData);

            try {
                const response = await axios.post(
                    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
                    form,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'multipart/related',
                        },
                    }
                );
                console.log('File uploaded:', response.data);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        },
        onError: error => console.error('Login failed:', error)
    });

    return (
        <div>
            <GenericButton
                label="Upload to Google Drive"
                onClick={() => login()}
                className="uploadButton"
                size="large" 
            />
        </div>
    );
};

export default UploadToGoogleDrive;
