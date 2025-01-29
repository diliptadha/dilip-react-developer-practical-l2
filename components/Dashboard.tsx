"use client";

import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "@/utils/localstorage";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const [itemsPerPage] = useState(9);

  // Fetch products from DummyJSON API
  useEffect(() => {
    const user = JSON.parse(getFromLocalStorage("loggedUser") || "{}");
    setName(user.fullname);

    const fetchProducts = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products || []);
    };
    fetchProducts();
  }, []);

  // Filtered and paginated products
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handleDelete = async (productId: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await fetch(`https://dummyjson.com/products/${productId}`, {
        method: "DELETE",
      });
      setProducts((prev) => prev.filter((product) => product.id !== productId));
    }
  };

  const handleEdit = async (productId: number) => {};

  const router = useRouter();
  useEffect(() => {
    const user = getFromLocalStorage("loggedUser");
    if (!user) {
      router.push("/login");
    }
  });

  const handleLogout = () => {
    removeFromLocalStorage("loggedUser");
    router.push("/login");
    toast.success("Logout successful");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, {name}!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white mt-4 p-2 rounded hover:bg-red-600 transition ml-auto"
        >
          logout
        </button>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border rounded-lg w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
      <Pagination
        length={filteredProducts.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default Dashboard;
