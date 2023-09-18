import { Appointment } from './appointment';

// obj for client view
export class ClientColumn {
  colName: string = '';
  colValue: string = '';
  appointments: Appointment[] = [];

  public constructor(init?: Partial<ClientColumn>) {
    Object.assign(this, init);
  }
}
