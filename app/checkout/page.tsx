"use client";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { clearCart } from './../../store/slices/cartSlice';

export default function CheckoutPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });
  
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };
  
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert(t('CheckoutPage.alertEmpty'));
      return;
    }

    if (!formData.name || !formData.email || !formData.address) {
      alert(t('CheckoutPage.alertFillInfo'));
      return;
    }

    alert(t('CheckoutPage.alertSuccess'));
    dispatch(clearCart()); // Sepeti temizle
    router.push('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8">{t('CheckoutPage.title')}</h1>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">{t('CheckoutPage.orderSummary')}</h2>
        <ul className="mb-6 border-b pb-4">
          {cartItems.map(item => (
            <li key={item.id} className="flex justify-between items-center py-2">
              <span>{item.title} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center text-xl font-bold mb-8">
          <span>{t('CartPage.total')}:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>

        <h2 className="text-2xl font-semibold mb-6">{t('CheckoutPage.deliveryInfo')}</h2>
        <form onSubmit={handleCheckout} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">{t('CheckoutPage.fullName')}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">{t('CheckoutPage.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700 font-medium">{t('CheckoutPage.address')}</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            {t('CheckoutPage.completePayment')}
          </button>
        </form>
      </div>
    </div>
  );
}