import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './addPostStyle.css';
import uploadImg from './Images/upload.svg';
import background from './Images/bg.mp4';

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
      <video autoPlay loop muted className="bg-video">
        <source src={background} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <h1>Add Post</h1>
          <div className="row">
            <div className="col-half">
              <div className="form-group">
                <div className="label-input-group">
                  <label htmlFor="postDescription">Post Description:</label>
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
              <div className="form-group">
                <div className="label-input-group">
                  <label htmlFor="imageInput">Add Images:</label>
                  <input
                    id="imageInput"
                    type="file"
                    multiple
                    accept="image/jpeg"
                    onChange={handleImageChange}
                    className="input-field1"
                    style={{ display: 'none' }}
                  />
                  <button type="button" className="custom-file-button1" onClick={() => document.getElementById('imageInput').click()}>
                    <img src={uploadImg} alt="Upload" className="upload-icon" /> Choose File
                  </button>
                  {imageFileNames.length > 0 && (
                    <div>Selected Images: {imageFileNames.join(', ')}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-half">
              <div className="form-group">
                <div className="label-input-group">
                  <label htmlFor="videoInput">Add Videos:</label>
                  <input
                    id="videoInput"
                    type="file"
                    multiple
                    accept="video/mp4"
                    onChange={handleVideoChange}
                    className="input-field2"
                    style={{ display: 'none' }}
                  />
                  <button type="button" className="custom-file-button2" onClick={() => document.getElementById('videoInput').click()}>
                    <img src={uploadImg} alt="Upload" className="upload-icon" /> Choose File
                  </button>
                  {videoFileNames.length > 0 && (
                    <div>Selected Videos: {videoFileNames.join(', ')}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-half">
              <button type="submit" className="btn btn-primary">Add Post</button>
              <a href="/viewPost" className="btn btn-danger">Back</a>
            </div>
            <div className="col-half">
              {error && <div className="error-message">{error}</div>}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPost;
