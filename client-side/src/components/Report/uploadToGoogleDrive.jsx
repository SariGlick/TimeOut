import { useGoogleLogin } from '@react-oauth/google';
import GenericButton from '../../stories/Button/GenericButton';
import { FILE_DETAILS, URLS, MESSAGES, BUTTON_LABELS } from '../../constants/googleDriveConstants';
import { handlePost } from '../../axios/middleware';

const UploadToGoogleDrive = () => {
    const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    const login = useGoogleLogin({
        clientId: CLIENT_ID,
        onSuccess: async (tokenResponse) => {
            const accessToken = tokenResponse.access_token;

            const fileData = new Blob([FILE_DETAILS.content], { type: FILE_DETAILS.mimeType });

            const form = new FormData();
            form.append('metadata', new Blob([JSON.stringify({ name: FILE_DETAILS.name, mimeType: FILE_DETAILS.mimeType })], { type: 'application/json' }));
            form.append('file', fileData);

            try {
                const response = await handlePost(
                    URLS.uploadUrl,
                    form,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'multipart/related',
                        },
                    }
                );
                console.log('File uploaded successfully:', response);
            } catch (error) {
                console.error(MESSAGES.uploadError, error);
            }
        },
        onError: error => console.error(MESSAGES.loginFailed, error)
    });

    return (
        <div>
            <GenericButton
                label={BUTTON_LABELS.upload}
                onClick={login}
                className="uploadButton"
                size="large"
            />
        </div>
    );
};

export default UploadToGoogleDrive;

