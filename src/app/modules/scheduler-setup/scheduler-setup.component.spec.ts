import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerSetupComponent } from './scheduler-setup.component';

describe('SchedulerSetupComponent', () => {
  let component: SchedulerSetupComponent;
  let fixture: ComponentFixture<SchedulerSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulerSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulerSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
