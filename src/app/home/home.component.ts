import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mobileThreshold: number = 800;
  showMobile: boolean = false;

  conferenceTime: string = '';
  timezone: string = '';
  startTimeUTC: number = 14;
  endTimeUTC: number = 20;

  constructor() { }

  ngOnInit(): void {
    if (window.innerWidth <= this.mobileThreshold) {
      this.showMobile = true;
    }
    
    window.addEventListener('resize', () => {
      if (window.innerWidth <= this.mobileThreshold) {
        this.showMobile = true;
      } else {
        this.showMobile = false;
      }
    })

    this.customizeTime();
  }

  customizeTime(): void {
    // set up timezone
    const offset = new Date().getTimezoneOffset();
    if (offset > 0) {
      this.timezone = timezoneMap1[offset];
    } else {
      this.timezone = timezoneMap2[-offset];
    }
    
    // set up time
    const hourDiff = offset / 60;
    let startTag = '';
    let endTag = '';
    let localStart = this.startTimeUTC - hourDiff;
    let localEnd = this.endTimeUTC - hourDiff;
    if (localStart > 12) {
      localStart = localStart % 12;
      startTag = 'PM';
    } else {
      startTag = 'AM';
    }
    if (localEnd > 12) {
      localEnd = localEnd % 12;
      endTag = 'PM';
    } else {
      endTag = 'AM';
    }
    this.conferenceTime = localStart + ' ' + startTag + ' - ' + localEnd + ' ' + endTag;
  }

}

const timezoneMap1: { [key: number]: string } = {
  // GMT-7
  420 : 'PDT',
  // GMT-6
  360 : 'CST',
  // GMT-5
  300 : 'EST',
  // GMT-4
  240 : 'EDT',
  // GMT-3
  180 : 'ADT',
  // GMT-2
  120 : 'GMT-2',
  // GMT-1
  60 : 'GMT-1'
};  

const timezoneMap2: { [key: number]: string } = {
  // GMT
  0 : 'WET',
  // GMT+1
  60 : 'CET',
  // GMT+2
  120 : 'EET',
  // GMT+3
  180 : 'EST',
  // GMT+4
  240 : 'MSK'
}; 