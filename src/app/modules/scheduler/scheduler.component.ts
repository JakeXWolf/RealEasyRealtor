import { Component, OnInit } from '@angular/core';

// @fullcalendar plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking

class GridCell {
  display: string;
  appointments: Appointment[];
  [key: string]: any;

  constructor() {
    this.display = '';
    this.appointments = [];
  }

  setDisplay(num: number):void {
    if (num < 12) {
      this.display = num + ':00 AM'
    }
    else if (num == 12) {
      this.display = num + ':00 PM';
    }
    else {
      this.display = (num - 12) + ':00 PM';
    }
  }
}

class Appointment {
  header: string = '';
  timeDisplay: string = '';
  col: string = '';
  timeStart: Date = new Date();
  timeEnd: Date = new Date();

  isSelected: boolean = false;

  public constructor(init?: Partial<Appointment>) {
    Object.assign(this, init);
  }

  public setDisplay() {
    this.timeDisplay = this.timeStart.getHours().toString() + ':' + this.getMinuteString(this.timeStart);
    this.timeDisplay += ' - ' + this.timeEnd.getHours().toString() + ':' + this.getMinuteString(this.timeEnd);

    this.col = (this.timeStart.getMonth() + 1).toString() + this.timeStart.getDate().toString();
  }

  private getMinuteString(time: Date): string {
    let minutes: number = time.getMinutes();
    return minutes == 0 ? '00' : minutes.toString();
  }
}

// class RowObj {
//   rowCells: GridCell[];

//   constructor() {
//     this.rowCells = [new GridCell()];
//   }
// }

// list of rows -> rows are list of cells -> cells ar list of appts

class Column {
  field: string = '';
  header: string = '';
  date: Date = new Date();

  public constructor(init?: Partial<Column>) {
    Object.assign(this, init);
  }

  public setHeader(day: Date) {
    this.date = day;
    this.header = day.toDateString().substring(0, 4) +
      day.toLocaleDateString().substring(0, day.toLocaleDateString().lastIndexOf('/'));
  }
}


// obj for Rows on the grid when creating appointments
class Row {
  time: string = '';
  timeValue: number; 
  [key: string]: any;

  constructor(time: number) {
    this.timeValue = time;
    this.setDisplay(time);
  }

  setDisplay(num: number): void {
    let hour: number = Number.isInteger(num) ? num : num - .5;
    let minute: string = Number.isInteger(num) ? ':00' : ':30';
    
    if (num < 12) {
      this.time = hour + minute + ' AM';
    } else if (num == 12 || num == 12.5) {
      this.time = '12' + minute + ' PM';
    } else {
      this.time = hour - 12 + minute + ' PM';
    }
  }
}

// obj for client view
class ClientColumn {
  colName: string = '';
  colValue: string = '';
  appointments: Appointment[] = [];

  public constructor(init?: Partial<ClientColumn>) {
    Object.assign(this, init);
  }
}

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})
export class SchedulerComponent implements OnInit {
  days: any[] = [
    { display: 'Mon 4/17', appointments: [] },
    { display: 'Tue 4/18', appointments: [] },
  ];

  header: any[] = [];
  cols: Column[] = [];
  dates: Date[] = [];

  checked: boolean = false;

  isDialogVisible: boolean = false;
  newAppointment: Appointment = new Appointment();

  ngOnInit() {
    // days are test not used rn
    // this.days = [
    //   { display: 'Mon 4/17' },
    //   { display: 'Tue 4/18' },
    //   { display: 'Wed 4/19' },
    //   { display: 'Thu 4/20' },
    // ];

    // this.cols = [
    //   new Column({ field: 'time', header: '' }),
    //   new Column({ field: '417', header: 'Mon 4/17' }),
    //   new Column({ field: '418', header: 'Tue 4/18' }),
    //   new Column({ field: '419', header: 'Wed 4/19' }),
    //   new Column({ field: '420', header: 'Thu 4/20' }),
    // ];

    this.dates = [
      new Date(2023, 3, 17),
      new Date(2023, 3, 18),
      new Date(2023, 3, 19),
      new Date(2023, 3, 20)
    ];

    this.testcreateFakeApts();

    this.onGenerateGrid();
    // this.setupGrid();

    this.createClientView();
  }

  public clickEvent(event: any) {
    console.log(event);
  }

  rangeValues: number[] = [0, 30];

  public onAddAppointment(col: Column, time: string) {
    // todo use grid values to:
    // set rangevalues
    // set new appt date
    // set new appt hour
    this.isDialogVisible = true;
    this.newAppointment = new Appointment(); //need to pass obj in to initialize appointment date
    console.log(col, time);
  }

  public onSubmitAppointment() {

  };

  gridData: Row[] = [];

