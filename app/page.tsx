"use client";

import { useGetProductsQuery } from "@/store/services/productsApi";
import { useEffect } from "react";
import { Product } from "./types";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import Link from 'next/link';
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();
  const { data, error, isLoading } = useGetProductsQuery(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      console.log("API'den gelen veriler:", data);
    }
  }, [data]);

  if (isLoading) {
    return <div className="text-center mt-10">{t('HomePage.loading')}</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{t('HomePage.error')}</div>;
  }

  const featuredProducts: Product[] = data?.slice(0, 4) || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8">{t('HomePage.title')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product: Product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="block">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">{product.title}</h2>
                <p className="text-gray-600 text-lg font-bold">{t('HomePage.price')}: ${product.price.toFixed(2)}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(addToCart(product));
                  }}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
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