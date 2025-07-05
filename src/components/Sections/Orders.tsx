import React, { useState, useEffect } from 'react';
import { Package, Eye, CheckCircle, XCircle, Clock, Trash2, Search, Copy } from 'lucide-react';
import { Order } from '../../types';
import { getOrders, saveOrders } from '../../utils/storage';
import Button from '../Common/Button';
import Modal from '../Common/Modal';
import Header from '../Layout/Header';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.packageName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    saveOrders(updatedOrders);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
      saveOrders(updatedOrders);
    }
  };

  const copyOrderId = (orderId: string) => {
    navigator.clipboard.writeText(orderId);
    alert('Order ID copied to clipboard!');
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Package className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const pendingCount = orders.filter(order => order.status === 'pending').length;
  const inProgressCount = orders.filter(order => order.status === 'in-progress').length;

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Orders" onSearch={setSearchQuery} />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Order Management</h3>
            <p className="text-sm text-gray-600">
              {pendingCount > 0 && `${pendingCount} pending orders`}
              {pendingCount > 0 && inProgressCount > 0 && ', '}
              {inProgressCount > 0 && `${inProgressCount} in progress`}
            </p>
          </div>
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-mono text-gray-900">{order.id}</span>
                          <button
                            onClick={() => copyOrderId(order.id)}
                            className="text-gray-400 hover:text-gray-600"
                            title="Copy Order ID"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.customerEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.packageName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.packagePrice}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                          className={`text-xs px-2 py-1 rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(order.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />
    </div>
  );
};

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    alert('Order ID copied to clipboard!');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Order Details"
      size="lg"
    >
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">
                Order ID
              </label>
              <p className="text-lg font-mono text-blue-900">{order.id}</p>
            </div>
            <Button
              onClick={copyOrderId}
              variant="secondary"
              size="sm"
              icon={Copy}
            >
              Copy ID
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <p className="text-sm text-gray-900">{order.customerName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <p className="text-sm text-gray-900">{order.customerEmail}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <p className="text-sm text-gray-900">{order.customerPhone}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Package
            </label>
            <p className="text-sm text-gray-900">{order.packageName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <p className="text-sm text-gray-900 font-medium">{order.packagePrice}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order Date
            </label>
            <p className="text-sm text-gray-900">{new Date(order.orderDate).toLocaleDateString()}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <p className="text-sm text-gray-900 capitalize">{order.status.replace('-', ' ')}</p>
          </div>
        </div>

        {order.notes && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-900">{order.notes}</p>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Orders;