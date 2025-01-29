import React, { useState } from "react";
import { toast } from "react-toastify";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

interface ProductCardProps {
  product: Product;
  onDelete: (productId: number) => void;
  onEdit: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(product.title);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setShowModal(true);
    setEditedTitle(product.title);
  };

  const handleSave = async () => {
    const respose = await fetch(
      `https://dummyjson.com/products/${product.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editedTitle }),
      }
    );
    if (respose.ok) {
      toast.success("Product updated successfully");
      setIsEditing(false);
      setShowModal(false);
    } else {
      toast.error("Failed to update product");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditedTitle(product.title);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-32 w-full object-cover rounded"
      />
      <h3 className="font-bold text-lg mt-2">{product.title}</h3>
      <p className="text-gray-600 text-sm">{product.description}</p>
      <p className="text-blue-600 font-bold mt-2">${product.price}</p>

      <button
        className="bg-green-500 text-white m-4 p-2 rounded hover:bg-green-600 transition"
        onClick={() => {
          handleEdit();
          onEdit(product.id);
        }}
      >
        Edit
      </button>
      <button
        className="bg-red-500 text-white mt-4 p-2 rounded hover:bg-red-600 transition"
        onClick={() => onDelete(product.id)}
      >
        Delete
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Product Title</h2>
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              className="p-2 border rounded-lg w-full"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mr-2"
              >
                Save
              </button>
              <button
                onClick={handleModalClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
