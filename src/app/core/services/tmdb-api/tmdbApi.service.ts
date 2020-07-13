import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { TmdbSearchPersonResults, TmdbMovieCredits, TmdbPerson } from '../../models/tmdb-results.models';

@Injectable({
  providedIn: 'root',
})
export class TmdbApiService {
  tmdbApiUrl = 'https://api.themoviedb.org/3/';
  queryParamsDefault = {
    language: 'en-US',
    api_key: environment.tmdbApiKey,
  };

  constructor(private http: HttpClient) {}

  // TMDB API Call to find person by name
  searchForPerson(name: string, page: string = '1'): Observable<TmdbSearchPersonResults> {
    const searchUrl = `${this.tmdbApiUrl}search/person`;
    const params = {
      ...this.queryParamsDefault,
      page,
      query: name,
      include_adult: 'false',
    };
    return this.http.get<TmdbSearchPersonResults>(searchUrl, { params });
  }

  // TMDB API Call to find all movies that a person worked on
  searchForMoviesByPersonID(personID: number): Observable<TmdbMovieCredits> {
    const searchUrl = `${this.tmdbApiUrl}person/${personID}/movie_credits`;
    return this.http.get<TmdbMovieCredits>(searchUrl, { params: this.queryParamsDefault });
  }

  getPersonDetails(personID: number): Observable<TmdbPerson> {
    const searchUrl = `${this.tmdbApiUrl}person/${personID}`;
    return this.http.get<TmdbPerson>(searchUrl, { params: this.queryParamsDefault });
  }
}
