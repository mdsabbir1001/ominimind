import React, { useState } from 'react';
import { Star, Quote, Building, User, X } from 'lucide-react'; // X আইকনটি এখানে ইম্পোর্ট করুন
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Reviews = () => {
  // মোডাল নিয়ন্ত্রণের জন্য State এবং Handler ফাংশন
  const [selectedReview, setSelectedReview] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleSeeMoreClick = (review) => {
    setSelectedReview(review);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setSelectedReview(null);
  };

  const reviews = [
    {
      name: 'Jennifer Walsh',
      company: 'TechStart Inc.',
      role: 'CEO',
      rating: 5,
      review: 'Minimind transformed our brand identity completely. Their attention to detail and creative approach exceeded our expectations. The team was professional, responsive, and delivered exactly what we envisioned.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      project: 'Complete Brand Identity'
    },
    {
      name: 'Marcus Johnson',
      company: 'GreenEarth Solutions',
      role: 'Marketing Director',
      rating: 5,
      review: 'Working with Minimind was an absolute pleasure. They created a stunning website that perfectly represents our environmental mission. The design is both beautiful and functional, and our conversion rates have increased by 40%. Their team is responsive, creative, and delivered a final product that exceeded all our initial expectations.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      project: 'Website Design & Development'
    },
    {
      name: 'Sarah Mitchell',
      company: 'Bella Boutique',
      role: 'Founder',
      rating: 5,
      review: 'The packaging design Minimind created for our product line is simply gorgeous. It perfectly captures our brand aesthetic and has helped us stand out in a crowded market. Sales have increased significantly since the rebrand.',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      project: 'Packaging Design'
    },
    {
      name: 'David Park',
      company: 'FoodieApp',
      role: 'Product Manager',
      rating: 5,
      review: 'The mobile app design Minimind delivered was exceptional. The user interface is intuitive and visually appealing. Our user engagement has improved dramatically, and we\'ve received countless compliments on the design.',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      project: 'Mobile App Design'
    },
  ];

  const stats = [
    { number: '90%', label: 'Client Satisfaction' },
    { number: '0', label: 'Average Rating' },
    { number: '90%', label: 'Happy Clients' },
    { number: '90%', label: 'Repeat Customers' }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
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

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Reviews</span>
          </h1>
          <h2 className="text-2xl text-gray-800 mb-4">
            No Review yet cureently, but we have many happy clients!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Reviews Slider */}
        <Slider {...sliderSettings} className="mb-16">
          {reviews.map((review, index) => (
            <div key={index} className="p-4">
              <div className="bg-white rounded-lg shadow-lg p-6 h-[420px] flex flex-col hover:shadow-xl transition-shadow">
                <div className="flex items-start mb-4">
                  <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{review.name}</h3>
                    <p className="text-sm text-gray-600">{review.role}</p>
                    <div className="flex items-center mt-1">
                      <Building className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">{review.company}</span>
                    </div>
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
                <div className="border-t pt-3 mt-auto">
                  <span className="text-sm text-blue-600 font-medium">Project: {review.project}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        
        {/* ... (অন্যান্য সেকশন অপরিবর্তিত) ... */}
      </div>

      {/* --- সম্পূর্ণ Modal-এর কোড এখন এই ফাইলের মধ্যেই --- */}
      {isReviewModalOpen && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full relative">
            <button
              onClick={closeReviewModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-start mb-4">
              <img
                src={selectedReview.image}
                alt={selectedReview.name}
                className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-200"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{selectedReview.name}</h3>
                <p className="text-md text-gray-600">{selectedReview.role}</p>
                <div className="flex items-center mt-1">
                  <Building className="w-4 h-4 text-gray-400 mr-1.5" />
                  <span className="text-md text-gray-600">{selectedReview.company}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center mb-4">{renderStars(selectedReview.rating)}</div>
            <div className="mb-6">
              <p className="text-gray-700 text-lg leading-relaxed">"{selectedReview.review}"</p>
            </div>
            <div className="border-t pt-4">
              <span className="text-md text-blue-600 font-medium">Project: {selectedReview.project}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;