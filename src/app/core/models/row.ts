// obj for Rows on the grid when creating appointments
export class Row {
  time: string = '';
  timeValue: number = 0;
  [key: string]: any;

  public constructor(init?: Partial<Row>) {
    Object.assign(this, init);
  }
  // constructor(time: number) {
  //   this.timeValue = time;
  //   this.setDisplay(time);
  // }

  setDisplay(num: number): void {
    let hour: number = num < 13 ? num : num - 12;
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

    this.time = hour + minute + (num < 12 ? 'AM' : 'PM');
  }
}
