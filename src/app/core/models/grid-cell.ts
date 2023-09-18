import { Appointment } from './appointment';

export class GridCell {
  display: string;
  appointments: Appointment[];
  isSelected: boolean;
  [key: string]: any;

  constructor() {
    this.display = '';
    this.appointments = [];
    this.isSelected = true;
  }
}
