import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsHomeService {

  @Output() postEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  sendEvent(event) {
    this.postEvent.emit(event);
  }
}
