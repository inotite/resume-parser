import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private subject = new BehaviorSubject<any>([]);

  constructor() { }

  getObservable(): Observable<any> {
    return this.subject.asObservable();
  }

  getTemplate(): any {
    var rows = document.getElementsByClassName('resume-row');
    var curRow = [];
    for( var i = 0 ; i < rows.length ; i++ ) {
      var chs = rows[i].getElementsByClassName('drop-placeholder');
      var vals = [];
      for( var ci = 0 ; ci < chs.length ; ci++ ) {
        var node = chs[ci].children[0];        
        vals.push(node.getAttribute('data-tag'));
      }
      curRow.push(vals);
    }
    this.subject.next(curRow);
  }
}
