import { Injectable } from '@angular/core';
import { DateTime } from '../models/date-time';

@Injectable()
export class Helper {

  getTime(value: number): DateTime {
    let hour: number = value < 13 ? value : value - 12;
    let minute: string;

    if (hour % 1 == 0) {
      minute = ':00 ';
    } else {
      if (hour % 1 == 0.25) {
        minute = ':15 ';
      } else {
        minute = ':30 ';
      }
      hour = Math.floor(hour);
    }

    let time: DateTime = { value: value, label: hour + minute + (value < 12 ? 'AM' : 'PM') };

    return time;
  }

  getListOfTimes(
    valueStart: number,
    valueEnd: number,
    duration: number
  ): DateTime[] {
    let listOfTimes: DateTime[] = [];
    let interval: number = 1;

    if (duration == 15) {
      interval = 0.25;
    }
    if (duration == 30) {
      interval = 0.5;
    }

    // iterate creating each row as a time slot
    for (let i = valueStart; i <= valueEnd; i += interval) { 
        listOfTimes.push(this.getTime(i));
    }

    return listOfTimes;
  }
}