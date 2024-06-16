import React, { useEffect, useState, useRef } from 'react';
import { CATEGORY_API } from '../Common/apiConfig';
import api from '../Common/api';

const VideoPlayer = ({ open, handleClose, messages }) => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [userProfileData, setUserProfileData] = useState({});
  const [autoplay, setAutoplay] = useState(false);

  const videoRef = useRef(null);

  const videoContainerStyle = {
    position: 'fixed',
    top: '15%',
    left: '63%',
    transform: 'translate(-50%, -50%)',
    width: '133px',
    height: '133px',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#add8e6',
    zIndex: 1000,
  };

  const videoStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  };

  const closeIconStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    color: 'white',
    zIndex: 1001,
  };

  // Function to fetch user profile data
  const getUserProfileData = () => {
    const url = `${CATEGORY_API.GET_USER_PROFILE}`;
    api
      .get(url)
      .then(response => {
        console.log("get user Profile in chatbot", response.data);
        setUserProfileData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Fetch user profile data on component mount
  useEffect(() => {
    getUserProfileData();
  }, []);

  // Handle video generation
  const handleGenerateVideo = async () => {
    try {
      const apiBody = {
        userInfo: {
          user_id: userProfileData.publicId,
          name: userProfileData.name,
          email: userProfileData.email,
          role: userProfileData.role,
        },
        paragraph: "", // You can pass paragraph data if needed
      };

      const response = await fetch('http://127.0.0.1:5000/generate_video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiBody),
      });

      if (!response.ok) {
        throw new Error('Failed to generate video');
      }

      const videoBlob = await response.blob();
      const videoUrl = URL.createObjectURL(videoBlob);
      setVideoSrc(videoUrl);

      // Autoplay the video if a bot message is received
      if (messages.some(message => message.sender === 'bot')) {
        setAutoplay(true);
      }

    } catch (error) {
      console.error('Error generating video:', error);
    }
  };

  // Trigger video generation when component is opened or messages change
  useEffect(() => {
    if (open) {
      handleGenerateVideo();
    }
  }, [open, messages]);

  // Autoplay video when autoplay state changes
  useEffect(() => {
    if (autoplay && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
  }, [autoplay]);

  // Reset autoplay state after video finishes playing
  const handleVideoEnded = () => {
    setAutoplay(false);
  };

  if (!open) {
    return null;
  }

  return (
    <div style={videoContainerStyle}>
      <video ref={videoRef} src={videoSrc} controls autoPlay={false} onEnded={handleVideoEnded} style={videoStyle} />
    </div>
  );
};

export default VideoPlayer;
