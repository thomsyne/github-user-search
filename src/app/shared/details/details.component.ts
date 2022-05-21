import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/response.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() details!: ApiResponse;
  @Input() page: number = 1;
  @Input() itemsPerPage: number = 9;

  @Output() pageSelected: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  goBack(): void {
    this.page = this.page - 1;

    this.backDisabled;

    this.pageSelected.emit(this.page);
  }

  goForward(): void {

    this.page = this.page + 1;

    this.pageSelected.emit(this.page);

    this.forwardEnabled;
  }

  get backDisabled(): boolean {
    return true ? this.page === 1 : false;
  }

  get forwardEnabled(): boolean {
    return true ? this.details.total_count > this.page * this.itemsPerPage : false;
  }

  capitalizeFirstLetter(string?: string): string {
    return (string) ? string!.charAt(0).toUpperCase() + string?.slice(1) : 'N.A';
  }

  routeToApi(url: string | URL | undefined): void{
    window.open(url, "_blank");
  }
}
