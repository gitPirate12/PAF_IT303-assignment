import React, { useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import './addPostStyle.css';
import uploadImg from './Images/upload.svg';
import background from './Images/bg.mp4';

function EditPost() {
  const { postId } = useParams();
  const [postDescription, setPostDescription] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [error, setError] = useState(null);
  const [imageFileNames, setImageFileNames] = useState([]);
  const [videoFileName, setVideoFileName] = useState('');
  const videoInputRef = useRef(null);

  const handleDescriptionChange = (event) => {
    setPostDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const totalFiles = imageFiles.length + files.length;
    if (totalFiles <= 3) {
      setImageFiles([...imageFiles, ...files.slice(0, 3 - imageFiles.length)]);
      const names = files.map(file => file.name);
      setImageFileNames([...imageFileNames, ...names.slice(0, 3 - imageFileNames.length)]);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You can only upload a maximum of 3 images or videos.'
      });
    }
  };

  const handleVideoChange = (event) => {
    if (!videoFile) {
      setVideoFile(event.target.files[0]);
      setVideoFileName(event.target.files[0].name);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You can only upload one video.'
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('postDescription', postDescription);
    imageFiles.forEach((file, index) => {
      formData.append('postImages', file);
    });
    if (videoFile) {
      formData.append('postVideos', videoFile);
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/socialMediaPost/${postId}`, formData);
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

  const handleClickVideoButton = () => {
    if (videoInputRef.current) {
      videoInputRef.current.click();
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
          <h1>Edit Post</h1>
          <div className="row">
            <div className="col-full">
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
            </div>
          </div>
          <div className="row">
            <div className="col-half">
              <div className="form-group">
                <div className="label-input-group">
                  <label htmlFor="imageInput">Add Images:</label>
                  <input
                    id="imageInput"
                    type="file"
                    multiple
                    accept="image/jpeg"
                    className="input-field1"
                    onChange={handleImageChange}
                    disabled={imageFiles.length >= 3}
                  />
                  <div className="file-name">{imageFileNames.length > 0 ? imageFileNames.join(', ') : 'No file chosen'}</div>
                  <button type="button" className="custom-file-button1" onClick={() => document.getElementById('imageInput').click()} disabled={imageFiles.length >= 3}>
                    <img src={uploadImg} alt="Upload" className="upload-icon" /> Choose File
                  </button>
                </div>
              </div>
            </div>
            <div className="col-half">
              <div className="form-group">
                <div className="label-input-group">
                  <label htmlFor="videoInput">Add Video:</label>
                  <div className="file-name">{videoFileName ? videoFileName : 'No file chosen'}</div>
                  <button type="button" className="custom-file-button2" onClick={handleClickVideoButton} disabled={videoFile}>
                    <img src={uploadImg} alt="Upload" className="upload-icon" /> Choose File
                    <input
                      ref={videoInputRef}
                      id="videoInput"
                      type="file"
                      accept="video/mp4"
                      className="input-field2"
                      onChange={handleVideoChange}
                      style={{ display: 'none' }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-full">
              <div className="form-group" style={{ position: 'relative', top: '20px' }}>
                <button type="submit" className="btn btn-primary">Update Post</button>
              </div>
              <div className="form-group" style={{ position: 'relative', top: '-33px', marginLeft: '115px' }}>
                <a href="/viewPost" className="btn btn-danger">Back</a>
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditPost;
