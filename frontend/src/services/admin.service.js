import { adminApi } from '../api/admin';

export const adminService = {
  // User Management
  fetchUsers: async (params = {}) => {
    try {
      const response = await adminApi.getUsers(params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createNewUser: async (userData) => {
    try {
      const response = await adminApi.createUser(userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    try {
      const response = await adminApi.updateUser(id, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await adminApi.deleteUser(id);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Course Management
  fetchCourses: async (params = {}) => {
    try {
      const response = await adminApi.getCourses(params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createNewCourse: async (courseData) => {
    try {
      const response = await adminApi.createCourse(courseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCourse: async (id, courseData) => {
    try {
      const response = await adminApi.updateCourse(id, courseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteCourse: async (id) => {
    try {
      const response = await adminApi.deleteCourse(id);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default adminService;
