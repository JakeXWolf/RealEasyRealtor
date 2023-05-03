import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

//calendar may not be needed
import { FullCalendarModule } from '@fullcalendar/angular';

//grid to make my own calendar
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';

//may be removeable
import { ToggleButtonModule } from 'primeng/togglebutton';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchedulerComponent } from './modules/scheduler/scheduler.component';

@NgModule({
  declarations: [AppComponent, SchedulerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    FullCalendarModule,

    TableModule,
    ButtonModule,
    CardModule,
    CalendarModule,

    InputTextModule,
    OverlayPanelModule,
    DialogModule,
    SliderModule,

    ToggleButtonModule,

    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
