"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-gray-900">
          E-Commerce
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/products" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            {t('common.products')}
          </Link>
          <Link href="/cart" className="relative text-gray-600 hover:text-blue-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.953.693 1.953H17m-3.4 3h6.8c.82 0 1.6-.5 1.6-1.5 0-.82-.5-1.6-1.5-1.6l-.3.3M7.4 20h3.8c.82 0 1.6-.5 1.6-1.5 0-.82-.5-1.6-1.5-1.6l-.3.3"
              />
            </svg>
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => changeLanguage('tr')}
              className={`font-medium ${i18n.language === 'tr' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              TR
            </button>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => changeLanguage('en')}
              className={`font-medium ${i18n.language === 'en' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}