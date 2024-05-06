import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function DeletePost({ postId, onDelete }) {
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      // Make DELETE request to delete the post
      const response = await axios.delete(`http://localhost:8080/api/socialMediaPost/${postId}`);
      if (response.status === 200) {
        // If the deletion was successful, call the onDelete callback to update the UI
        onDelete(postId);
        Swal.fire({
          icon: 'success',
          title: 'Post deleted successfully',
        });
      } else {
        // Handle unexpected status codes or errors
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to delete post',
      });
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">Delete Post</button>
  );
}

export default DeletePost;
