import { Component, OnInit, ViewChild } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { DaxtraService } from '../daxtra.service';
import { TemplateService } from '../template.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  resumeOb: Observable<any>;
  templateOb: Observable<any>;

  public config: PerfectScrollbarConfigInterface = {};

  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;

  constructor(
    private daxtraService: DaxtraService,
    private templateService: TemplateService
  ) { }

  ngOnInit() {
    this.resumeOb = this.daxtraService.getXML();
    this.templateOb = this.templateService.getObservable();
  }

  printResume(event) {

  }

  publishResume(event) {
    
  }

}
