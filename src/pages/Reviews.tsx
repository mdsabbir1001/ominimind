import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, Sparkles, Star, Quote, Building, User, X, Upload, Globe, Facebook, Youtube } from 'lucide-react'; // Added Upload, Globe, Facebook, Youtube icons
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from 'framer-motion';
// Assuming you have these API functions and a new upload function
import { getReviews, addReview, uploadImage, getReviewsStats } from '../utils/api';
import { Review } from '../types'; // Make sure Review type includes new fields
import Button from '../components/Common/Button';
import Modal from '../components/Common/Modal'; // Assuming you have a Modal component

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsStats, setReviewsStats] = useState<ReviewsStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submit button loading

  // Form state - Added new fields
  const [newReview, setNewReview] = useState({
    name: '',
    designation: '',
    company: '',
    company_url: '',
    project: '',
    rating: 0,
    review: '',
    image_url: '', // Optional now
    profile_photo_file: null as File | null,
  });

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const [reviewsData, statsData] = await Promise.all([
        getReviews(),
        getReviewsStats()
      ]);
      setReviews(reviewsData);
      setReviewsStats(statsData);
    } catch (err: any) {
      setError(`Failed to fetch reviews: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSeeMoreClick = (review: Review) => {
    setSelectedReview(review);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setSelectedReview(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewReview(prev => ({ ...prev, profile_photo_file: e.target.files![0] }));
    } else {
      setNewReview(prev => ({ ...prev, profile_photo_file: null }));
    }
  };


  const handleRatingChange = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.rating === 0 || !newReview.name || !newReview.review) {
      alert('Please provide your name, rating, and a review.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let imageUrl = newReview.image_url;
      // Upload image if a file is selected
      if (newReview.profile_photo_file) {
        const uploadedUrl = await uploadImage(newReview.profile_photo_file);
        imageUrl = uploadedUrl;
      }

      // Prepare review data to send
      const reviewDataToSend = {
        name: newReview.name,
        designation: newReview.designation,
        company: newReview.company,
        company_url: newReview.company_url,
        project: newReview.project,
        rating: newReview.rating,
        review: newReview.review,
        image_url: imageUrl,
      };

      // This will be uncommented when the backend is ready and addReview handles new fields
      await addReview(reviewDataToSend);
      alert('Thank you for your review! It will be published after moderation.');
      setIsSubmitModalOpen(false);
      // Reset form state
      setNewReview({ name: '', designation: '', company: '', project: '', rating: 0, review: '', image_url: '', profile_photo_file: null });
      // Optionally re-fetch reviews after submission (if you want to show pending reviews)
      // fetchData();

    } catch (err: any) {
      setError(`Failed to submit review: ${err.message}`);
      alert(`Failed to submit review: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const sliderSettings = {
    dots: true,
    infinite: reviews.length > 2,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Define itemVariants for list items or grid items - Make sure this is defined
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };


  return (
    <div className="py-20 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Reviews</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </motion.div>

          {/* Reviews Stats Section */}
          {reviewsStats.length > 0 && (
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-16"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              {reviewsStats.map((stat) => (
                <div key={stat.id} className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg w-64">
                  <p className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</p>
                  <p className="text-sm text-gray-700">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Main Reviews Slider Section */}
          {loading ? (
            <p>Loading reviews...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : reviews.length > 0 ? (
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <Slider {...sliderSettings} className="mb-16">
                {reviews.map((review, index) => (
                  <div key={index} className="p-4">
                    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col hover:shadow-xl transition-shadow"> {/* Increased height */}
                      <div className="flex items-start mb-4">
                        {/* Display profile photo */}
                        <img src={review.image_url || 'https://via.placeholder.com/150'} alt={review.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{review.name}</h3>
                          <p className="text-sm text-gray-600">{review.designation}</p>
                          {review.company_url ? (
                            <a href={review.company_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                              {review.company}
                            </a>
                          ) : (
                            <p className="text-sm text-gray-600">{review.company}</p>
                          )}
                          
                        </div>
                      </div>
                      <div className="flex items-center mb-3">{renderStars(review.rating)}</div>
                      <div className="mb-4 flex-grow">
                        <Quote className="w-6 h-6 text-blue-600 mb-2" />
                        <p className="text-gray-700 italic line-clamp-4">"{review.review}"</p>
                      </div>
                      <button
                        onClick={() => handleSeeMoreClick(review)}
                        className="text-sm text-blue-600 font-semibold hover:underline self-start mb-4"
                      >
                        See more...
                      </button>
                    </div>
                  </div>
                ))}
              </Slider>
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No reviews yet. Be the first to write one!</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Button onClick={() => setIsSubmitModalOpen(true)} size="lg">
              Write a Review
            </Button>
          </div>
        </div>

        {/* Review Details Modal */}
        {/* Using the Modal component you likely have */}
        <Modal isOpen={isReviewModalOpen} onClose={closeReviewModal} title="Client Review">
          {selectedReview && (
            <div className="space-y-4">
              <div className="flex items-start">
                <img src={selectedReview.image_url || 'https://via.placeholder.com/150'} alt={selectedReview.name} className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-200" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedReview.name}</h3>
                  <p className="text-md text-gray-600">{selectedReview.designation}</p>
                  {selectedReview.company && <p className="text-md text-gray-600">{selectedReview.company}</p>}
                </div>
              </div>
              <div className="flex items-center">{renderStars(selectedReview.rating)}</div>
              <div>
                <p className="text-gray-700 text-lg leading-relaxed">"{selectedReview.review}"</p>
              </div>
            </div>
          )}
        </Modal>


        {/* Review Submission Modal */}
        {/* Using the Modal component you likely have */}
        <Modal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} title="Share Your Experience">
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Name</label>
              <input type="text" name="name" value={newReview.name} onChange={handleFormChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" required placeholder="Your Full Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Designation</label>
              <input type="text" name="designation" value={newReview.designation} onChange={handleFormChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company (Optional)</label>
              <input type="text" name="company" value={newReview.company} onChange={handleFormChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company URL (Optional)</label>
              <input type="url" name="company_url" value={newReview.company_url} onChange={handleFormChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., https://www.example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input type="text" name="project" value={newReview.project} onChange={handleFormChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
             {/* Profile Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo (Optional)</label>
              <input
                type="file"
                id="profile-photo-upload"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <label htmlFor="profile-photo-upload">
                <Button
                  variant="secondary"
                  icon={Upload}
                  size="sm"
                  as="span"
                  className="cursor-pointer"
                >
                  {newReview.profile_photo_file ? newReview.profile_photo_file.name : 'Upload Photo'}
                </Button>
              </label>
               {newReview.profile_photo_file && (
                  <p className="mt-1 text-sm text-gray-500">Selected file: {newReview.profile_photo_file.name}</p>
               )}
               {/* Optionally show a preview if image_url is already set or after upload */}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className={`w-8 h-8 cursor-pointer ${star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} onClick={() => handleRatingChange(star)} />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Review</label>
              <textarea name="review" value={newReview.review} onChange={handleFormChange} rows={4} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" required></textarea>
            </div>
            <div className="text-right">
              <Button type="submit" loading={isSubmitting}>Submit Review</Button>
            </div>
          </form>
        </Modal>    
    </div>
  );
};

export default ReviewsPage;