import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  // filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // : { field: "status", value: filterValue, method: "gte" }; // this is an example of using a different method than the default "eq" for filtering. Furthermore, for multiple fields, use an array of objects

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter], // this works like useEffect's dependency array where everytime value updates, the query will be re-fetched
    queryFn: () => getBookings({ filter }),
  });
  // queryFn must return a Promise.

  return { isLoading, bookings, error };
}
