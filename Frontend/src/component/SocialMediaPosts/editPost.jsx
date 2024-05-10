import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField, Button, IconButton, Typography, Grid } from '@mui/material';
import { MdAddAPhoto } from 'react-icons/md';
import { RiVideoAddFill } from 'react-icons/ri';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './editPost.css';
import Bg5 from './Images/Bg5.jpg';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#333', // Change this to the color you want
    },
  },
});

function EditPost() {
  const [postId, setPostId] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [error, setError] = useState(null);
  const [imageFileNames, setImageFileNames] = useState([]);
  const [videoFileName, setVideoFileName] = useState('');
  const videoInputRef = useRef(null);

  useEffect(() => {
    // Apply background image to body when component mounts
    document.body.style.backgroundImage = `url(${Bg5})`;
    document.body.style.backgroundSize = '100% 140%';
    document.body.style.backgroundPosition = 'center top';
    document.body.style.backgroundRepeat = 'no-repeat';

    // Clean up function to remove background image when component unmounts
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  useEffect(() => {
    // Extract post ID from URL
    const postIdFromURL = window.location.pathname.split('/')[2];
    setPostId(postIdFromURL);
  }, []);

  const handleDescriptionChange = (event) => {
    setPostDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImageFiles(files);
    const names = files.map(file => file.name);
    setImageFileNames(names);
  };

  const handleVideoChange = (event) => {
    setVideoFile(event.target.files[0]);
    setVideoFileName(event.target.files[0].name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('postDescription', postDescription);
    imageFiles.forEach(file => {
      formData.append('postImages', file);
    });
    if (videoFile) {
      formData.append('postVideos', videoFile);
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/socialMediaPost/${postId}`, formData, {
        withCredentials: true,
      });
      console.log('Post updated:', response.data);
      setError(null);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Post updated successfully!'
      });
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Failed to update post');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update post'
      });
    }
  };

  const handleBackButtonClick = () => {
    window.location.href = '/home'; // Redirect to '/home' route
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <div className="add-post-container">
            <Typography variant="h4" gutterBottom style={{ color: '#000' }}>Edit Post</Typography>
            <form onSubmit={handleSubmit} className="add-post-form">
              <TextField
                id="postDescription"
                label="Post Description"
                placeholder="Post Description"
                value={postDescription}
                onChange={handleDescriptionChange}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                InputProps={{
                  style: {
                    borderColor: '#333',
                  },
                  onFocus: (e) => {
                    e.target.parentNode.style.borderColor = '#333';
                  },
                  onBlur: (e) => {
                    e.target.parentNode.style.borderColor = '';
                  },
                }}
              />
              <label htmlFor="imageInput">
                <IconButton color="primary" component="span">
                  <MdAddAPhoto style={{ color: '#000' }} /> 
                </IconButton>
              </label>
              <input
                id="imageInput"
                type="file"
                multiple
                accept="image/jpeg"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              {imageFileNames.length > 0 && (
                <div className="selected-files">Selected Images: {imageFileNames.length > 0 && (
                  <Typography variant="body1" style={{ fontFamily: 'Roboto' }}>
                    Selected Images: {imageFileNames.join(', ')}
                  </Typography>
                )}</div>
              )}
              <label htmlFor="videoInput">
                <IconButton color="primary" component="span">
                  <RiVideoAddFill style={{ color: '#000' }} /> 
                </IconButton>
              </label>
              <input
                id="videoInput"
                type="file"
                accept="video/mp4"
                onChange={handleVideoChange}
                style={{ display: 'none' }}
              />
              {videoFileName && (
                <div className="selected-files">Selected Video: {videoFileName}</div>
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ backgroundColor: '#000', color: '#fff', margin: '10px 0', borderRadius: '0', minWidth: '120px' }}
              >
                Update Post
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleBackButtonClick}
                style={{ color: '#000', margin: '10px 10px 10px 0', borderRadius: '0', minWidth: '120px', borderColor: '#000' }}
              >
                Back
              </Button>
              {error && <div className="error-message">{error}</div>}
            </form>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default EditPost;
