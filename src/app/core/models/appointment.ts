export class Appointment {
  header: string = '';
  timeDisplay: string = '';
  col: string = '';
  timeStart: Date = new Date();
  timeEnd: Date = new Date();

  isSelected: boolean = false;
  style: any = { background: 'lightskyblue' };

  public constructor(init?: Partial<Appointment>) {
    Object.assign(this, init);
  }

  public setDisplay() {
    this.timeDisplay =
      this.timeStart.getHours().toString() +
      ':' +
      this.getMinuteString(this.timeStart);
    this.timeDisplay +=
      ' - ' +
      this.timeEnd.getHours().toString() +
      ':' +
      this.getMinuteString(this.timeEnd);

    this.col =
      (this.timeStart.getMonth() + 1).toString() +
      this.timeStart.getDate().toString();
  }

  public onSelected() {
    this.isSelected = !this.isSelected;

    if (this.isSelected) {
      this.style = { 'background': 'lime' };
    } else {
      this.style = { 'background': 'lightskyblue' };
    }
  }

  private getMinuteString(time: Date): string {
    let minutes: number = time.getMinutes();
    return minutes == 0 ? '00' : minutes.toString();
  }
}