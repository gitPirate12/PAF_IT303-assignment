import React, { useEffect, useState } from 'react';

function ViewPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/socialMediaPost');
                if (!res.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await res.json();
                setPosts(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const renderComments = (comments) => {
        return comments.map((comment) => (
            <div key={comment.id}>
                <p>{comment.text}</p>
                <p>By: {comment.userId}</p>
            </div>
        ));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='ViewPostHome'>
            <div className='addPost'>
                {posts.map((post) => (
                    <div key={post._id}>
                        <p>{post.postDescription}</p>
                        <div>
                            {/* Render images */}
                            {post.postImages.map((image, index) => (
                                <img key={index} src={`data:image/jpeg;base64,${image}`} alt={`Image ${index + 1}`} />
                            ))}
                            {/* Render videos */}
                            {post.postVideos.map((video, index) => (
                                <video key={index} controls>
                                    <source src={`data:video/mp4;base64,${video}`} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ))}
                            {/* Render comments */}
                            {post.comments && renderComments(post.comments)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewPost;
