import { Component } from '@angular/core';
import { C } from '@fullcalendar/core/internal-common';
import { DateTime } from 'src/app/core/models/date-time';

import { Column } from '../../core/models/column';
import { GridCell } from '../../core/models/grid-cell';
import { Row } from '../../core/models/row';

import { Helper } from '../../core/services/helper';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent {
  dates: Date[] = [];
  durationSelected: number = 0;
  isDisplayed: boolean = false;

  cols: Column[] = [];
  gridData: Row[] = [];

  listOfTimes: DateTime[] = [];
  startTime: any;
  endTime: any;

  constructor(public helper: Helper) {}

  // parent calls this action to load up grid preview
  // TODO: Create object to pass in
  onCreatePreview(
    dates: Date[],
    durationSelected: number,
    isDisplayed: boolean,
    startTime: any,
    endTime: any
  ) {
    this.dates = dates;
    this.durationSelected = durationSelected;
    this.isDisplayed = isDisplayed;
    this.startTime = startTime;
    this.endTime = endTime;
    this.onGenerateGrid();
  }

  onToggleCheckBoxes(column: Column) {
    const isAllSelected = !column.isAllSelected;
    const i: number = this.cols.findIndex((x) => {
      return x.field === column.field;
    });
    this.cols[i].isAllSelected = isAllSelected;

    this.gridData.forEach((x) => {
      x[column.field].isSelected = isAllSelected;
    });
  }

  onGenerateGrid() {
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
    this.setupGridRows();
  }

  private getColByDate(day: Date): string {
    return (day.getMonth() + 1).toString() + day.getDate().toString();
  }

  private setupGridRows() {
    this.listOfTimes = this.helper.getListOfTimes(this.startTime.value, this.endTime.value, this.durationSelected);

    // iterate creating each row as a time slot
    this.listOfTimes.forEach(time => {
      // each row obj created (this row contains the display time and each columns value for that row)
      let newRow: Row = new Row({ time: time.label, timeValue: time.value });

      this.cols.forEach((x: Column) => {
        // each prop in obj created (each prop is a grid cell)
        if (x.field !== 'time') {
          newRow[x.field] = new GridCell();
        }
      });

      this.gridData.push(newRow);
    });
  }

  // private insertAptsNewRow(newRow: Row, apts: Appointment[], hour: number) {
  //   let aptsInRow: Appointment[] = apts.filter((x) => {
  //     return (
  //       (hour - x.timeStart.getHours() === 0 &&
  //         x.timeStart.getMinutes() < 30) ||
  //       (hour - x.timeStart.getHours() === 0.5 && x.timeStart.getMinutes() > 29)
  //     );
  //   });

  //   if (aptsInRow.length) {
  //     aptsInRow.forEach((a) => {
  //       newRow[a.col].appointments.push(a);
  //     });
  //   }
  // }
}
