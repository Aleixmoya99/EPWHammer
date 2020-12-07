import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Gun } from './home';

import { IssueService } from './issue.service';

describe('IssueService', () => {
  let service: IssueService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy};

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'], ['post']);
    service = new IssueService(httpClientSpy as any);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    });
    service = TestBed.inject(IssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getIssues should be called', (done) => {
    httpClientSpy.get.and.returnValue(of([]));
    service.getIssues().subscribe(() => {
      expect(httpClientSpy.get.calls.count()).toBe(1);
      done();
    });
  });
  it('getIssuesById should be called', (done) => {
    let id: any;
    httpClientSpy.get.and.returnValue(of([]));
    service.getIssueById(id).subscribe(() => {
      expect(httpClientSpy.get.calls.count()).toBe(1);
      done();
    });
  });
  it('addIssue should be called', (done) => {
    const mockGun: Gun = {
      name: 'Try1',
      Range: 'Some',
      Type: 'Is this an interrogation?',
      NoS: 'Number of What',
      S: 'A lot bb',
      Ap: 'not much since quarentene',
      D: 'tones',
      Ability: 'none',
      Overcharged: 'no, god!',
      profile: 'i got 2, witch one?',
      points: 'i give myself 5 stars',
    };

    httpClientSpy.post.and.returnValue(of([]));
    service.addIssue(mockGun).subscribe(() => {
      expect(httpClientSpy.post.calls.count()).toBe(1);
      done();
    });
  });
  it('delete should be called', (done) => {
    let id: any;
    httpClientSpy.get.and.returnValue(of([]));
    service.deleteIssue(id).subscribe(() => {
      expect(httpClientSpy.get.calls.count()).toBe(1);
      done();
    });
  });
});
