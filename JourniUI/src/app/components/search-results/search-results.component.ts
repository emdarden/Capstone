import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchResultsService } from 'src/app/services/search-results.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  private searchResultSubscription: Subscription;
  searchResults;

  constructor(private searchResultsService: SearchResultsService) { }

  ngOnInit(): void {
    this.searchResultSubscription = this.searchResultsService.searchResults().subscribe(results => {
      this.searchResults = results;
      console.log(this.searchResults);
    })

  }

}
