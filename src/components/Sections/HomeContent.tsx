import React, { useState, useEffect } from 'react';
import { Save, Upload } from 'lucide-react';
import { HomeContent as HomeContentType } from '../../types';
import { getHomeContent, saveHomeContent } from '../../utils/storage';
import Button from '../Common/Button';
import Header from '../Layout/Header';
import axios from 'axios';
import { getToken } from '../../utils/storage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const HomeContent: React.FC = () => {
  const [content, setContent] = useState<HomeContentType>({
    heroTitle: '',
    heroSubtitle: '',
    heroImage: '',
    ctaButtonText: '',
    ctaButtonLink: '',
    aboutText: '',
    featuredServices: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const fetchedContent = await getHomeContent();
        setContent(fetchedContent);
      } catch (error) {
        console.error("Failed to fetch home content:", error);
      }
    };
    fetchContent();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await saveHomeContent(content);
      alert('Home content saved successfully!');
    } catch (error) {
      alert('Error saving content');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (field: keyof HomeContentType) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      try {
        const token = getToken();
        const response = await axios.post(`${API_BASE_URL}/images/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token ? `Bearer ${token}` : '',
          },
        });
        setContent(prev => ({ ...prev, [field]: response.data.url }));
        alert('Image uploaded successfully!');
      } catch (error) {
        console.error("Error uploading image:", error);
        alert('Error uploading image');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Home Content" />
      
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hero Section</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={content.heroTitle}
                    onChange={(e) => setContent(prev => ({ ...prev, heroTitle: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hero Subtitle
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    value={content.heroSubtitle}
                    onChange={(e) => setContent(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hero Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={content.heroImage}
                      onChange={(e) => setContent(prev => ({ ...prev, heroImage: e.target.value }))}
                      placeholder="Enter image URL"
                    />
                    <input
                      type="file"
                      id="hero-image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload('heroImage')}
                    />
                    <label htmlFor="hero-image">
                      <Button
                        variant="secondary"
                        icon={Upload}
                        size="sm"
                        as="span"
                        className="cursor-pointer"
                      >
                        Upload
                      </Button>
                    </label>
                  </div>
                  {content.heroImage && (
                    <div className="mt-2">
                      <img
                        src={content.heroImage}
                        alt="Hero preview"
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={content.ctaButtonText}
                    onChange={(e) => setContent(prev => ({ ...prev, ctaButtonText: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CTA Button Link
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={content.ctaButtonLink}
                    onChange={(e) => setContent(prev => ({ ...prev, ctaButtonLink: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            
            {/* About Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About Section</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About Text
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  value={content.aboutText}
                  onChange={(e) => setContent(prev => ({ ...prev, aboutText: e.target.value }))}
                />
              </div>
            </div>
            
            {/* Featured Services */}
            <div className="pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Services</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Service IDs (comma-separated)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={content.featuredServices.join(', ')}
                  onChange={(e) => setContent(prev => ({ 
                    ...prev, 
                    featuredServices: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                  }))}
                  placeholder="1, 2, 3"
                />
              </div>
            </div>
            
            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <Button
                onClick={handleSave}
                loading={loading}
                icon={Save}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;