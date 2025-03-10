import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStore, updateStore, removeStore } from '../store';
import { Store } from '../types';
import { RootState } from '../store';

export const StoresPage: React.FC = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.app.stores);
  const [newStore, setNewStore] = useState({
    name: '',
    city: '',
    state: '',
  });

  const handleAddStore = () => {
    if (newStore.name.trim()) {
      const store: Store = {
        id: crypto.randomUUID(),
        name: newStore.name.trim(),
        city: newStore.city.trim(),
        state: newStore.state.trim(),
        order: stores.length,
      };
      dispatch(addStore(store));
      setNewStore({ name: '', city: '', state: '' });
    }
  };

  const handleUpdateStore = (store: Store, field: keyof Store, value: string) => {
    dispatch(updateStore({ ...store, [field]: value }));
  };

  const handleRemoveStore = (storeId: string) => {
    dispatch(removeStore(storeId));
  };

  const handleReorder = (storeId: string, direction: 'up' | 'down') => {
    const storeIndex = stores.findIndex((s) => s.id === storeId);
    if (
      (direction === 'up' && storeIndex > 0) ||
      (direction === 'down' && storeIndex < stores.length - 1)
    ) {
      const newStores = [...stores];
      const swapIndex = direction === 'up' ? storeIndex - 1 : storeIndex + 1;
      [newStores[storeIndex], newStores[swapIndex]] = [
        newStores[swapIndex],
        newStores[storeIndex],
      ];
      newStores.forEach((store, index) => {
        dispatch(updateStore({ ...store, order: index }));
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Stores</h1>
        <div className="flex gap-2">
          <input
            type="text"
            value={newStore.name}
            onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
            placeholder="Store name"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newStore.city}
            onChange={(e) => setNewStore({ ...newStore, city: e.target.value })}
            placeholder="City"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newStore.state}
            onChange={(e) => setNewStore({ ...newStore, state: e.target.value })}
            placeholder="State"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddStore}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Store
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Store ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Store Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                State
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stores.map((store) => (
              <tr key={store.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleReorder(store.id, 'up')}
                      disabled={store.order === 0}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => handleReorder(store.id, 'down')}
                      disabled={store.order === stores.length - 1}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      ↓
                    </button>
                    <span>{store.order + 1}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {store.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={store.name}
                    onChange={(e) => handleUpdateStore(store, 'name', e.target.value)}
                    className="w-full px-2 py-1 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={store.city}
                    onChange={(e) => handleUpdateStore(store, 'city', e.target.value)}
                    className="w-full px-2 py-1 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={store.state}
                    onChange={(e) => handleUpdateStore(store, 'state', e.target.value)}
                    className="w-full px-2 py-1 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleRemoveStore(store.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
