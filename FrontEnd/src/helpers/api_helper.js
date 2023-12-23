import axios from "axios";

// default
//axios.defaults.baseURL = "https://client-api.fatoorah.sa/Auth_general";
axios.defaults.baseURL = "https://db-prod.grandtransfer.io";

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";
// add a

// content type
const token = JSON?.parse(localStorage?.getItem("authUser"))
  ? JSON?.parse(localStorage?.getItem("authUser"))?.data?.token
  : null;
if (token) axios.defaults.headers.common["Authorization"] = "Bearer " + token;




class APIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  get = (url, params) => {
    let response;

    let paramKeys = [];

    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });

      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };
  /**
   * post given data to url
   */
  create = (url, data) => {
    return axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.patch(url, data);
  };

  put = (url, data) => {
    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url, config) => {
    return axios.delete(url, { ...config });
  };
}

export { APIClient};
