import axios from "axios";

// একবার ইনস্ট্যান্স তৈরি করলে এটা সব জায়গায় ব্যবহার করা যাবে
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;