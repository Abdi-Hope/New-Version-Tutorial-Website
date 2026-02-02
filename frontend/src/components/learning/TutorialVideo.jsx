import React, { useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { DownloadLesson } from '../offline'; // This should be from offline, not progress
import { CourseProgress } from '../progress'; // This is from progress
import { NoteTaking } from '../notes';
import { NotesProvider } from '../../context/NotesContext';

const TutorialVideo = ({ 
  videoUrl, 
  title, 
  description,
  lessonContent = "This is the lesson content that students can highlight and take notes on...",
  lessonId = "lesson-123",
  courseId = "course-456"
}) => {
  const [showNotes, setShowNotes] = useState(false);
  const { setCurrentLesson, play, pause } = usePlayer();
  
  const handleVideoClick = () => {
    setCurrentLesson({
      id: lessonId,
      title: title,
      videoUrl: videoUrl,
      thumbnail: "https://via.placeholder.com/300x200",
      duration: "38:45"
    }, courseId);
  };

  const handlePlay = () => {
    play();
    handleVideoClick();
  };

  const handlePause = () => {
    pause();
  };

  return (
    <NotesProvider>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-black rounded-xl overflow-hidden shadow-lg mb-6">
            <div className="aspect-video relative">
              <video
                controls
                className="w-full h-full"
                src={videoUrl}
                title={title}
                onClick={handleVideoClick}
              >
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={handlePlay}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                  aria-label="Play video"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={handlePause}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                  aria-label="Pause video"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h1>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNotes(!showNotes)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {showNotes ? 'Hide Notes' : 'Take Notes'}
                </button>
                <button
                  onClick={handlePlay}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Play in Player
                </button>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              {description}
            </p>
          </div>

          {showNotes && (
            <div className="mb-8">
              <NoteTaking
                lessonContent={lessonContent}
                lessonId={lessonId}
                lessonTitle={title}
              />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <DownloadLesson 
            lessonId={lessonId}
            title={title}
            size="850 MB"
            duration="38:45"
          />
          
          <CourseProgress 
            progress={0.65}
            totalLessons={24}
            completedLessons={15}
          />
        </div>
      </div>
    </NotesProvider>
  );
};

export default TutorialVideo;
