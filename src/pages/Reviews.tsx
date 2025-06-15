import React from 'react';
import { Star, Quote, Building, User } from 'lucide-react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Reviews = () => {
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
      review: 'Working with Minimind was an absolute pleasure. They created a stunning website that perfectly represents our environmental mission. The design is both beautiful and functional, and our conversion rates have increased by 40%.',
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
    {
      name: 'Lisa Chen',
      company: 'Wellness Co.',
      role: 'Brand Manager',
      rating: 5,
      review: 'Minimind\'s social media graphics have completely transformed our online presence. The designs are consistent, professional, and perfectly aligned with our brand values. Our social media engagement has tripled!',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      project: 'Social Media Design'
    },
    {
      name: 'Robert Anderson',
      company: 'Anderson & Associates',
      role: 'Managing Partner',
      rating: 5,
      review: 'Professional, creative, and reliable. Minimind delivered a complete brand package that perfectly represents our law firm\'s values and professionalism. The quality exceeded our expectations in every way.',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
      project: 'Professional Brand Package'
    }
  ];

  const stats = [
    { number: '98%', label: 'Client Satisfaction' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '85+', label: 'Happy Clients' },
    { number: '85%', label: 'Repeat Customers' }
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
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with Minimind
            and the results we've delivered for their businesses.
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
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{review.name}</h3>
                    <p className="text-sm text-gray-600">{review.role}</p>
                    <div className="flex items-center mt-1">
                      <Building className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">{review.company}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-sm text-gray-600">({review.rating}.0)</span>
                </div>

                <div className="mb-4">
                  <Quote className="w-6 h-6 text-blue-600 mb-2" />
                  <p className="text-gray-700 italic">"{review.review}"</p>
                </div>

                <div className="border-t pt-3">
                  <span className="text-sm text-blue-600 font-medium">Project: {review.project}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Testimonial Highlight */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center mb-16">
          <Quote className="w-12 h-12 mx-auto mb-6 text-blue-200" />
          <blockquote className="text-2xl md:text-3xl font-light mb-6 italic">
            "Minimind doesn't just create designs – they create experiences that resonate with audiences
            and drive real business results. Their team is exceptional."
          </blockquote>
          <div className="flex items-center justify-center">
            <img
              src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Featured Client"
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div className="text-left">
              <div className="font-semibold">Marcus Johnson</div>
              <div className="text-blue-200">Marketing Director, GreenEarth Solutions</div>
            </div>
          </div>
        </div>

        {/* Review Form CTA */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Have You Worked With Us?</h2>
          <p className="text-xl text-gray-600 mb-8">
            We'd love to hear about your experience! Share your feedback and help other businesses
            discover the Minimind difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Share Your Review
            </a>
            <a
              href="/packages"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;