import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
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

  // pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // query
  const {
    isLoading,
    data: { data: bookings, count } = {}, // see below
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // this works like useEffect's dependency array where everytime value updates, the query will be re-fetched
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  // queryFn must return a Promise.

  // and then we destruct data because it's initially "undefined"
  // const bookings = data?.data || [];
  // const count = data?.count || 0;
  // instead of the aboves, we achieved the same thing by using setting default of an empty object {}

  // pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, error, count };
}
