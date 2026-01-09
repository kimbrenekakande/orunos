import axios from "axios";
import useSWR from "swr";
import baseUrl from "./base-url";

export function axiosInstance() {
  baseURL: baseUrl;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export default fetcher;

const { data } = useSWR("/api/papers/fetch?id=90");
