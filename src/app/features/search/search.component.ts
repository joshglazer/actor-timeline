import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TmdbService } from './../../core/services/tmdb/tmdb.service';
import { TmdbSearchPersonResults, TMDB_IMAGE_BASE_PATH } from '../../core/models/tmdb-results.models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public searchForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  public searchResults: TmdbSearchPersonResults;

  public TMDB_IMAGE_BASE_PATH = TMDB_IMAGE_BASE_PATH;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {}

  public onSearch(): void {
    const actorName = this.searchForm.get('name');
    if (actorName) {
      this.tmdbService.searchForActor(actorName.value).subscribe((data) => {
        this.searchResults = data;
      });
    }
  }
}
