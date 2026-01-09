import useSWR from "swr";
import baseUrl from "@/lib/base-url";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const id = 89;

function Work(id) {
  const { data, error, isLoading } = useSWR(
    `${baseUrl}/api/papers/fetch?id=${id}`,
    fetcher,
    { refreshInterval: data?.status === "generating" ? 10 : 0 },
  );
}
