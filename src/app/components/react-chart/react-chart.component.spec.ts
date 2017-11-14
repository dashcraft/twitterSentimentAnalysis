import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactChartComponent } from './react-chart.component';

describe('ReactChartComponent', () => {
  let component: ReactChartComponent;
  let fixture: ComponentFixture<ReactChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
