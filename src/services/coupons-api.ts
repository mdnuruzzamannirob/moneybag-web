import { baseApi } from './base-api';

export interface Coupon {
  code: string;
  discountPercent: number;
  validUntil: string;
  isActive: boolean;
}

export const couponsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    validateCoupon: builder.mutation<Coupon, { code: string }>({
      query: (body) => ({
        url: '/coupons/validate',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useValidateCouponMutation } = couponsApi;
