import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSKU, updateSKU, removeSKU } from '../store';
import { SKU } from '../types';
import { RootState } from '../store';

export const SKUsPage: React.FC = () => {
  const dispatch = useDispatch();
  const skus = useSelector((state: RootState) => state.app.skus);
  const [newSKU, setNewSKU] = useState({
    name: '',
    price: 0,
    cost: 0,
  });

  const handleAddSKU = () => {
    if (newSKU.name.trim()) {
      const sku: SKU = {
        id: crypto.randomUUID(),
        name: newSKU.name.trim(),
        price: Number(newSKU.price),
        cost: Number(newSKU.cost),
      };
      dispatch(addSKU(sku));
      setNewSKU({ name: '', price: 0, cost: 0 });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">SKUs</h1>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSKU.name}
            onChange={(e) => setNewSKU({ ...newSKU, name: e.target.value })}
            placeholder="SKU Name"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={newSKU.price}
            onChange={(e) =>
              setNewSKU({ ...newSKU, price: parseFloat(e.target.value) })
            }
            placeholder="Price"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={newSKU.cost}
            onChange={(e) =>
              setNewSKU({ ...newSKU, cost: parseFloat(e.target.value) })
            }
            placeholder="Cost"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddSKU}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add SKU
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {skus.map((sku) => (
              <tr key={sku.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={sku.name}
                    onChange={(e) =>
                      dispatch(updateSKU({ ...sku, name: e.target.value }))
                    }
                    className="w-full px-2 py-1 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    value={sku.price}
                    onChange={(e) =>
                      dispatch(updateSKU({ ...sku, price: parseFloat(e.target.value) }))
                    }
                    className="w-full px-2 py-1 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    value={sku.cost}
                    onChange={(e) =>
                      dispatch(updateSKU({ ...sku, cost: parseFloat(e.target.value) }))
                    }
                    className="w-full px-2 py-1 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => dispatch(removeSKU(sku.id))}
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