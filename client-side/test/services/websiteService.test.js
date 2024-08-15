import {
    getAllWebsites,
    getWebsiteById,
    createWebsite,
    updateWebsite,
    deleteWebsite
  } from '../../src/services/websiteService';
  import { handleGet, handlePost, handlePut, handleDelete } from '../../src/axios/middleware';

  jest.mock('../../src/axios/middleware', () => ({
    handleGet: jest.fn(),
    handlePost: jest.fn(),
    handlePut: jest.fn(),
    handleDelete: jest.fn(),
  }));
  
  describe('Website Service Functions', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      global.console.error = jest.fn();
    });
  
    it('should fetch all websites successfully', async () => {
      handleGet.mockResolvedValue({
        data: [{ id: '1', url: 'https://example.com' }, { id: '2', url: 'https://example.org' }]
      });
  
      const websites = await getAllWebsites();
  
      expect(handleGet).toHaveBeenCalledWith('/websites');
      expect(websites).toEqual([{ id: '1', url: 'https://example.com' }, { id: '2', url: 'https://example.org' }]);
    });
  
    it('should handle error when fetching all websites', async () => {
      handleGet.mockRejectedValue(new Error('Network error'));
  
      await expect(getAllWebsites()).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalledWith('Error getting all websites:', expect.any(Error));
    });
  
    it('should fetch a website by ID successfully', async () => {
      handleGet.mockResolvedValue({
        data: { id: '1', url: 'https://example.com' }
      });
  
      const website = await getWebsiteById('1');
  
      expect(handleGet).toHaveBeenCalledWith('/websites/1');
      expect(website).toEqual({ id: '1', url: 'https://example.com' });
    });
  
    it('should handle error when fetching a website by ID', async () => {
      handleGet.mockRejectedValue(new Error('Network error'));
  
      await expect(getWebsiteById('1')).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalledWith('Error getting website with id 1:', expect.any(Error));
    });
  
    it('should create a website successfully', async () => {
      const websiteData = { url: 'https://newwebsite.com' };
      handlePost.mockResolvedValue({ data: { id: '3', ...websiteData } });
  
      const website = await createWebsite(websiteData);
  
      expect(handlePost).toHaveBeenCalledWith('/websites', websiteData);
      expect(website).toEqual({ id: '3', url: 'https://newwebsite.com' });
    });
  
    it('should handle error when creating a website', async () => {
      const websiteData = { url: 'https://newwebsite.com' };
      handlePost.mockRejectedValue(new Error('Network error'));
  
      await expect(createWebsite(websiteData)).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalledWith('Error creating website:', expect.any(Error));
    });
  
    it('should update a website successfully', async () => {
      const websiteData = { url: 'https://updatedwebsite.com' };
      handlePut.mockResolvedValue({
        data: { id: '1', ...websiteData }
      });
  
      const website = await updateWebsite('1', websiteData);
  
      expect(handlePut).toHaveBeenCalledWith('/websites/1', websiteData);
      expect(website).toEqual({ id: '1', url: 'https://updatedwebsite.com' });
    });
  
    it('should handle error when updating a website', async () => {
      const websiteData = { url: 'https://updatedwebsite.com' };
      handlePut.mockRejectedValue(new Error('Network error'));
  
      await expect(updateWebsite('1', websiteData)).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalledWith('Error updating website with id 1:', expect.any(Error));
    });
  
    it('should delete a website successfully', async () => {
      handleDelete.mockResolvedValue({
        data: { success: true }
      });
  
      const response = await deleteWebsite('1');
  
      expect(handleDelete).toHaveBeenCalledWith('/websites/1');
      expect(response).toEqual({ success: true });
    });
  
    it('should handle error when deleting a website', async () => {
      handleDelete.mockRejectedValue(new Error('Network error'));
  
      await expect(deleteWebsite('1')).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalledWith('Error deleting website with id 1:', expect.any(Error));
    });
  });
  