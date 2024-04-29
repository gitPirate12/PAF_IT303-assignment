import React, { useState } from 'react';
import axios from 'axios';

function AddPost() {
    const [postContent, setPostContent] = useState({
        postDescription: '',
        postImages: [],
        postVideos: [],
        description: ''
    });

    const handleFileChange = (event) => {
        const files = event.target.files;
        const type = event.target.getAttribute('data-type');

        const validFiles = Array.from(files).filter(file => {
            if (type === 'image') {
                return file.type === 'image/jpeg';
            } else if (type === 'video') {
                // Validate video format and duration
                return file.type === 'video/mp4' && file.size <= 30000000 && file.duration <= 30; // 30 seconds
            }
            return false;
        });

        if (type === 'image') {
            setPostContent(prevState => ({
                ...prevState,
                postImages: validFiles.slice(0, 3)
            }));
        } else {
            setPostContent(prevState => ({
                ...prevState,
                postVideos: validFiles.slice(0, 3)
            }));
        }
    };

    const handleDescriptionChange = (event) => {
        const { value } = event.target;
        setPostContent(prevState => ({
            ...prevState,
            description: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('postDescription', postContent.postDescription);
        postContent.postImages.forEach((image, index) => formData.append(`postImages[${index}]`, image));
        postContent.postVideos.forEach((video, index) => formData.append(`postVideos[${index}]`, video));
        formData.append('description', postContent.description);

        try {
            const response = await axios.post('http://localhost:8080/api/socialMediaPost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Post submitted successfully:', response.data);
            setPostContent({
                postDescription: '',
                postImages: [],
                postVideos: [],
                description: ''
            });
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };

    return (
        <div className="container">
            <h2>Add Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="imageInput" className="form-label">Upload Images (JPEG)</label>
                    <input
                        type="file"
                        className="form-control"
                        id="imageInput"
                        accept="image/jpeg"
                        multiple
                        data-type="image"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="videoInput" className="form-label">Upload Videos (MP4)</label>
                    <input
                        type="file"
                        className="form-control"
                        id="videoInput"
                        accept="video/mp4"
                        multiple
                        data-type="video"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descriptionInput" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="descriptionInput"
                        value={postContent.description}
                        onChange={handleDescriptionChange}
                        placeholder="Enter description for the post"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit Post</button>
            </form>
        </div>
    );
}

export default AddPost;
