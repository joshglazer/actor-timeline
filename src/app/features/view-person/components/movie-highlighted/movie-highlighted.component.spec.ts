import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieHighlightedComponent } from './movie-highlighted.component';

describe('MovieHighlightedComponent', () => {
  let component: MovieHighlightedComponent;
  let fixture: ComponentFixture<MovieHighlightedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieHighlightedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieHighlightedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
