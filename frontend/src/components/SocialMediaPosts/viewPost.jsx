import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './viewPostStyle.css';

import likeIcon from './postIcons/heart.svg';
import commentIcon from './postIcons/message-circle.svg';

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
                // Initialize the like count for each post
                const postsWithLikes = data.map(post => ({
                    ...post,
                    likeCount: parseInt(localStorage.getItem(`likeCount_${post.id}`)) || 0
                }));
                setPosts(postsWithLikes);
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
                <p>{comment.userId}: {comment.text}</p>
            </div>
        ));
    };

    const handleLike = (postId) => {
        // Find the post by id
        const likedPostIndex = posts.findIndex(post => post.id === postId);
        if (likedPostIndex === -1) {
            console.error('Post not found');
            return;
        }

        // Update the like count for the liked post
        const updatedPosts = [...posts];
        updatedPosts[likedPostIndex] = {
            ...updatedPosts[likedPostIndex],
            likeCount: updatedPosts[likedPostIndex].likeCount + 1
        };
        setPosts(updatedPosts);

        // Store the updated like count in localStorage
        localStorage.setItem(`likeCount_${postId}`, updatedPosts[likedPostIndex].likeCount.toString());
    };

    const handleComment = (postId) => {
        // Implement comment functionality
        console.log('Commented on post with ID:', postId);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className='ViewPostHome'>
            <div className='viewPost'>
                {posts.map((post) => (
                    <div key={post._id}>
                        <Slider {...sliderSettings}>
                            {/* Render images */}
                            {post.postImages.map((image, index) => (
                                <div key={index}>
                                    <img src={`data:image/jpeg;base64,${image}`} alt={`Image ${index + 1}`} />
                                </div>
                            ))}
                            {/* Render videos */}
                            {post.postVideos.map((video, index) => (
                                <div key={index}>
                                    <video controls>
                                        <source src={`data:video/mp4;base64,${video}`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            ))}
                        </Slider>
                        <div className="actionButtons">
                            {/* Render buttons for like and comment below the slider */}
                            <button onClick={() => handleLike(post.id)}>
                                <img src={likeIcon} alt="Like" />
                            </button>
                            <button onClick={() => handleComment(post._id)}>
                                <img src={commentIcon} alt="Comment" />
                            </button>
                        </div>

                        <p style={{ marginTop: '-5px' }}>{post.likeCount} likes</p> {/* Like count below the slider */}
                        <p>{post.postDescription}</p> {/* Description below the slider */}
                        
                        {/* Render comments */}
                        {post.comments && renderComments(post.comments)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewPost;
