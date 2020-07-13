export class TmdbSearchPersonResults {
  page: number;
  results: {
    adult: boolean;
    gender: number;
    id: number;
    known_for: any[];
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
  }[];
  total_pages: number;
  total_results: number;
}

export const TMDB_IMAGE_BASE_PATH = 'https://image.tmdb.org/t/p/w300/';
