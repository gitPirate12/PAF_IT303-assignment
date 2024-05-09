import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import uploadImg from './Images/upload.svg';

function AddPost() {
  const [postDescription, setPostDescription] = useState('');
  const [postImages, setPostImages] = useState([]);
  const [postVideos, setPostVideos] = useState([]);
  const [imageFileNames, setImageFileNames] = useState([]);
  const [videoFileNames, setVideoFileNames] = useState([]);
  const [error, setError] = useState(null);

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
        text: 'You can only upload a maximum of 3 images or videos.'
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
        text: 'Post created successfully!'
      });
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to create post'
      });
    }
  };

  return (
    <>
      <div className="add-post-container">
        <form onSubmit={handleSubmit} className="add-post-form">
          <h1 className="add-post-title">Add Post</h1>
          <div className="post-description">
            <div className="input-group">
              <label htmlFor="postDescription" className="input-label">Post Description:</label>
              <input
                id="postDescription"
                type="text"
                placeholder="Post Description"
                value={postDescription}
                onChange={handleDescriptionChange}
                className="input-field"
              />
            </div>
          </div>
          <div className="add-images">
            <div className="input-group">
              <label htmlFor="imageInput" className="input-label">Add Images:</label>
              <input
                id="imageInput"
                type="file"
                multiple
                accept="image/jpeg"
                onChange={handleImageChange}
                className="input-field"
              />
              <button type="button" className="choose-file-button" onClick={() => document.getElementById('imageInput').click()}>
                <img src={uploadImg} alt="Upload" className="upload-icon" /> Choose File
              </button>
              {imageFileNames.length > 0 && (
                <div className="selected-files">Selected Images: {imageFileNames.join(', ')}</div>
              )}
            </div>
          </div>
          <div className="add-videos">
            <div className="input-group">
              <label htmlFor="videoInput" className="input-label">Add Videos:</label>
              <input
                id="videoInput"
                type="file"
                multiple
                accept="video/mp4"
                onChange={handleVideoChange}
                className="input-field"
              />
              <button type="button" className="choose-file-button" onClick={() => document.getElementById('videoInput').click()}>
                <img src={uploadImg} alt="Upload" className="upload-icon" /> Choose File
              </button>
              {videoFileNames.length > 0 && (
                <div className="selected-files">Selected Videos: {videoFileNames.join(', ')}</div>
              )}
            </div>
          </div>
          <div className="submit-buttons">
            <button type="submit" className="submit-button">Add Post</button>
            <a href="/viewPost" className="back-button">Back</a>
          </div>
          <div className="error-message">{error && <div>{error}</div>}</div>
        </form>
      </div>
    </>
  );
}

export default AddPost;
