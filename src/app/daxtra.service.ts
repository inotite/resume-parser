import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DaxtraService {

  private _xmls = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) { }

  getXML(): Observable<any> {
    return this._xmls.asObservable();
  }

  loadXML(file) {
    this.http.get('https://cvxdemo.daxtra.com/cvx/rest/auth/v1/access_token', {
      params: {
        'account': 'APtask'
      },
      responseType: "text"
    })
      .subscribe(token => {
        var formData = new FormData();
        formData.append('file', file);
        formData.append('account', token + "; -turbo");
        this.http.post('https://cvxdemo.daxtra.com/cvx/rest/api/v1/profile/full/json', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).subscribe(response => {
          this._xmls.next(response);
        });
      });
  }
}
