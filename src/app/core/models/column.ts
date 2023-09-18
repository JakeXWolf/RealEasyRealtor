export class Column {
  field: string = '';
  header: string = '';
  isAllSelected: boolean = true;
  date: Date = new Date();

  public constructor(init?: Partial<Column>) {
    Object.assign(this, init);
  }

  public setHeader(day: Date) {
    this.date = day;
    this.header =
      day.toDateString().substring(0, 4) +
      day
        .toLocaleDateString()
        .substring(0, day.toLocaleDateString().lastIndexOf('/'));
  }
}
