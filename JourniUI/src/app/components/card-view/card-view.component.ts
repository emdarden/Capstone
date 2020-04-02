import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchResultsService } from 'src/app/services/search-results.service';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {

  private searchResultSubscription: Subscription;
  searchResults;

  constructor(private searchResultsService: SearchResultsService) { }

  ngOnInit(): void {
    console.log(this.searchResults)
    this.searchResultSubscription = this.searchResultsService.searchResults().subscribe(results => {
      this.searchResults = results;
    })

  }
}
