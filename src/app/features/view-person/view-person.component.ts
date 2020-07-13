import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TmdbApiService } from '../../core/services/tmdb-api/tmdbApi.service';
import { TmdbMovieCredits, TmdbPerson } from '../../core/models/tmdb-results.models';

@Component({
  selector: 'app-view-person',
  templateUrl: './view-person.component.html',
  styleUrls: ['./view-person.component.scss'],
})
export class ViewPersonComponent implements OnInit {
  private personID: number;

  public person: TmdbPerson;
  public movies: TmdbMovieCredits;

  constructor(private route: ActivatedRoute, private tmdbApiService: TmdbApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.personID = params.personID;
      this.loadPerson();
      this.loadMovieCredits();
    });
  }

  loadPerson(): void {
    this.tmdbApiService.getPersonDetails(this.personID).subscribe((person: any) => {
      this.person = person;
    });
  }

  loadMovieCredits(): void {
    this.tmdbApiService.searchForMoviesByPersonID(this.personID).subscribe((movies: TmdbMovieCredits) => {
      this.movies = movies;
    });
  }
}
