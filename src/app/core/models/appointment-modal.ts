export class AppointmentModal {
  prevAddress: string = '';
  dateString: string = '';
  timeVal: number = 0;
  hour: number = 0;
  minuteList: number[] = [0, 15, 30];
  timeOpts: string[] = [];
  isNew: boolean = true;

  public constructor(init?: Partial<AppointmentModal>) {
    Object.assign(this, init);
  }

  setDisplay(num: number): void {
    this.hour = this.timeVal = num;
    let hour: number = num < 13 ? num : num - 12;
    let minute: number = 0;

    if (hour % 1 == 0.5) {
      minute = 30;
      this.minuteList = [30, 45, 0];
      hour -= 0.5;
    }

    this.timeOpts.push(this.getTimeStr(hour, this.minuteList[0]));
    this.timeOpts.push(this.getTimeStr(hour, this.minuteList[1]));
    this.timeOpts.push(
      this.getTimeStr(num % 1 == 0.5 ? hour + 1 : hour, this.minuteList[2])
    );

    //lazy
    if (num == 12.5) this.timeOpts[2] = '1:00';
  }

  private getTimeStr(hour: number, minute: number): string {
    return hour.toString() + ':' + (minute > 0 ? minute.toString() : '00');
  }
}
