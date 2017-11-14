import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularChartComponent } from './angular-chart.component';

describe('AngularChartComponent', () => {
  let component: AngularChartComponent;
  let fixture: ComponentFixture<AngularChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
