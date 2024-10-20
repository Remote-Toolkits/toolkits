import moment from "moment";
import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const eventsSearchParamsParser = {
  from: parseAsString.withDefault(moment().format("YYYY-MM-DD")),
  to: parseAsString.withDefault(moment().add(6, "days").format("YYYY-MM-DD")),
};

export const eventsSearchParamsCache = createSearchParamsCache(
  eventsSearchParamsParser,
);
