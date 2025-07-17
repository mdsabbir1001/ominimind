import React, { useState, useEffect } from 'react';
import {
  Linkedin,
  Twitter,
  Dribbble,
  Palette,
  Code,
  Camera,
  Video,
  Pen,
  Lightbulb, // Creativity
  Users,      // Collaboration
  Award,      // Excellence
  Rocket      // Innovation
} from 'lucide-react';
import { motion } from 'framer-motion';
import { TeamMember } from '../../types';
import { API_URL } from '../utils/api';

const Team = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/team-members`);
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }
      const data: TeamMember[] = await response.json();
      setTeam(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

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

  // Define animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  if (loading) {
    return <div>Loading team members...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="py-20 overflow-x-hidden"> {/* Added overflow-x-hidden */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div // Animate the Header
          className="text-center mb-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Team</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our talented team of designers, developers, and creative professionals are passionate about
            bringing your vision to life through exceptional design solutions.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image_url}
                  alt={member.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:scale-105 transition-transform duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-200">{member.designation}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4">{member.bio}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((skill, skillIndex) => (
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
                    href={member.social_url_a}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social_url_b}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social_url_c}
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
        <motion.div // Animate the Values Section container
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12"
          variants={sectionVariants} // Use section variants for the container
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Team Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div // Animate each value item
                key={index}
                className="text-center"
                variants={itemVariants} // Use item variants
                initial="hidden" // Explicitly set initial state
                whileInView="visible" // Explicitly set whileInView state
                viewport={{ once: true, amount: 0.1 }} // Trigger animation when 10% of item is visible (reduced amount)
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }} // Add staggered delay
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join Team CTA */}
        <motion.div // Animate the Join Team CTA section
          className="mt-16 text-center"
          variants={sectionVariants} // Use section variants for the container
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
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
        </motion.div>
      </div>
    </div>
  );
};

export default Team;