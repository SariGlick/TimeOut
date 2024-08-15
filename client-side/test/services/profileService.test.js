import {
    getAllProfiles,
    createProfile,
    getProfileById,
    updateProfileApi,
    getProfilesByUserId,
    deleteProfileApi
  } from '../../src/services/profileService';
  import { handleGet, handlePost, handlePut, handleDelete } from '../../src/axios/middleware';
  
  // Mock ה-API
  jest.mock('../../src/axios/middleware', () => ({
    handleGet: jest.fn(),
    handlePost: jest.fn(),
    handlePut: jest.fn(),
    handleDelete: jest.fn(),
  }));
  
  describe('Profile Service Functions', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      global.console.error = jest.fn();
      global.console.log = jest.fn();
    });
  
    it('should fetch all profiles successfully', async () => {
      handleGet.mockResolvedValue({
        data: [{ id: '1', name: 'Profile 1' }, { id: '2', name: 'Profile 2' }]
      });
  
      const profiles = await getAllProfiles();
  
      expect(handleGet).toHaveBeenCalledWith('/profiles');
      expect(profiles).toEqual([{ id: '1', name: 'Profile 1' }, { id: '2', name: 'Profile 2' }]);
    });
  
    it('should handle error when fetching all profiles', async () => {
      handleGet.mockRejectedValue(new Error('Network error'));
  
      await expect(getAllProfiles()).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalledWith('Error getting all profiles:', expect.any(Error));
    });
  
    it('should create a profile successfully', async () => {
      const profileData = { name: 'New Profile' };
      handlePost.mockResolvedValue({ data: { id: '3', ...profileData } });
  
      const profile = await createProfile(profileData);
  
      expect(handlePost).toHaveBeenCalledWith('/profiles', profileData);
      expect(profile).toEqual({ id: '3', name: 'New Profile' });
    });
  
    it('should handle error when creating a profile', async () => {
      const profileData = { name: 'New Profile' };
      handlePost.mockRejectedValue(new Error('Network error'));
  
      await expect(createProfile(profileData)).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalledWith('Error creating profile:', expect.any(Error));
    });
  
    it('should fetch a profile by ID successfully', async () => {
      handleGet.mockResolvedValue({
        data: { id: '1', name: 'Profile 1' }
      });
  
      const profile = await getProfileById('1');
  
      expect(handleGet).toHaveBeenCalledWith('/profiles/1');
      expect(profile).toEqual({ id: '1', name: 'Profile 1' });
    });
  
    it('should handle error when fetching a profile by ID', async () => {
      handleGet.mockRejectedValue(new Error('Network error'));
  
      await expect(getProfileById('1')).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalledWith('Error getting profile with id 1:', expect.any(Error));
    });
  
    it('should update a profile successfully', async () => {
      const profileData = { name: 'Updated Profile' };
      handlePut.mockResolvedValue({
        data: { id: '1', ...profileData }
      });
  
      const profile = await updateProfileApi('1', profileData);
  
      expect(handlePut).toHaveBeenCalledWith('/profiles/1', profileData);
      expect(profile).toEqual({ id: '1', name: 'Updated Profile' });
    });
  
    it('should handle error when updating a profile', async () => {
      const profileData = { name: 'Updated Profile' };
      handlePut.mockRejectedValue(new Error('Network error'));
  
      await expect(updateProfileApi('1', profileData)).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalledWith('Error updating profile with id 1:', expect.any(Error));
    });
  
    it('should fetch profiles by user ID successfully', async () => {
      handleGet.mockResolvedValue({
        data: [{ id: '1', name: 'User Profile 1' }]
      });
  
      const profiles = await getProfilesByUserId('user1');
  
      expect(handleGet).toHaveBeenCalledWith('/profiles/user/user1');
      expect(profiles).toEqual([{ id: '1', name: 'User Profile 1' }]);
    });
  
    it('should handle error when fetching profiles by user ID', async () => {
      handleGet.mockRejectedValue(new Error('Network error'));
  
      await expect(getProfilesByUserId('user1')).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalledWith('Error getting profiles for user user1:', expect.any(Error));
    });
  
    it('should delete a profile successfully', async () => {
      handleDelete.mockResolvedValue({
        data: { success: true }
      });
  
      const response = await deleteProfileApi('1');
  
      expect(handleDelete).toHaveBeenCalledWith('/profiles/1');
      expect(response).toEqual({ success: true });
    });
  
    it('should handle error when deleting a profile', async () => {
      handleDelete.mockRejectedValue(new Error('Network error'));
  
      await expect(deleteProfileApi('1')).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalledWith('Error deleting profile with id 1:', expect.any(Error));
    });
  });
  