import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Briefcase, ExternalLink, Github, Upload, Image, X } from 'lucide-react';
import { PortfolioItem } from '../../types';
import { getPortfolio, savePortfolio } from '../../utils/storage';
import Button from '../Common/Button';
import Modal from '../Common/Modal';
import Header from '../Layout/Header';

const Portfolio: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    setPortfolio(getPortfolio());
  }, []);

  const categories = Array.from(new Set(portfolio.map(item => item.category)));

  const filteredPortfolio = portfolio.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSaveItem = (itemData: Omit<PortfolioItem, 'id' | 'createdAt'>) => {
    if (editingItem) {
      const updatedPortfolio = portfolio.map(item =>
        item.id === editingItem.id
          ? { ...item, ...itemData }
          : item
      );
      setPortfolio(updatedPortfolio);
      savePortfolio(updatedPortfolio);
    } else {
      const newItem: PortfolioItem = {
        ...itemData,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      const updatedPortfolio = [...portfolio, newItem];
      setPortfolio(updatedPortfolio);
      savePortfolio(updatedPortfolio);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
      const updatedPortfolio = portfolio.filter(item => item.id !== id);
      setPortfolio(updatedPortfolio);
      savePortfolio(updatedPortfolio);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Portfolio" onSearch={setSearchQuery} />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Manage Portfolio</h3>
            <p className="text-sm text-gray-600">Add, edit, or remove portfolio items with multiple project images</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <Button
              onClick={() => setIsModalOpen(true)}
              icon={Plus}
            >
              Add Portfolio Item
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPortfolio.map((item) => {
            const projectImages = Array.isArray(item.projectImages) ? item.projectImages : [];
            return (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="relative">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setIsModalOpen(true);
                      }}
                      className="bg-white bg-opacity-90 text-blue-600 hover:text-blue-800 p-1 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="bg-white bg-opacity-90 text-red-600 hover:text-red-800 p-1 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {projectImages.length > 0 && (
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
                        <Image className="w-3 h-3 mr-1" />
                        {projectImages.length + 1} images
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {(Array.isArray(item.technologies) ? item.technologies : []).slice(0, 3).map((tech, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {(Array.isArray(item.technologies) ? item.technologies : []).length > 3 && (
                      <span className="text-xs text-gray-500">+{(Array.isArray(item.technologies) ? item.technologies : []).length - 3} more</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                        title="View Live"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-gray-900"
                        title="View Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPortfolio.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No portfolio items found</p>
          </div>
        )}
      </div>

      <PortfolioModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        item={editingItem}
      />
    </div>
  );
};

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<PortfolioItem, 'id' | 'createdAt'>) => void;
  item: PortfolioItem | null;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose, onSave, item }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    coverImage: '',
    projectImages: [''],
    category: '',
    technologies: [''],
    url: '',
    githubUrl: ''
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        description: item.description,
        coverImage: item.coverImage,
        projectImages: Array.isArray(item.projectImages) && item.projectImages.length > 0 ? item.projectImages : [''],
        category: item.category,
        technologies: Array.isArray(item.technologies) && item.technologies.length > 0 ? item.technologies : [''],
        url: item.url || '',
        githubUrl: item.githubUrl || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        coverImage: '',
        projectImages: [''],
        category: '',
        technologies: [''],
        url: '',
        githubUrl: ''
      });
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      projectImages: formData.projectImages.filter(img => img.trim() !== ''),
      technologies: formData.technologies.filter(t => t.trim() !== '')
    });
  };

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({ ...prev, coverImage: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectImageUpload = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateProjectImage(index, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addProjectImage = () => {
    setFormData(prev => ({
      ...prev,
      projectImages: [...prev.projectImages, '']
    }));
  };

  const removeProjectImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projectImages: prev.projectImages.filter((_, i) => i !== index)
    }));
  };

  const updateProjectImage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      projectImages: prev.projectImages.map((img, i) => i === index ? value : img)
    }));
  };

  const addTechnology = () => {
    setFormData(prev => ({
      ...prev,
      technologies: [...prev.technologies, '']
    }));
  };

  const removeTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  const updateTechnology = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.map((t, i) => i === index ? value : t)
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={item ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              placeholder="Web Development, Mobile App, etc."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image (Main Display Image)
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.coverImage}
              onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
              placeholder="Enter cover image URL"
            />
            <input
              type="file"
              id="cover-image"
              accept="image/*"
              className="hidden"
              onChange={handleCoverImageUpload}
            />
            <label htmlFor="cover-image">
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
          {formData.coverImage && (
            <div className="mt-2">
              <img
                src={formData.coverImage}
                alt="Cover preview"
                className="w-full h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Images (Additional Images)
          </label>
          {formData.projectImages.map((image, index) => (
            <div key={index} className="flex items-center space-x-2 mb-3">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={image}
                onChange={(e) => updateProjectImage(index, e.target.value)}
                placeholder="Enter project image URL"
              />
              <input
                type="file"
                id={`project-image-${index}`}
                accept="image/*"
                className="hidden"
                onChange={handleProjectImageUpload(index)}
              />
              <label htmlFor={`project-image-${index}`}>
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
              {formData.projectImages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProjectImage(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addProjectImage}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            + Add Project Image
          </button>
          
          {formData.projectImages.some(img => img.trim() !== '') && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Project Images Preview:</p>
              <div className="grid grid-cols-4 gap-2">
                {formData.projectImages.filter(img => img.trim() !== '').map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Project preview ${index + 1}`}
                    className="w-full h-20 object-cover rounded-md border"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Live URL (Optional)
            </label>
            <input
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub URL (Optional)
            </label>
            <input
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.githubUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
              placeholder="https://github.com/username/repo"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Technologies Used
          </label>
          {formData.technologies.map((tech, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={tech}
                onChange={(e) => updateTechnology(index, e.target.value)}
                placeholder="React, Node.js, etc."
              />
              {formData.technologies.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTechnology(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addTechnology}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            + Add Technology
          </button>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {item ? 'Update' : 'Add'} Item
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Portfolio;