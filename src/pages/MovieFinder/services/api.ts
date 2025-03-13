import { TMDB } from "tmdb-ts";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTY2OGM1MjYzMzBlNDExODAwMTFmNjkwY2I5NDY2OSIsIm5iZiI6MTc0MTU4NjczMS41NTAwMDAyLCJzdWIiOiI2N2NlODEyYjU5YWUwM2VmZTMyYWFmNjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0oSjNxBu8sCp53oCr-BNAaBXLLdoT87Bzcpo0ZX5w20";

export const IMAGE_URL_PREFIX = "https://image.tmdb.org/t/p/w500/";

export const client = new TMDB(API_KEY);
