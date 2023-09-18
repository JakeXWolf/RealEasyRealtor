import { Component, OnInit, ViewChild } from '@angular/core';

import { GridComponent } from '../grid/grid.component';

import { Helper } from '../../core/services/helper';
import { DateTime } from '../../core/models/date-time';

@Component({
  selector: 'app-scheduler-setup',
  templateUrl: './scheduler-setup.component.html',
  styleUrls: ['./scheduler-setup.component.css'],
})
export class SchedulerSetupComponent implements OnInit {
  //need days, duration (15, 30, 45, hour)

  @ViewChild('gridComponent', { static: false })
  private gridComponent!: GridComponent;

  clientName: string = '';
  clientNumber: string = '';
  addressStr: string = '';
  dates: Date[] = [];
  durationOptions: any[] = [
    { label: '15 mins', value: 15 },
    { label: '30 mins', value: 30 },
    { label: '1 hour', value: 60 },
  ];
  durationSelected: number = 30;
  isGridDisplayed: boolean = false;

  listOfTimes: DateTime[] = [];
  selectedStartTime: any;
  selectedEndTime: any;

  constructor(public helper: Helper) {}

  ngOnInit() {
    this.selectedStartTime = this.helper.getTime(7);
    this.selectedEndTime = this.helper.getTime(17);

    this.listOfTimes = this.helper.getListOfTimes(
      this.selectedStartTime.value,
      this.selectedEndTime.value,
      this.durationSelected
    );
  }

  onPreview() {
    //TODO: validated inputs
    this.isGridDisplayed = true;
    this.gridComponent.onCreatePreview(
      this.dates,
      this.durationSelected,
      this.isGridDisplayed,
      this.selectedStartTime,
      this.selectedEndTime
    );
  }

  onSubmit() {
    console.log('submitted');
  }
}
