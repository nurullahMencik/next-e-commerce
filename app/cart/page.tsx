"use client";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeFromCart, incrementQuantity, decrementQuantity } from '@/store/slices/cartSlice';
import Link from 'next/link';
import { useTranslation } from "react-i18next";

export default function CartPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-10 p-4">
        <h1 className="text-3xl font-bold mb-4">{t('CartPage.title')}</h1>
        <p className="text-gray-600">{t('CartPage.emptyCart')}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8">{t('CartPage.title')}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4 mb-4 last:border-b-0 last:pb-0">
            <div className="flex items-center">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
              <div className="ml-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <button onClick={() => dispatch(decrementQuantity(item.id))} className="p-2 hover:bg-gray-100">-</button>
                <span className="p-2">{item.quantity}</span>
                <button onClick={() => dispatch(incrementQuantity(item.id))} className="p-2 hover:bg-gray-100">+</button>
              </div>
              <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500 hover:text-red-700">{t('CartPage.remove')}</button>
            </div>
          </div>
        ))}
        <div className="mt-8 pt-4 border-t-2 border-gray-200">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>{t('CartPage.total')}:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
        <Link href="/checkout">
          <button className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
            {t('CartPage.checkout')}
          </button>
        </Link>
      </div>
    </div>
  );
}