import { useState, useEffect } from 'react';
import adminService from '../services/admin.service';

export const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminService.fetchUsers(params);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const createUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminService.createNewUser(userData);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const updateUser = async (id, userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminService.updateUser(id, userData);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminService.deleteUser(id);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const fetchCourses = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminService.fetchCourses(params);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const createCourse = async (courseData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminService.createNewCourse(courseData);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const updateCourse = async (id, courseData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminService.updateCourse(id, courseData);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const deleteCourse = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminService.deleteCourse(id);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return {
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
  };
};
