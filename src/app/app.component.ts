import { Component } from '@angular/core';
import { SettingsHomeService } from './settings-home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'resume-parser';

  constructor(private settingsHomeService: SettingsHomeService) {}

  parseDaxtra(event) {
    this.settingsHomeService.sendEvent(event);
  }
}
