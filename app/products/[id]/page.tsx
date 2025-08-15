"use client";

import { useGetProductByIdQuery } from "@/store/services/productsApi";
import { useParams } from 'next/navigation';
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { useTranslation } from "react-i18next";

export default function ProductDetailPage() {
  const { t } = useTranslation();
  const params = useParams();
  const id = params.id as string;
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();

  if (isLoading) {
    return <div className="text-center mt-10">{t('HomePage.loading')}</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{t('HomePage.error')}</div>;
  }

  if (!product) {
    return <div className="text-center mt-10">{t('HomePage.error')}</div>;
  }

  return (
    <div className="container mx-auto p-8 flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 bg-white rounded-lg shadow-md">
        <img src={product.image} alt={product.title} className="max-w-full max-h-96 object-contain" />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
        <p className="text-gray-600 text-lg mb-6">{product.description}</p>
        <p className="text-3xl font-extrabold text-blue-600 mb-6">${product.price.toFixed(2)}</p>
        <p className="text-gray-500 mb-4">{t('ProductDetail.category')}: <span className="font-semibold">{product.category}</span></p>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="w-full md:w-auto bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
        >
          {t('ProductDetail.addToCart')}
        </button>
      </div>
    </div>
  );
}