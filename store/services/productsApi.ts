import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "./../../app/types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], undefined>({
      query: () => "products",
    }),
    // Tek bir ürünü çekmek için yeni endpoint
    getProductById: builder.query<Product, string>({
      query: (id) => `products/${id}`,
    }),
  }),
});


export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;