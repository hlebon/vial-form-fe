import { useQuery } from "@tanstack/react-query";
import { https } from "../api/axios";

export function useFetchSubject() {
  return useQuery({
    queryKey: ["subject"],
    queryFn: async () => {
      const { data: response } = await https.get("/subjects");
      const data = response.data;
      return data;
    },
  });
}
