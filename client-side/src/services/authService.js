import { setCurrentUser } from '../redux/auth/auth.slice';
import { MESSAGES } from '../constants';
import { login } from './userService';

export const userLogin = async (user, robotPass, setError, setIsNotExists, setSubmitting, dispatch, localization, navigate) => {
    try {
      if (!robotPass) {
        if (setError) setError(MESSAGES.RECAPTCHA_ERROR);
        if (setIsNotExists) setIsNotExists(true);
        return;
      }
      if (setError) setError(null);
      const loginResponse = await login(user);
      const userData = loginResponse;
      localStorage.setItem('userId', userData._id);
      dispatch(setCurrentUser(userData));
      localization.changeLanguage(userData.preference.language);
      navigate('/home');
    } catch (error) {
      if (setError) {
        if (error.response) {
          if (error.response.status === 401) {
            setError(MESSAGES.INVALID_EMAIL_PASSWORD);
          } else {
            setError(MESSAGES.UNEXPECTED_ERROR);
          }
        } else if (error.request) {
          setError(MESSAGES.NETWORK_ERROR);
        } else {
          setError(MESSAGES.UNEXPECTED_ERROR);
        }
      }
      if (setIsNotExists) setIsNotExists(true);
    } finally {
      if (setSubmitting) setSubmitting(false);
    }
  };
  