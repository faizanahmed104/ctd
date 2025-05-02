import { createAsyncThunk } from '@reduxjs/toolkit';

export const createFetcher = (name, fetcherFunc) => {
  return createAsyncThunk(
    name,
    async (_, { fulfillWithValue, rejectWithValue }) => {
      try {
        const res = await fetcherFunc();
        return fulfillWithValue(res);
      } catch (error) {
        return rejectWithValue(error);
      }
    },
  );
};

export const createQuery = (filters, mapping) => {
  let queryParams = '?';
  for (const key in filters) {
    if (filters[key] && filters[key] !== 'All') {
      const queryKey = mapping[key];
      if (queryKey) {
        if (Array.isArray(filters[key])) {
          queryParams += `${queryKey}=${filters[key].join(',')}&`;
        } else {
          queryParams += `${queryKey}=${filters[key]}&`;
        }
      }
    }
  }
  if (queryParams.endsWith('&')) {
    queryParams = queryParams.slice(0, -1);
  }
  return queryParams;
};

export const omit = (
  key,
  obj,
) => {
  const { [key]: omitted, ...rest } = obj;
  return rest;
};

const toCamelCase = (str) => {
  return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
};

export const mapKeysToCamelCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(v => mapKeysToCamelCase(v));
  } else if (obj && typeof obj === 'object' && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      const camelCaseKey = toCamelCase(key);
      acc[camelCaseKey] = mapKeysToCamelCase(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};

export const generateYears = (startYear = 2000) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push({ label: year.toString(), value: year });
  }
  return years;
};