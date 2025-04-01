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

  // sort
  const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy], // this works like useEffect's dependency array where everytime value updates, the query will be re-fetched
    queryFn: () => getBookings({ filter, sortBy }),
  });
  // queryFn must return a Promise.

  return { isLoading, bookings, error };
}
