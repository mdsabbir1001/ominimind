import React, { useState, useEffect } from 'react';
import { Save, Upload, Image } from 'lucide-react';
import { SectionImages as SectionImagesType } from '../../types';
import { getSectionImages, saveSectionImages } from '../../utils/storage';
import Button from '../Common/Button';
import Header from '../Layout/Header';

const SectionImages: React.FC = () => {
  const [images, setImages] = useState<SectionImagesType>(getSectionImages());
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      saveSectionImages(images);
      alert('Section images saved successfully!');
    } catch (error) {
      alert('Error saving images');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (field: keyof SectionImagesType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImages(prev => ({ ...prev, [field]: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const sections = [
    { key: 'homeHero' as keyof SectionImagesType, label: 'Home Hero Image' },
    { key: 'servicesHero' as keyof SectionImagesType, label: 'Services Hero Image' },
    { key: 'packagesHero' as keyof SectionImagesType, label: 'Packages Hero Image' },
    { key: 'teamHero' as keyof SectionImagesType, label: 'Team Hero Image' },
    { key: 'portfolioHero' as keyof SectionImagesType, label: 'Portfolio Hero Image' },
    { key: 'contactHero' as keyof SectionImagesType, label: 'Contact Hero Image' }
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Section Images" />
      
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Manage Section Images</h3>
            <p className="text-sm text-gray-600 mt-1">
              Update hero images for different sections of your website
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.key} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h4 className="text-md font-medium text-gray-900 mb-4">{section.label}</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={images[section.key]}
                        onChange={(e) => setImages(prev => ({ ...prev, [section.key]: e.target.value }))}
                        placeholder="Enter image URL"
                      />
                      <input
                        type="file"
                        id={`${section.key}-image`}
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload(section.key)}
                      />
                      <label htmlFor={`${section.key}-image`}>
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
                  </div>
                  
                  {images[section.key] && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preview
                      </label>
                      <img
                        src={images[section.key]}
                        alt={`${section.label} preview`}
                        className="w-full h-48 object-cover rounded-md border border-gray-200"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end pt-6 border-t border-gray-200 mt-8">
            <Button
              onClick={handleSave}
              loading={loading}
              icon={Save}
            >
              Save All Images
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionImages;