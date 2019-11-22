import { Component, OnInit, ViewChild } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { DaxtraService } from '../daxtra.service';
import { TemplateService } from '../template.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  resumeOb: Observable<any>;
  templateOb: Observable<any>;
  resume: any;

  resumeSubscription: Subscription;

  public config: PerfectScrollbarConfigInterface = {};

  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;

  constructor(
    private daxtraService: DaxtraService,
    private templateService: TemplateService
  ) { }

  ngOnInit() {
    this.resumeOb = this.daxtraService.getXML();
    this.templateOb = this.templateService.getObservable();

    this.resumeSubscription = this.resumeOb.subscribe(res => {
      this.resume = res.Resume.StructuredResume;
    });
  }

  printResume(event) {

  }

  publishResume(event) {
    
  }

  displayResumeItem(item: string) {
    const idxAry = item.split('.');
    var val: any = this.resume;

    for (var i = 0 ; i < idxAry.length ; i++)
      val = val[idxAry[i]];
    return val;
  }

  ngOnDestroy() {
    this.resumeSubscription.unsubscribe();
  }

}
