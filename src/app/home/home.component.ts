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
    {
      title: 'Company Logo',
      data: 'CompanyLogo'
    },
    {
      title: 'Account Manager Name',
      data: 'AMName',
    },
    {
      title: 'Account Manager Email',
      data: 'AMEmail'
    }
  ];

  daxtraTags = {
    PersonName: [
      {
        title: "Family Name",
        data: "PersonName.FamilyName"
      }, {
        title: "Formatted Name",
        data: "PersonName.FormattedName"
      }, {
        title: "Given Name",
        data: "PersonName.GivenName"
      }, {
        title: "Sex",
        data: "PersonName.sex"
      }
    ],
    ContactMethod: [
      {
        title: "Email Address",
        data: "ContactMethod.InternetEmailAddress_main"
      }, {
        title: "Telephone",
        data: "ContactMethod.Telephone_work"
      }
    ],
    PostalAddress: [
      {
        title: "Country Code",
        data: "ContactMethod.PostalAddress_main.CountryCode"
      }, {
        title: "Municipality",
        data: "ContactMethod.PostalAddress_main.Municipality"
      }, {
        title: "Region",
        data: "ContactMethod.PostalAddress_main.Region"
      }],
    EducationHistory: [
      {
        title: "Major",
        data: "EducationHistory[index].Major"
      }, {
        title: "School Name",
        data: "EducationHistory[index].SchoolName"
      }, {
        title: "School Type",
        data: "EducationHistory[index].schoolType"
      }, {
        title: "Comments",
        data: "EducationHistory[index].Comments"
      },
    ],
    Degree: [
      {
        title: "Degree Name",
        data: "EducationHistory[index].Degree.DegreeName"
      }, {
        title: "Degree Type",
        data: "EducationHistory[index].Degree.degreeType"
      }, {
        title: "Degree Date",
        data: "EducationHistory[index].Degree.DegreeDate"
      },
    ],
    EduLocationSummary: [
      {
        title: "Country Code",
        data: "EducationHistory[index].LocationSummary.CountryCode"
      }, {
        title: "Municipality",
        data: "EducationHistory[index].LocationSummary.Municipality"
      }, {
        title: "Region",
        data: "EducationHistory[index].LocationSummary.Region"
      },
    ],
    EmploymentHistory: [
      {
        title: "Title",
        data: "EmploymentHisotry[index].Title",
        type: "Array"
      },
      {
        title: "Position Type",
        data: "EmploymentHisotry[index].PositionType"
      },
      {
        title: "Job Area",
        data: "EmploymentHisotry[index].JobArea"
      },
      {
        title: "Employer Org Name",
        data: "EmploymentHisotry[index].EmployerOrgName"
      },
      {
        title: "Employer Org Type",
        data: "EmploymentHisotry[index].employerOrgType"
      },
      {
        title: "Org Name",
        data: "EmploymentHisotry[index].OrgName"
      },
      {
        title: "Start Date",
        data: "EmploymentHisotry[index].StartDate"
      },
      {
        title: "End Date",
        data: "EmploymentHisotry[index].EndDate"
      },
      {
        title: "Months Of Week",
        data: "EmploymentHisotry[index].MonthsOfWeek"
      },
      {
        title: "Description",
        data: "EmploymentHisotry[index].Description"
      },
      {
        title: "Industry Description",
        data: "EmploymentHisotry[index].OrgIndustry.IndustryDescription"
      }
    ],
    EmpLocationSummary: [
      {
        title: "Country Code",
        data: "EmploymentHisotry[index].LocationSummary.CountryCode"
      },
      {
        title: "Municipality",
        data: "EmploymentHisotry[index].LocationSummary.Municipality"
      },
      {
        title: "Region",
        data: "EmploymentHisotry[index].LocationSummary.Region"
      }
    ],
    Competency: [
      {
        title: "Skill Name",
        data: "Competency[index].skillName"
      },
      {
        title: "Skill Level",
        data: "Competency[index].skillLevel"
      },
      {
        title: "Skill Proficiency",
        data: "Competency[index].skillProficiency"
      },
      {
        title: "lastUsed",
        data: "Competency[index].lastUsed"
      },
      {
        title: "description",
        data: "Competency[index].description"
      }
    ],
    skillAliasArray: {
      title: "Skill Alias Array",
      data: "Competency[index].skillAliasArray",
      type: "Array"
    },
    skillUsed: [
      {
        title: "Skill Used Type",
        data: "Competency[index].skillUsed.type"
      },
      {
        title: "Skill Used Value",
        data: "Competency[index].skillUsed.value"
      }
    ],
    RevisionDate: {
      title: "Revision Date",
      data: "RevisionDate"
    },
    ExecutiveSummary: {
      title: "Executive Summary",
      data: "ExecutiveSummary"
    }
  };


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

    ele.innerHTML = `<p data-tag='${data.data}'>${data.title} / ${data.data}</p>`;
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
    str += '\t'.repeat(depth - 1) + '}\n';
    return str;
  }

  parseDaxtra(event) {
    this.daxtraService.loadXML(event.srcElement.files[0]);
  }

  previewResume(event) {
    this.resumeSubscription = this.resumeOb.subscribe(response => {
      console.log(response.Resume.StructuredResume);
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
