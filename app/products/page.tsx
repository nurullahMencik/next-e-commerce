"use client";

import { useGetProductsQuery } from "@/store/services/productsApi";
import { Product } from "../types";
import { useTranslation } from 'react-i18next';
import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import Link from 'next/link';

export default function ProductsPage() {
  const { t } = useTranslation();
  const { data: products, error, isLoading } = useGetProductsQuery(undefined);
  const [filter, setFilter] = useState({ category: 'all', minPrice: 0, maxPrice: 1000, sort: 'none' });
  const dispatch = useDispatch();

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];
    
    let filteredProducts = [...products];
    
    if (filter.category !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category === filter.category);
    }
    
    filteredProducts = filteredProducts.filter(p => p.price >= filter.minPrice && p.price <= filter.maxPrice);

    if (filter.sort === 'price_asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (filter.sort === 'price_desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
    
    return filteredProducts;
  }, [products, filter]);

  if (isLoading) {
    return <div className="text-center mt-10">{t('HomePage.loading')}</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{t('HomePage.error')}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8">{t('ProductsPage.title')}</h1>
      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        <div className="flex flex-col">
          <label htmlFor="category" className="text-gray-700 font-semibold mb-1">{t('ProductsPage.category')}</label>
          <select 
            id="category" 
            value={filter.category} 
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            className="bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm"
          >
            <option value="all">{t('ProductsPage.all')}</option>
            <option value="electronics">Elektronik</option>
            <option value="jewelery">Takı</option>
            <option value="men's clothing">Erkek Giyim</option>
            <option value="women's clothing">Kadın Giyim</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="priceRange" className="text-gray-700 font-semibold mb-1">{t('ProductsPage.priceRange')}</label>
          <input 
            type="range"
            min="0"
            max="1000"
            value={filter.maxPrice}
            onChange={(e) => setFilter({ ...filter, maxPrice: parseInt(e.target.value) })}
            className="w-48"
          />
          <p className="text-sm text-gray-500 mt-1">
            {t('ProductsPage.priceRange')}: ${filter.maxPrice}
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="sort" className="text-gray-700 font-semibold mb-1">{t('ProductsPage.sortBy')}</label>
          <select 
            id="sort" 
            value={filter.sort} 
            onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
            className="bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 sm:text-sm"
          >
            <option value="none">{t('ProductsPage.none')}</option>
            <option value="price_asc">{t('ProductsPage.priceAsc')}</option>
            <option value="price_desc">{t('ProductsPage.priceDesc')}</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map((product: Product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="block">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <img src={product.image} alt={product.title} className="w-full h-56 object-cover" />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">{product.title}</h2>
                <p className="text-gray-600 text-lg font-bold">{t('HomePage.price')}: ${product.price.toFixed(2)}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(addToCart(product));
                  }}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  {t('addToCart')}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}