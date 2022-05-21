/* tslint:disable:no-unused-variable */

import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { ApiResponse } from '../models/response.model';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SearchService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#searchUsers()', () => {
    it('returned Observable should match the right get search users', () => {
      const mockAccountNumberVerificationModel: ApiResponse = {
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
      };

      const response: ApiResponse = { ...mockAccountNumberVerificationModel };

      service
        .searchUsers('thomsyne', '1', '10')
        .subscribe((data) => {
          expect(data.total_count).toBeGreaterThanOrEqual(0);
        });

      const req = httpTestingController.expectOne(
        'https://api.github.com/search/users?q=thomsyne&page=1&per_page=10'
      );

      expect(req.request.method).toEqual('GET');

      req.flush(response);
    });
  });

  // it('should ...', inject([SearchService], (service: SearchService) => {
  //   expect(service).toBeTruthy();
  // }));
});
