import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/common/ProductCard";
import TopButtons from "./Componet/TopButtons";
import {
  deleteMultipleProducts,
  getProductsAPI,
} from "../../helpers/fakebackend_helper";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await getProductsAPI();
    console.log("res", res);
    setProducts(res.data.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleToggleSelect = (productId, isSelected) => {
    if (isSelected) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      const updatedSelection = selectedProducts.filter(
        (id) => id !== productId
      );
      setSelectedProducts(updatedSelection);
    }
  };

  const handleDeleteSelected = async () => {
    const selectedIdsString = selectedProducts.join(",");

    if(selectedIdsString.length === 0) return ;
    const formData = new FormData();
    formData.append("productIds", selectedIdsString);

    const res = await deleteMultipleProducts(formData);

    if (res?.data.success) {
      const updatedProducts = products.filter(
        (product) => !selectedProducts.includes(product.id)
      );

      setProducts(updatedProducts);
      setSelectedProducts([]);
    }
  };

  return (
    <React.Fragment>
      <section className="container mx-auto p-10 md:py-12 md:p-8  min-h-screen px-8">
        <TopButtons
          handleDeleteSelected={handleDeleteSelected}
          selectedProducts={selectedProducts}
        />
        <section className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start ">
          {products.length === 0 && (
            <div className="col-span-full text-center text-2xl font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto mb-4 text-gray-600 animate-bounce"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a1 1 0 011 1v4a1 1 0 01-2 0V5a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <h2 className="text-2xl font-bold mb-2">Oops!</h2>
              <p className="text-gray-600">No products found.</p>
            </div>
          )}
          {products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              selectedProducts={selectedProducts}
              onToggleSelect={handleToggleSelect}
            />
          ))}
        </section>
      </section>
    </React.Fragment>
  );
};

export default Products;
