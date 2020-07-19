import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TmdbApiService } from '../../core/services/tmdb-api/tmdbApi.service';
import { TmdbMovieCredits, TmdbPerson } from '../../core/models/tmdb-results.models';

import { AxisModel } from '@syncfusion/ej2-angular-charts';

interface ChartData {
  x: Date;
  y: number;
}

interface ChartAxis {
  title: string;
  valueType?: string;
  labelFormat?: string;
}

@Component({
  selector: 'app-view-person',
  templateUrl: './view-person.component.html',
  styleUrls: ['./view-person.component.scss'],
})
export class ViewPersonComponent implements OnInit {
  private personID: number;

  public person: TmdbPerson;
  public movies: TmdbMovieCredits;

  public moviesChartDataRaw: ChartData[];
  public moviesChartDataYear: ChartData[];

  public title: string;
  public primaryXAxis: AxisModel;
  public primaryYAxis: AxisModel;

  constructor(private route: ActivatedRoute, private tmdbApiService: TmdbApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.personID = params.personID;
      this.loadPerson();
      this.loadMovieCredits();
    });

    this.primaryXAxis = {
      valueType: 'DateTime',
      title: 'Movie Release Dates',
      labelFormat: 'yMMM',
    };
    this.primaryYAxis = {
      title: 'Ratings',
    };
    this.title = 'Ratings over Time';
  }

  loadPerson(): void {
    this.tmdbApiService.getPersonDetails(this.personID).subscribe((person: any) => {
      this.person = person;
    });
  }

  loadMovieCredits(): void {
    this.tmdbApiService.searchForMoviesByPersonID(this.personID).subscribe((movies: TmdbMovieCredits) => {
      this.movies = movies;
      const moviesChartDataUnsorted = [];
      for (const movie of movies.cast) {
        if (movie.release_date !== '' && movie.release_date !== undefined && movie.vote_count > 0) {
          const releaseDate = movie.release_date.split('-');
          const releaseDatePersed = new Date(
            parseInt(releaseDate[0], 10),
            parseInt(releaseDate[1], 10),
            parseInt(releaseDate[2], 10)
          );
          moviesChartDataUnsorted.push({
            x: releaseDatePersed,
            y: movie.vote_average,
          });
        }
      }
      this.moviesChartDataRaw = moviesChartDataUnsorted.sort((a, b) => (a.x > b.x ? 1 : -1));
    });
  }
}
