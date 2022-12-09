import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function useQuery() {
  const { search } = useLocation();

  //so sera executada quando search for alterada..
  return useMemo(() => new URLSearchParams(search), [search]);
}
