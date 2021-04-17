import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { AxisModel } from '@syncfusion/ej2-angular-charts';
import { forkJoin } from 'rxjs';
import {
  TmdbMovieCredits,
  TmdbMovieCreditsItem,
  TmdbPerson,
  TMDB_IMAGE_BASE_PATH,
} from '../../core/models/tmdb-results.models';
import { TmdbApiService } from '../../core/services/tmdb-api/tmdbApi.service';
import { ChartData, Comparison, ComparisonDirectionEnum, DataTableRow } from './models/view-person.models';

@Component({
  selector: 'app-view-person',
  templateUrl: './view-person.component.html',
  styleUrls: ['./view-person.component.scss'],
})
export class ViewPersonComponent implements OnInit {
  private personID: number;

  public person: TmdbPerson;
  public movies: TmdbMovieCreditsItem[];

  public highestRatedMovie: TmdbMovieCreditsItem;
  public lowestRatedMovie: TmdbMovieCreditsItem;

  public moviesChartDataRaw: ChartData[] = [];
  public moviesChartDataYear: ChartData[] = [];

  public title: string;
  public primaryXAxis: AxisModel;
  public primaryYAxis: AxisModel;

  public TMDB_IMAGE_BASE_PATH = TMDB_IMAGE_BASE_PATH;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['title', 'releaseDate', 'rating', 'comparison'];
  tableDataSource: MatTableDataSource<DataTableRow>;

  ComparisonDirectionEnum = ComparisonDirectionEnum;

  comparisonClassMap = {
    [ComparisonDirectionEnum.UP]: 'comparison-up',
    [ComparisonDirectionEnum.DOWN]: 'comparison-down',
  };

  constructor(private route: ActivatedRoute, private tmdbApiService: TmdbApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.personID = params.personID;
      this.loadData();
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

  private loadData(): void {
    forkJoin({
      person: this.tmdbApiService.getPersonDetails(this.personID),
      movies: this.tmdbApiService.searchForMoviesByPersonID(this.personID),
    }).subscribe(({ person, movies }) => {
      this.person = person;
      this.parseMovies(movies);
    });
  }

  parseMovies(movies: TmdbMovieCredits): void {
    this.movies = movies.cast.sort((a, b) => (a.release_date > b.release_date ? 1 : -1));

    // Remove movies with incomplete data
    this.movies = this.movies.filter((movie) => movie.release_date && movie.vote_count > 0);

    // Remove movies where the actor is playing themselves or no character is specified
    const charactersToRemove = ['himself', 'self', '', this.person?.name.toLowerCase() ?? ''];
    this.movies = this.movies.filter((movie) => !charactersToRemove.includes(movie.character?.toLowerCase() ?? ''));
    const dataSource: DataTableRow[] = [];

    let lastRating = null;

    for (const movie of this.movies) {
      // Format Date
      const releaseDate = movie.release_date.split('-');
      const releaseDateParsed = new Date(
        parseInt(releaseDate[0], 10),
        parseInt(releaseDate[1], 10),
        parseInt(releaseDate[2], 10)
      );

      // Add Data to Chart
      this.moviesChartDataRaw.push({
        x: releaseDateParsed,
        y: movie.vote_average,
      });

      // Calculate Comparison
      let comparison: Comparison | null = null;
      if (lastRating) {
        const amount = lastRating - movie.vote_average;
        comparison = {
          amount: Math.round(Math.abs(amount) * 10) / 10,
          direction: amount > 0 ? ComparisonDirectionEnum.DOWN : ComparisonDirectionEnum.UP,
        };
      }
      lastRating = movie.vote_average;

      // Determine movie statistics
      if (!this.lowestRatedMovie || this.lowestRatedMovie.vote_average > movie.vote_average) {
        this.lowestRatedMovie = movie;
      }

      if (!this.highestRatedMovie || this.highestRatedMovie.vote_average < movie.vote_average) {
        this.highestRatedMovie = movie;
      }

      // Add data to table
      dataSource.push({
        title: movie.original_title,
        releaseDate: releaseDateParsed,
        rating: movie.vote_average,
        comparison,
      });
    }

    this.tableDataSource = new MatTableDataSource(dataSource);
    this.tableDataSource.sort = this.sort;
  }

  getComparisonClass(comparison: Comparison): string {
    if (comparison) {
      return this.comparisonClassMap[comparison.direction];
    } else {
      return 'comparison-none';
    }
  }
}
