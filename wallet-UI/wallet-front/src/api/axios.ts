import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  globalErrorHandler?: boolean;
}

interface APIErrorResponse {
  message: string;
  errors?: any;
  data?: any;
  details?: any;
}
// export const BASE_URL = process.env.REACT_APP_API_KEY;
// export const BASE_URL_APP_VERSION = `${BASE_URL}`;

export const BASE_URL = process.env.REACT_APP_API_KEY;
console.log("BASE_URL:", BASE_URL); // اضافه کردن این خط

export const BASE_URL_APP_VERSION = `${BASE_URL}`;
console.log("BASE_URL_APP_VERSION:", BASE_URL_APP_VERSION); // اضافه کردن این خط



function handleError(error: AxiosError<APIErrorResponse>) {
  const config = error.config as CustomAxiosRequestConfig;
  if (config.globalErrorHandler === false) {
    return;
  }

  if (error.response) {
    switch (error?.response?.status) {
      case 400:
        if (error.response.data?.details[0].message) {
          toast.warning(` ${error.response.data?.details[0].message}`);
        } else if (error.response.data?.message) {
          toast.warning(
            `${error.response.data?.message}
         `
          );
        } else {
          toast.warning(
            `${error.message}
         `
          );
        }
        break;
      case 401:
        if (error.response.data?.details[0]) {
          toast.error(` ${error.response.data?.details[0].message}`);
        } else {
          toast.error(
            "شما به این بخش دسترسی ندارید. " + error.response.data?.message
          );
        }

        break;
      case 403:
        if (error.response.data?.details[0]) {
          toast.error(` ${error.response.data?.details[0].message}`);
        } else {
          toast.error("مشکلی پیش آمده است. " + error.response.data?.message);
        }
        break;
      case 404:
        if (error.response.data?.details[0]) {
          toast.error(` ${error.response.data?.details[0].message}`);
        } else {
          toast.error(
            "خطای 404: یافت نشد. " + error.response.data?.message ||
              (error?.name as string)
          );
        }
        break;
      case 500:
        console.error(
          "Error 500: Internal Server Error. " + error.response.data?.message
        );
        toast.error("ارتباط با سرور به درستی برقرار نشد");
        break;
      case 502:
        console.error(
          "Error 502: Internal Server Error. " + error.response.data?.message
        );
        toast.info("سامانه در حال بروزرسانی است. شکیبا باشید");
        break;
      default:
        toast.error(
          `Error ${error.response?.status}: ${error.response.statusText}`
        );
    }
    return;
  }
  if (error.request) {
    toast.error("error . request");
    return;
  }
  if (error.message) {
    toast.error("error . message");
    return;
  }
  if (error.code === "ECONNABORTED") {
    toast.error("تایم اوت.");
  }
  if (error.code === "ERR_NETWORK") {
    toast.error("لطفا اتصال به اینترنت خود را بررسی نمایید.");
    return;
  } else {
    console.error(error.message || "An unknown error occurred.");
  }

  console.error("Global Error Handler:", error);
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    handleError(error);
    return Promise.reject(error);
  }
);

const axiosInstance = axios.create({
  baseURL: BASE_URL_APP_VERSION,
  timeout: 60000,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL_APP_VERSION,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en-US,en",
  },
  withCredentials: true,
  timeout: 60000,
});

const instances = [axiosPrivate];
instances.forEach((instance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      handleError(error);
      return Promise.reject(error);
    }
  );
});

export default axiosInstance;
