import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Product', 'Order', 'CustomOrder', 'User', 'Shipment'],
    endpoints: (builder) => ({
        getProducts: builder.query<any[], any>({
            query: (params) => ({
                url: '/products/',
                params,
            }),
            providesTags: ['Product'],
        }),
        getProduct: builder.query<any, string>({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
        getOrders: builder.query<any[], void>({
            query: () => '/orders/',
            providesTags: ['Order'],
        }),
        getOrder: builder.query<any, string>({
            query: (id) => `/orders/${id}`,
            providesTags: (result, error, id) => [{ type: 'Order', id }],
        }),
        getShipment: builder.query<any, string>({
            query: (orderId) => `/shipments/${orderId}`,
            providesTags: (result, error, id) => [{ type: 'Shipment', id }],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useGetOrdersQuery,
    useGetOrderQuery,
    useGetShipmentQuery
} = apiSlice;
