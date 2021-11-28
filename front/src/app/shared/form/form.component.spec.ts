import { TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ]
    })
    .compileComponents();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
