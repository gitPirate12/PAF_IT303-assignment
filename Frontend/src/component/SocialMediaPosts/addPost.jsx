import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, Grid, IconButton } from '@mui/material';
import { AddCircleOutline, ArrowBack } from '@mui/icons-material';
import { MdAddAPhoto } from 'react-icons/md';
import { RiVideoAddFill } from 'react-icons/ri';
import axios from 'axios';
import Swal from 'sweetalert2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import addPostBg from './Images/Bg2.jpg';
import './addPost.css';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#333', // Change this to the color you want
    },
  },
});

function AddPost() {
  const [postDescription, setPostDescription] = useState('');
  const [postImages, setPostImages] = useState([]);
  const [postVideos, setPostVideos] = useState([]);
  const [imageFileNames, setImageFileNames] = useState([]);
  const [videoFileNames, setVideoFileNames] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Apply background image to body when component mounts
    document.body.style.backgroundImage = `url(${addPostBg})`;
    document.body.style.backgroundSize = '100% 140%';
    document.body.style.backgroundPosition = 'center top';
    document.body.style.backgroundRepeat = 'no-repeat';

    // Clean up function to remove background image when component unmounts
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  const handleDescriptionChange = (event) => {
    setPostDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setPostImages(files);
    const names = files.map(file => file.name);
    setImageFileNames(names);
  };

  const handleVideoChange = (event) => {
    const files = Array.from(event.target.files);
    setPostVideos(files);
    const names = files.map(file => file.name);
    setVideoFileNames(names);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the total number of images and videos exceeds 3
    if (postImages.length + postVideos.length > 3) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You can only upload a maximum of 3 images or videos.',
        customClass: {
          confirmButton: 'swal-confirm-button' // Apply custom inline styles to the confirm button
        }
      });
      return;
    }

    // Check if the post description, images, or videos are empty
    if (!postDescription.trim() || postImages.length === 0 || postVideos.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields (description, image, video).',
        customClass: {
          confirmButton: 'swal-confirm-button' // Apply custom inline styles to the confirm button
        }
      });
      return;
    }

    const formData = new FormData();
    formData.append('postDescription', postDescription);
    formData.append('likeCount', 0);

    for (let i = 0; i < postImages.length; i++) {
      formData.append('postImages', postImages[i]);
      formData.append('imageFileNames', postImages[i].name);
    }

    for (let i = 0; i < postVideos.length; i++) {
      formData.append('postVideos', postVideos[i]);
      formData.append('videoFileNames', postVideos[i].name);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/socialMediaPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // Include credentials (cookies) in the request
      });
      console.log('Post created:', response.data);
      setPostDescription('');
      setPostImages([]);
      setPostVideos([]);
      setError(null);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Post created successfully!',
        customClass: {
          confirmButton: 'swal-confirm-button' // Apply custom inline styles to the confirm button
        }
      });
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to create post',
        customClass: {
          confirmButton: 'swal-confirm-button' // Apply custom inline styles to the confirm button
        }
      });
    }
  };

  const handleBackButtonClick = () => {
    window.location.href = '/home'; // Redirect to '/home' route
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <div className="add-post-container">
          <Typography variant="h4" gutterBottom style={{ color: '#000' }}>Add Post</Typography>
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
                  borderColor: '#333', // Change outline color to dark grey
                },
                onFocus: (e) => {
                  e.target.parentNode.style.borderColor = '#333'; // Change outline color to dark grey when focused
                },
                onBlur: (e) => {
                  e.target.parentNode.style.borderColor = ''; // Reset outline color when focus is lost
                },
              }}
            />

            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="videoInput">
                  <IconButton color="primary" component="span">
                    <RiVideoAddFill style={{ color: '#000' }} /> 
                  </IconButton>
                </label>
                <input
                  id="videoInput"
                  type="file"
                  multiple
                  accept="video/mp4"
                  onChange={handleVideoChange}
                  style={{ display: 'none' }}
                />
                {videoFileNames.length > 0 && (
                  <div className="selected-files">Selected Videos: {videoFileNames.length > 0 && (
                    <Typography variant="body1" style={{ fontFamily: 'Roboto' }}>
                      Selected Videos: {videoFileNames.join(', ')}
                    </Typography>
                  )}</div>
                )}
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<AddCircleOutline />}
              style={{ backgroundColor: '#000', color: '#fff', margin: '10px 0', borderRadius: '0', minWidth: '120px' }}
            >
              Add Post
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ArrowBack />}
              onClick={handleBackButtonClick}
              style={{ color: '#000', margin: '10px 10px 10px 0', borderRadius: '0', minWidth: '120px', borderColor: '#000' }}
            >
              Back
            </Button>
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
      </Container>
      {/* Inline style tag for custom button styles */}
      <style jsx>{`
        .swal-confirm-button {
          background-color: black !important;
          color: white !important;
          box-shadow: none !important; // Remove the default box-shadow
        }

        .swal-confirm-button:hover {
          background-color: #555 !important; // Change this to the color you want on hover
        }
      `}</style>
    </ThemeProvider>
  );
}

export default AddPost;
