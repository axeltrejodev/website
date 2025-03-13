import { client, IMAGE_URL_PREFIX } from "./api";
import { type Type, type Result } from "../types";

async function search(type: Type, query: string): Promise<Result[]> {
  if (type == "movies") {
    const res = await client.search.movies({ query: query });
    return res.results.map((result) => ({
      id: result.id,
      primary: result.title,
      secondary: result.release_date,
      image: IMAGE_URL_PREFIX + result.poster_path,
    }));
  } else if (type == "tv-shows") {
    const res = await client.search.tvShows({ query: query });
    return res.results.map((result) => ({
      id: result.id,
      primary: result.name,
      secondary: result.first_air_date,
      image: IMAGE_URL_PREFIX + result.poster_path,
    }));
  } else if (type == "people") {
    const res = await client.search.people({ query: query });
    return res.results.map((result) => ({
      id: result.id,
      primary: result.name,
      secondary:
        result.gender == 0
          ? "Not specified"
          : result.gender == 1
          ? "Female"
          : result.gender == 2
          ? "Male"
          : "Non-binary",
      image: IMAGE_URL_PREFIX + result.profile_path,
    }));
  }
  return [];
}

export default search;
