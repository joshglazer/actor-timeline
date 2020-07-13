import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { TmdbSearchPersonResults } from '../../models/tmdb-results.models';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  tmdbApiUrl = 'https://api.themoviedb.org/3/';
  queryParamsDefault = {
    language: 'en-US',
    api_key: environment.tmdbApiKey,
  };

  constructor(private http: HttpClient) {}

  // Spotify API call to retrieve profile information
  searchForActor(name: string, page: string = '1'): Observable<TmdbSearchPersonResults> {
    const searchUrl = `${this.tmdbApiUrl}search/person`;
    console.log(searchUrl, name);
    const params = {
      ...this.queryParamsDefault,
      page,
      query: name,
      include_adult: 'false',
    };
    console.log(params);
    return this.http.get<TmdbSearchPersonResults>(searchUrl, { params });
  }
}
