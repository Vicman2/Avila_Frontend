export const GET_PRODUCTS = "GET_PRODUCTS";

export const companyProduct = (payload) => {
  return { type: GET_PRODUCTS, payload };
};
