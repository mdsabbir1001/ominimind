import React, { useState, useEffect } from 'react';
import { Save, Upload } from 'lucide-react';
import { HomeContent as HomeContentType } from '../../types';
import { getHomeContent, saveHomeContent } from '../../utils/storage';
import Button from '../Common/Button';
import Header from '../Layout/Header';

const HomeContent: React.FC = () => {
  const [content, setContent] = useState<HomeContentType>(getHomeContent());
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      saveHomeContent(content);
      // Show success message
      alert('Home content saved successfully!');
    } catch (error) {
      alert('Error saving content');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (field: keyof HomeContentType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setContent(prev => ({ ...prev, [field]: result }));
      };
      reader.readAsDataURL(file);
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