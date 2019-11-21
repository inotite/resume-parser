import { Component, OnInit, ViewChild } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DaxtraService } from '../daxtra.service';
import { SettingsHomeService } from '../settings-home.service';
import { Subscription, Observable } from 'rxjs';
import { TemplateService } from '../template.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('cvOpen') cvOpen;

  resumeOb: Observable<any>;
  templateOb: Observable<any>;

  staticTags = [
    'Company Logo',
    'Account Manager Name',
    'Account Manager Email'
  ];

  done = [];

  parsedResume: any;

  resumeSubscription: Subscription;
  templateSubscription: Subscription;

  public config: PerfectScrollbarConfigInterface = {};

  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;

  constructor(
    private daxtraService: DaxtraService,
    private settingsHomeService: SettingsHomeService,
    private templateService: TemplateService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.settingsHomeService.postEvent.subscribe(event => {
      this.parseDaxtra(event);
    });

    this.resumeOb = this.daxtraService.getXML();
    this.templateOb = this.templateService.getObservable();
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // transferArrayItem(event.previousContainer.data,
      //                   event.container.data,
      //                   event.previousIndex,
      //                   event.currentIndex);
      event.container.data.splice(event.currentIndex, 0, event.item.data);
    }
  }

  onItemDrop(event) {
    console.log(event);
    var ele = event.nativeEvent.srcElement;
    var data = event.dragData;

    ele.innerHTML = '<p>' + data + '</p>';
    ele.style.border = "unset";
    ele.style.backgroundColor = "transparent"
    console.log(this.done);
  }

  copyToString(obj, depth) {
    var str = "";
    if (typeof obj !== 'object') return obj;
    str += '{\n';
    for (var key in obj) {
      str += '\t'.repeat(depth) + key + ': ' + this.copyToString(obj[key], depth + 1) + '\n';
    }
    str += '\t'.repeat(depth-1) + '}\n';
    return str;
  }

  parseDaxtra(event) {
    this.daxtraService.loadXML(event.srcElement.files[0]);
  }

  previewResume(event) {
    this.resumeSubscription = this.resumeOb.subscribe(response => {
      if (response.hasOwnProperty('Resume')) {
        this.templateService.getTemplate();
        this.templateSubscription = this.templateOb.subscribe(result => {
          if (result.length) {
            this.router.navigate(['/preview']);
          } else {
            this._snackBar.open("Please design template", "Close", {
              duration: 4000
            });

            setTimeout(() => {
              this.templateSubscription.unsubscribe();
            })
          }
        });
        
      } else {
        this._snackBar.open("Please select resume first.", "Close", {
          duration: 4000
        });

        setTimeout(() => {
          this.resumeSubscription.unsubscribe();
        })
      }
    });
  }

  ngOnDesetroy() {
  }
  

}