  public onGenerateGrid() {
    this.dates.sort(function (a, b) {
      return a.getTime() - b.getTime();
    });

    // create columns
    this.cols = [new Column({ field: 'time', header: '' })];
    this.dates.forEach((x) => {
      let newCol = new Column({ field: this.getColByDate(x) });
      newCol.setHeader(x);
      this.cols.push(newCol);
    });

    // refresh grid
    this.gridData = [];

    // set up the grid
    this.setupGrid();
  }

  private getColByDate(day: Date): string {
    return (day.getMonth() + 1).toString() + day.getDate().toString();
  }

  private setupGrid() {
    for (let i = 8; i < 17.5; i += 0.5) {
      // each row obj created
      let newRow: Row = new Row(i);

      this.cols.forEach((x: Column) => {
        // each prop in obj created (each prop is a grid cell)
        let newProp = new GridCell();

        if (x.field !== 'time') {
          newRow[x.field] = new GridCell();
        }
      });

      this.insertAppointments(newRow, this.fakeApts, i);

      this.gridData.push(newRow);
    }
  }

  private insertAppointments(newRow: Row, apts: Appointment[], hour: number) {
    let aptsInRow: Appointment[] = apts.filter((x) => {
      return (
        (hour - x.timeStart.getHours() === 0 &&
          x.timeStart.getMinutes() < 30) ||
        (hour - x.timeStart.getHours() === 0.5 && x.timeStart.getMinutes() > 29)
      );
    });

    if (aptsInRow.length) {
      aptsInRow.forEach((a) => {
        newRow[a.col].appointments.push(a);
      });
    }
  }

  fakeApts: Appointment[] = [];

  private testcreateFakeApts() {
    let fakeApt1: Appointment = new Appointment({
      header: '123 Test Ave',
      timeStart: new Date('April 18, 2023 10:00:00'),
      timeEnd: new Date('April 18, 2023 10:15:00'),
    });
    let fakeApt2: Appointment = new Appointment({
      header: '69 Ethan Blvd',
      timeStart: new Date('April 19, 2023 09:30:00'),
      timeEnd: new Date('April 19, 2023 09:45:00'),
    });
    let fakeApt3: Appointment = new Appointment({
      header: '369 DamnSheFine St',
      timeStart: new Date('April 19, 2023 11:00:00'),
      timeEnd: new Date('April 19, 2023 11:15:00'),
    });

    this.fakeApts.push(fakeApt1);
    this.fakeApts.push(fakeApt2);
    this.fakeApts.push(fakeApt3);

    this.fakeApts.forEach((x) => {
      x.setDisplay();
    });
  }

  clientColumns: ClientColumn[] = [];

  private createClientView() {
    let apts: Appointment[] = [...this.fakeApts];

    apts.sort(function (a, b) {
      return b.timeStart.getTime() - a.timeStart.getTime();
    });

    this.cols.forEach((x) => {
      if (x.field !== 'time') {
        let col: ClientColumn = new ClientColumn({
          colName: x.header,
          colValue: x.field,
        });

        let apt: any;

        while (apts.length) {
          apt = apts.pop();

          if (apt.col === x.field) {
            col.appointments.push(apt);
          } else {
            apts.push(apt);
            break;
          }
        }

        if (col.appointments.length) {
          this.clientColumns.push(col);
        }
      }
    });
  }

  /***************     original non adaptive column grid      *******************/

  // gridTest: RowObj[] = [new RowObj()];
  // gridData: RowObj[] = [new RowObj()];

  // private createFakeApts() {
  //   let w = [new Appointment({ header: 'House W', isActive: true })];
  //   let x = [new Appointment({ header: 'House X', isActive: true })];
  //   let y = [new Appointment({ header: 'House Y', isActive: true })];
  //   let z = [new Appointment({ header: 'House Z', isActive: true })];

  //   this.gridData[1].rowCells[3].appointments = w;
  //   this.gridData[4].rowCells[2].appointments = x;
  //   this.gridData[6].rowCells[1].appointments = y;
  //   this.gridData[9].rowCells[4].appointments = z;
  // }

  // private setupGrid() {
  //   //header
  //   this.header = [''];
  //   this.days.forEach((i) => {
  //     this.header.push(i.display);
  //   });

  //   //times listed
  //   let times: RowObj[] = [];

  //   for (let i = 8; i < 18; i++) {
  //     let timeCell: GridCell = new GridCell();
  //     timeCell.setDisplay(i);

  //     let timeSlotRow: RowObj = new RowObj();
  //     timeSlotRow.rowCells = [timeCell];

  //     let middleTimeSlot: RowObj = new RowObj();

  //     this.days.forEach((i) => {
  //       timeSlotRow.rowCells.push(new GridCell());
  //       middleTimeSlot.rowCells.push(new GridCell());
  //     });

  //     times.push(timeSlotRow);
  //     times.push(middleTimeSlot);
  //   }

  //   this.gridData = times;
  // }
}
