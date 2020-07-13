export interface TmdbSearchPersonResults {
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

export interface TmdbMovieCredits {
  cast: {
    adult: boolean;
    backdrop_path: string;
    character: string;
    credit_id: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
  crew: {
    adult: boolean;
    backdrop_path: string;
    credit_id: string;
    department: string;
    genre_ids: number[];
    id: number;
    job: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
}

export interface TmdbPerson {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: number;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export const TMDB_IMAGE_BASE_PATH = 'https://image.tmdb.org/t/p/w300/';
