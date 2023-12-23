import React, { useState, useEffect } from "react";

const ProductCard = ({ product, onToggleSelect, selectedProducts }) => {
  const [backgroundColors, setBackgroundColors] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [randomColorIndex, setRandomColorIndex] = useState(0);

  useEffect(() => {
    setIsSelected(selectedProducts?.includes(product.id));
  }, [selectedProducts]);

  const handleToggle = () => {
    setIsSelected(!isSelected);
    onToggleSelect(product.id, !isSelected);
  };

  useEffect(() => {
    const colors = [
      "bg-gradient-to-br from-gray-800 to-gray-900",
      "bg-gradient-to-br from-purple-800 to-indigo-900",
      "bg-gradient-to-br from-red-800 to-pink-900",
      "bg-gradient-to-br from-green-800 to-teal-900",
      "bg-gradient-to-br from-blue-800 to-cyan-900",
      "bg-gradient-to-br from-yellow-800 to-orange-900",
      "bg-gradient-to-br from-fuchsia-800 to-rose-900",
      "bg-gradient-to-br from-amber-800 to-lime-900",
    ];
    const randomColors = Array.from(
      { length: 8 },
      () => colors[Math.floor(Math.random() * colors.length)]
    );
    setBackgroundColors(randomColors);
  }, []);

  const renderAttribute = () => {
    if (product.type === "DVD") {
      return `Size: ${product.size} MB`;
    } else if (product.type == "Book") {
      return `Weight: ${product.weight} Kg`;
    } else if (product.type == "Furniture") {
      return `Dimensions: ${product.height} x ${product.width} x ${product.length}`;
    }
    return "Invalid product type";
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundColors.length);
    setRandomColorIndex(randomIndex);
  }, [product.id, backgroundColors]);
  return (
    <div>
      <div className="relative">
        <div
          onClick={handleToggle}
          className={`
    p-6 text-center transform duration-500 hover:-translate-y-2 cursor-pointer rounded-xl shadow-xl overflow-hidden relative 
    ${backgroundColors[randomColorIndex]}
    ${isSelected ? "border-4 border-red-500 scale-105" : ""}
  `}
        >
          <div className="flex items-center me-4">
            <input
              checked={isSelected}
              id={`checkbox-${product.id}"`}
              type="checkbox"
              value=""
              className="w-6 h-6 text-red-600 bg-red-100 border-red-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={handleToggle}
            />
          </div>
          <p className="mb-2 text-gray-100 font-semibold">SKU: {product.sku}</p>
          <h1 className="text-3xl my-2 font-bold text-white">{product.name}</h1>
          <h2 className="mb-4 text-2xl font-semibold text-white">
            ${product.price}
          </h2>
          <p className="text-lg font-bold text-white">{renderAttribute()}</p>
          <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-gray-100 via-gray-100 to-transparent"></div>
          <div className="absolute top-0 -left-4 h-12 w-12 rounded-full bg-white opacity-50 transform rotate-45"></div>
          <div className="absolute bottom-0 -right-4 h-12 w-12 rounded-full bg-white opacity-50 transform -rotate-45"></div>
        </div>
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
          <div
            className={`w-16 h-16 bg-white rounded-full shadow-xl opacity-75 ${backgroundColors[1]}`}
          ></div>
          <div
            className={`w-12 h-12 bg-white rounded-full shadow-xl opacity-75 ${backgroundColors[2]} -mt-8 ml-8`}
          ></div>
          <div
            className={`w-8 h-8 bg-white rounded-full shadow-xl opacity-75 ${backgroundColors[3]} -mt-6 ml-16`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
