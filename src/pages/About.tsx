import React from 'react';
import { Target, Eye, Heart, Award, Users, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Minimind</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a passionate team of designers and creative professionals dedicated to bringing your vision to life 
            through exceptional graphic design solutions.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Empowering Businesses Through Creative Excellence</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                At Minimind, we believe that great design is more than just aesthetics. it's about creating meaningful connections 
                between brands and their audiences. Our team combines creative vision with strategic thinking to deliver designs that not only look stunning but also drive business results.
              </p>
              <p>
                Whether you're a startup looking to establish your brand identity, a marketing agency seeking creative support, or an established business ready to expand, we have the expertise 
                and passion to bring your vision to life.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Our Team"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20"></div>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To empower businesses through exceptional design that communicates their unique story and drives meaningful results.
            </p>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To be the global leader in creative design solutions, setting new standards for innovation and excellence.
            </p>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-blue-50 rounded-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-gray-600">
              Creativity, integrity, collaboration, and a relentless pursuit of perfection in everything we do.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Minimind?</h2>
            <p className="text-xl text-gray-600">
              We combine creativity with strategy to deliver designs that not only look amazing but also drive results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[

              {
                icon: Users,
                title: 'Expert Team',
                description: 'Our team consists of seasoned designers with expertise across all design disciplines.'
              },
              {
                icon: Sparkles,
                title: 'Creative Excellence',
                description: 'We push the boundaries of creativity to deliver unique solutions that stand out.'
              },
              {
                icon: Target,
                title: 'Strategic Approach',
                description: 'Every design decision is backed by research and strategic thinking to ensure maximum impact.'
              },
              {
                icon: Heart,
                title: 'Client-Focused',
                description: 'We build lasting relationships by putting our clients needs and success at the center of everything we do.'
              },
              {
                icon: Eye,
                title: 'Attention to Detail',
                description: 'We believe that great design lies in the details, and we obsess over every pixel and element.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100">
                  <item.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;