import React from 'react';
import { 
  Linkedin, 
  Twitter, 
  Dribbble, 
  Palette, 
  Code, 
  Camera, 
  Pen, 
  Lightbulb, // Creativity
  Users,      // Collaboration
  Award,      // Excellence 
  Rocket      // Innovation
} from 'lucide-react';

const Team = () => {
  const team = [
    {
      name: 'Sabbir',
      role: 'Team Lead | Creative Director',
      image: 'https://i.ibb.co/mrQj9JVx/Unknown-Member.jpg',
      bio: 'Leads the vision, strategy, and design direction of the team. Bridges between client goals and creative execution.',
      skills: ['Brand Strategy', 'Creative Direction', 'Client Communication'],
      icon: Palette,
      social: {
        linkedin: '#',
        twitter: '#',
        dribbble: '#'
      }
    },
    {
      name: 'Ruhul Amin',
      role: 'Project Manager',
      image: 'https://i.ibb.co/6753RnGw/Ruhulamin.png',
      bio: 'Manages project timelines, communicates with clients, and ensures the team delivers on time with quality.',
      skills: ['Project Coordination', 'Client Handling', 'Task Scheduling'],
      icon: Palette,
      social: {
        linkedin: '#',
        twitter: '#',
        dribbble: '#'
      }
    },
    {
      name: 'Meherun Nahar',
      role: 'Brand Identity Designer',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: "Creates meaningful brand visuals including logos, typography, and brand kits that reflect the brand's voice.",
      skills: ['Logo Design', 'Brand Guideline', 'Typography Selection'],
      icon: Palette,
      social: {
        linkedin: '#',
        twitter: '#',
        dribbble: '#'
      }
    },
    {
      name: 'Jahidul Islam',
      role: 'Social Media Designer',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Designs social content that engages audiences and maintains brand consistency across platforms.',
      skills: ['Post Design', 'Instagram Reels Layouts', 'Facebook Ads'],
      icon: Palette,
      social: {
        linkedin: '#',
        twitter: '#',
        dribbble: '#'
      }
    },
    {
      name: 'Hidden Name',
      role: 'Motion Graphic Designer',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Produces animated videos, reels, and explainer visuals to elevate brand storytelling.',
      skills: ['Animated Reels', 'Explainer Videos', 'Logo Animations'],
      icon: Camera,
      social: {
        linkedin: '#',
        twitter: '#',
        dribbble: '#'
      }
    },
    {
      name: 'Jessica Thompson',
      role: 'Illustrator',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Jessica creates custom illustrations that add personality and uniqueness to every project.',
      skills: ['Digital Illustration', 'Character Design', 'Icon Design'],
      icon: Pen,
      social: {
        linkedin: '#',
        twitter: '#',
        dribbble: '#'
      }
    }
  ];

  const values = [
    {
      title: 'Creativity',
      description: 'We push the boundaries of design to create unique and memorable experiences.',
      icon: Lightbulb
    },
    {
      title: 'Collaboration',
      description: 'We believe the best results come from working together as a unified team.',
      icon: Users
    },
    {
      title: 'Excellence',
      description: 'We strive for perfection in every detail and never settle for less.',
      icon: Award
    },
    {
      title: 'Innovation',
      description: 'We stay ahead of trends and embrace new technologies and methodologies.',
      icon: Rocket
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Team</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our talented team of designers, developers, and creative professionals are passionate about 
            bringing your vision to life through exceptional design solutions.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:scale-105 transition-transform duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-200">{member.role}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <member.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{member.bio}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <a
                    href={member.social.linkedin}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.dribbble}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all"
                  >
                    <Dribbble className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Team Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Team CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Want to Join Our Team?</h2>
          <p className="text-xl text-gray-600 mb-8">
            We're always looking for talented designers and creative professionals to join our growing team.
          </p>
          <a
            href="/contact"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            View Open Positions
          </a>
        </div>
      </div>
    </div>
  );
};

export default Team;