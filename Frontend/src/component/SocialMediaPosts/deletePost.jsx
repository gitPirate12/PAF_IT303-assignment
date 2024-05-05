import React, { useState } from 'react';

function DeletePost({ postId, onDelete }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8080/api/socialMediaPost/${postId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                // If the deletion was successful, trigger the onDelete callback
                onDelete(postId);
            } else {
                // Handle other status codes or errors
                console.error('Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleDelete} disabled={loading}>
                {loading ? 'Deleting...' : 'Delete'}
            </button>
        </div>
    );
}

export default DeletePost;
