import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TmdbApiService } from './../../core/services/tmdb-api/tmdbApi.service';
import { TmdbSearchPersonResults, TMDB_IMAGE_BASE_PATH } from '../../core/models/tmdb-results.models';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private tmdbApiService: TmdbApiService) {}

  ngOnInit(): void {}

  public onSearch(): void {
    const actorName = this.searchForm.get('name');
    if (actorName) {
      this.tmdbApiService.searchForPerson(actorName.value).subscribe((data) => {
        this.searchResults = data;
        if (this.searchResults.total_results === 1) {
          this.selectPerson(this.searchResults.results[0].id);
        }
      });
    }
  }

  public selectPerson(personID: number): void {
    this.router.navigate(['viewPerson', personID]);
  }
}
