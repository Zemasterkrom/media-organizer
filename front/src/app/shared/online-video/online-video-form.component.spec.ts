import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineVideoFormComponent } from './online-video-form.component';

describe('OnlineVideoComponent', () => {
  let component: OnlineVideoFormComponent;
  let fixture: ComponentFixture<OnlineVideoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineVideoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineVideoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
