import { Component, Input, OnInit } from '@angular/core';
import { TmdbMovieCreditsItem, TMDB_IMAGE_BASE_PATH } from '@app/core/models/tmdb-results.models';

@Component({
  selector: 'app-movie-highlighted',
  templateUrl: './movie-highlighted.component.html',
  styleUrls: ['./movie-highlighted.component.scss'],
})
export class MovieHighlightedComponent implements OnInit {
  @Input() movie: TmdbMovieCreditsItem;
  @Input() title: string;

  TMDB_IMAGE_BASE_PATH = TMDB_IMAGE_BASE_PATH;

  constructor() {}

  ngOnInit(): void {}
}
