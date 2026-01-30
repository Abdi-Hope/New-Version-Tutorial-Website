import React from 'react';
import { useParams } from 'react-router-dom';
import { CoursePlayer } from '../../components/player';

const CoursePlayerPage = () => {
  const { courseId } = useParams();
  
  // In real app, fetch course data based on courseId
  const courseData = {
    title: 'Advanced React Development',
    description: 'Master modern React with hooks, context, and advanced patterns'
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CoursePlayer 
        courseId={courseId}
        courseTitle={courseData.title}
        lessonTitle="Introduction to React Hooks"
      />
    </div>
  );
};

export default CoursePlayerPage;
