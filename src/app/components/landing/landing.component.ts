import { ApiResponse, UserDetails } from './../../core/models/response.model';
import { Component, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  searchTerm!: string;
  start: number = 1;
  stop: number = 9;
  itemsPerPage: number = 9;

  details!: ApiResponse;
  backDisabled = true;
  forwardEnabled = false;

  isLoading: boolean = false;
  githubHome: string = 'http://github.com/'

  private subscriptions$: Subscription[] = [];

  i = 0;

  constructor(
    private readonly searchService: SearchService,
    private readonly toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  resetPage(){
    window.location.reload()
  }

  searchUser(): void{
    if (this.searchTerm.length < 2) {
      this.toastrService.warning('Please enter a longer search term');
      return;
    } else if (this.searchTerm.length < 3) {
      this.toastrService.info('Short search terms will produce lots of results');
    }

    this.details = {
      total_count: 0,
      incomplete_results: true,
      items: []

    };
    this.isLoading = true;

    this.fetchApiCall()
  }

  fetchApiCall(){

    let filters = {
      q: this?.searchTerm,
      page: this.start.toString(),
      per_page: this.itemsPerPage.toString()
    }

    this.subscriptions$.push(this.searchService.searchUsers(filters).subscribe(
      (response: ApiResponse) => {
        this.details = response;
          this.details.items.forEach(element => this.specificUserDetails(element.url || this.githubHome ));     

        this.toastrService.success('Successfully fetched users list');
      }, (error) => {
        this.toastrService.error('Error encountered');
      }
    ));
  }

  specificUserDetails(userUrl: string): void{
    this.i = 0;
    this.subscriptions$.push(this.searchService.specificSearch(userUrl).subscribe(
      (response: UserDetails) => {

        this.details.items[this.i] = {
          userDetails: response
        };
        this.i++;
        this.isLoading = false;
        return;
        
      }, (error) => {
        this.toastrService.error('Error encountered');
      }
    ));
  }

  paginationHandler(pagePassed: number): void{
    this.start = pagePassed;
    window.scroll(0,0);
    this.searchUser();
  }

  @HostListener('unloaded')
  ngOnDestroy(){
    this.subscriptions$.forEach(
      subscription => subscription.unsubscribe()
    );
  }

}
