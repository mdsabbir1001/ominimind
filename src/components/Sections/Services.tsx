import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Globe, Smartphone, Monitor, Zap } from 'lucide-react';
import { Service } from '../../types';
import { getServices, saveServices } from '../../utils/storage';
import Button from '../Common/Button';
import Modal from '../Common/Modal';
import Header from '../Layout/Header';

const iconMap = {
  Globe,
  Smartphone,
  Monitor,
  Zap
};

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setServices(getServices());
  }, []);

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveService = (serviceData: Omit<Service, 'id' | 'createdAt'>) => {
    if (editingService) {
      const updatedServices = services.map(service =>
        service.id === editingService.id
          ? { ...service, ...serviceData }
          : service
      );
      setServices(updatedServices);
      saveServices(updatedServices);
    } else {
      const newService: Service = {
        ...serviceData,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      const updatedServices = [...services, newService];
      setServices(updatedServices);
      saveServices(updatedServices);
    }
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const updatedServices = services.filter(service => service.id !== id);
      setServices(updatedServices);
      saveServices(updatedServices);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Services" onSearch={setSearchQuery} />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Manage Services</h3>
            <p className="text-sm text-gray-600">Add, edit, or remove services from your website</p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            icon={Plus}
          >
            Add Service
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Globe;
            const features = Array.isArray(service.features) ? service.features : [];
            return (
              <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <IconComponent className="w-8 h-8 text-blue-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{service.title}</h4>
                      {service.price && (
                        <p className="text-sm text-green-600 font-medium">{service.price}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingService(service);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                
                {features.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Features:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No services found</p>
          </div>
        )}
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingService(null);
        }}
        onSave={handleSaveService}
        service={editingService}
      />
    </div>
  );
};

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Omit<Service, 'id' | 'createdAt'>) => void;
  service: Service | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, onSave, service }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Globe',
    price: '',
    features: ['']
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon,
        price: service.price || '',
        features: Array.isArray(service.features) && service.features.length > 0 ? service.features : ['']
      });
    } else {
      setFormData({
        title: '',
        description: '',
        icon: 'Globe',
        price: '',
        features: ['']
      });
    }
  }, [service]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      features: formData.features.filter(f => f.trim() !== '')
    });
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={service ? 'Edit Service' : 'Add Service'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
            Icon
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.icon}
            onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
          >
            <option value="Globe">Globe</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Monitor">Monitor</option>
            <option value="Zap">Zap</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price (Optional)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            placeholder="$1,000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Features
          </label>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                placeholder="Enter feature"
              />
              {formData.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            + Add Feature
          </button>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {service ? 'Update' : 'Add'} Service
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Services;