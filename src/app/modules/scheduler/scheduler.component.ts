import { Component, OnInit } from '@angular/core';

import { Appointment } from '../../core/models/appointment';
import { ClientColumn } from '../../core/models/client-column';
import { Column } from '../../core/models/column';
import { GridCell } from '../../core/models/grid-cell';
import { AppointmentModal } from '../../core/models/appointment-modal';
import { Row } from '../../core/models/row';

// @fullcalendar plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking


// class RowObj {
//   rowCells: GridCell[];

//   constructor() {
//     this.rowCells = [new GridCell()];
//   }
// }

// list of rows -> rows are list of cells -> cells ar list of appts

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

  checked: boolean = true;

  isDialogVisible: boolean = false;
  newAppointment: Appointment = new Appointment();
  newAptModal: AppointmentModal = new AppointmentModal();

  ngOnInit() {
    this.dates = [
      new Date(2023, 3, 17),
      new Date(2023, 3, 18),
      new Date(2023, 3, 19),
      new Date(2023, 3, 20),
    ];

    this.testcreateFakeApts();

    this.onGenerateGrid();
    // this.setupGrid();

    this.createClientView();
  }

  public clickEvent(event: any) {
    console.log(event);
  }

  // appointment dialog
  rangeValues: number[] = [0, 2];
  newAptHeader: string = 'Create Appointment for ';

  // initializes new appointment and opens modal
  public onAddAppointment(col: Column, timeVal: number) {
    this.newAppointment = new Appointment({
      timeStart: new Date(col.date),
      timeEnd: new Date(col.date),
    });
    this.newAppointment.header = this.newAptModal.prevAddress;
    this.newAptHeader += col.header;

    this.newAptModal.dateString = col.field;
    this.newAptModal.setDisplay(timeVal);

    this.isDialogVisible = true;
  }

  // creates the appointment and puts it in the grid
  public onSubmitAppointment() {
    //set time for appointment
    let hourStart: number;
    let hourEnd: number = (hourStart = this.newAptModal.timeVal);

    if (hourStart % 1) {
      hourStart -= 0.5;
      hourEnd = this.rangeValues[1] === 2 ? hourEnd + 0.5 : hourEnd - 0.5;
    }

    this.newAppointment.timeStart.setHours(hourStart);
    this.newAppointment.timeStart.setMinutes(
      this.newAptModal.minuteList[this.rangeValues[0]]
    );
    this.newAppointment.timeEnd.setHours(hourEnd);
    this.newAppointment.timeEnd.setMinutes(
      this.newAptModal.minuteList[this.rangeValues[1]]
    );

    //set up the display
    this.newAppointment.setDisplay();

    //find row first
    let index = this.gridData.findIndex(
      (x) => x.timeValue === this.newAptModal.timeVal
    );
    //insert new appoinment into the corresponding row and the dated column
    this.gridData[index][this.newAptModal.dateString].appointments.push(
      this.newAppointment
    );
    //sort
    this.gridData[index][this.newAptModal.dateString].appointments.sort(
      function (a: Appointment, b: Appointment) {
        return a.timeStart.getTime() - b.timeStart.getTime();
      }
    );

    this.newAptModal.prevAddress = this.newAppointment.header;

    this.isDialogVisible = false;
  }

  onEditAppointment(apt: Appointment) {
    this.isDialogVisible = true;

    this.newAppointment = new Appointment(apt);

    this.isDialogVisible = false;
  }

  //#region Create Grid (Admin View)

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
      let newRow: Row = new Row({timeValue: i});
      newRow.setDisplay(i);

      this.cols.forEach((x: Column) => {
        // each prop in obj created (each prop is a grid cell)
        if (x.field !== 'time') {
          newRow[x.field] = new GridCell();
        }
      });

      this.insertAptsNewRow(newRow, this.fakeApts, i);

      this.gridData.push(newRow);
    }
  }

  private insertAptsNewRow(newRow: Row, apts: Appointment[], hour: number) {
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

  //#endregion

  //#region Client View

  clientColumns: ClientColumn[] = [];
  selectedApts: Appointment[] = [];

  public onAptClicked(apt: Appointment) {
    apt.onSelected();

    if (apt.isSelected) {
      this.selectedApts.push(apt);
    } else {
      // TODO: add id to apt
      let i = this.selectedApts.findIndex((x) => {
        x.timeStart === apt.timeStart;
      });
      this.selectedApts.splice(i, 1);
    }
  }

  public onSubmitClientTimes() {
    console.log(this.selectedApts);
  }

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

  //#endregion Client View

  //#region original non adaptive column grid

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

  //#endregion
}
