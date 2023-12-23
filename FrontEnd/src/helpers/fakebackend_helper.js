import axios from "axios";
import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// CRUD PRODUCTS

export const getProductsAPI = () => {
  return api.get(url.GET_PRODUCTS);
}


export const createProduct = (data) => {
  return api.create(url.POST_PRODUCT, data);
}



export const deleteMultipleProducts = (ids) => {
  return api.create(url.DELETE_MULTIPLE_PRODUCTS, ids );
}


