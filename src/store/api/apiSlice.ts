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
        // ── Products ─────────────────────────────────────────
        getProducts: builder.query<any[], any>({
            query: (params) => ({ url: '/products/', params }),
            providesTags: ['Product'],
        }),
        getProduct: builder.query<any, string>({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),

        // ── Orders ────────────────────────────────────────────
        getOrders: builder.query<any[], void>({
            query: () => '/orders/',
            providesTags: ['Order'],
        }),
        getOrder: builder.query<any, string>({
            query: (id) => `/orders/${id}`,
            providesTags: (result, error, id) => [{ type: 'Order', id }],
        }),
        cancelOrder: builder.mutation<any, string>({
            query: (id) => ({ url: `/orders/${id}/cancel`, method: 'PATCH' }),
            invalidatesTags: ['Order'],
        }),

        // ── Custom Orders ─────────────────────────────────────
        getMyCustomOrders: builder.query<any[], void>({
            query: () => '/custom-orders/my',
            providesTags: ['CustomOrder'],
        }),
        createCustomOrder: builder.mutation<any, any>({
            query: (body) => ({ url: '/custom-orders/', method: 'POST', body }),
            invalidatesTags: ['CustomOrder'],
        }),
        acceptCustomOrderQuote: builder.mutation<any, string>({
            query: (id) => ({ url: `/custom-orders/${id}/accept`, method: 'PATCH' }),
            invalidatesTags: ['CustomOrder'],
        }),

        // ── Shipments ─────────────────────────────────────────
        getShipment: builder.query<any, string>({
            query: (orderId) => `/shipments/${orderId}`,
            providesTags: (result, error, id) => [{ type: 'Shipment', id }],
        }),

        // ── Admin ─────────────────────────────────────────────
        getAdminStats: builder.query<any, void>({
            query: () => '/admin/stats',
            providesTags: ['User', 'Order'],
        }),
        getAllSellers: builder.query<any[], void>({
            query: () => '/admin/sellers',
            providesTags: ['User'],
        }),
        getAdminOrders: builder.query<any[], void>({
            query: () => '/orders/',
            providesTags: ['Order'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useGetOrdersQuery,
    useGetOrderQuery,
    useCancelOrderMutation,
    useGetMyCustomOrdersQuery,
    useCreateCustomOrderMutation,
    useAcceptCustomOrderQuoteMutation,
    useGetShipmentQuery,
    useGetAdminStatsQuery,
    useGetAllSellersQuery,
    useGetAdminOrdersQuery,
} = apiSlice;
