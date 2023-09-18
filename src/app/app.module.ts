import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

//calendar may not be needed
import { FullCalendarModule } from '@fullcalendar/angular';

//grid to make my own calendar
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';

//may be removeable
import { ToggleButtonModule } from 'primeng/togglebutton';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchedulerComponent } from './modules/scheduler/scheduler.component';
import { SchedulerSetupComponent } from './modules/scheduler-setup/scheduler-setup.component';
import { GridComponent } from './modules/grid/grid.component';

import { Helper } from './core/services/helper';

@NgModule({
  declarations: [AppComponent, SchedulerComponent, SchedulerSetupComponent, GridComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    FullCalendarModule,

    TableModule,
    ButtonModule,
    CardModule,
    CalendarModule,
    CheckboxModule,

    DropdownModule,
    InputTextModule,
    OverlayPanelModule,
    DialogModule,
    SliderModule,
    SelectButtonModule,

    ToggleButtonModule,

    BrowserAnimationsModule,
  ],
  providers: [Helper],
  bootstrap: [AppComponent],
})
export class AppModule {}
