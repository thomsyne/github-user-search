/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LandingComponent } from './landing.component';
import { SearchService } from 'src/app/core/services/search.service';
import { ApiResponse } from 'src/app/core/models/response.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandingRoutingModule } from './landing-routing.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { mockApiResponse } from 'src/app/core/utils/helper.function';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let searchService: SearchService;
  let mockDetails: ApiResponse;;

  beforeEach(async(() => {
    mockDetails = {
      total_count: 10,
      incomplete_results: false,
      items: [
        {
          login: 'thomsyne',
          avatar_url: 'http://google.com/img.jpg',
          url: 'http://facebook.com',
          userDetails: {
            url: 'http://facebook.com',
            avatar_url: 'http://google.com/img.jpg',
            name: 'Tomisin',
            company: 'Andela',
            followers: 10,
            following: 1,
          }
        }
      ],
    }

    TestBed.configureTestingModule({
      declarations: [ LandingComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        LandingRoutingModule,
        SharedModule,
        RouterModule.forRoot([]),
        HttpClientTestingModule,
      ],
      providers: [SearchService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    searchService = TestBed.inject(SearchService);
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should create component and get initial data', fakeAsync(() => {

    const { total_count, incomplete_results, items} = mockDetails

    spyOn(searchService, 'searchUsers').and.returnValue(
      of(mockApiResponse(total_count, incomplete_results, items)).pipe(delay(1))
    );
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.isLoading).toBeTruthy();
    // Simulates the asynchronous passage of time
    tick(100);
    expect(component.details).toEqual(null);
  }));

  // it('should fetchBanks', fakeAsync(() => {
  //   const mockResponse: ApiModel<BankModel[]> = {
  //     data: mockBanks,
  //     message: '',
  //     code: StatusCodes.success,
  //     total: 1,
  //   };

  //   spyOn(bankService, 'getBanks').and.returnValue(
  //     of(mockResponse).pipe(delay(1))
  //   );
  //   fixture.detectChanges();
  //   component.fetchBanks();
  //   expect(component.isLoadingResults).toBeTruthy();
  //   tick(100);
  //   expect(component.isLoadingResults).toBeFalsy();
  //   expect(component.banks.length).toEqual(1);
  // }));

  // it('should fetchBanks failure', fakeAsync(() => {
  //   const error = {
  //     error: {
  //       message: 'error occurred'
  //     }
  //   };
  //   spyOn(bankService, 'deactivateBank').and.returnValue(
  //     throwError(error).pipe(delay(1)));

  //   spyOn(bankService, 'getBanks').and.returnValue(
  //     throwError(error).pipe(delay(1))
  //   );

  //   fixture.detectChanges();
  //   component.fetchBanks();
  //   tick(100);
  //   expect(component.isLoadingResults).toBeFalse();
  // }));
});
