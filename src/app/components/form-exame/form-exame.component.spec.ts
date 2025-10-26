import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExameComponent } from './form-exame.component';

describe('FormExameComponent', () => {
  let component: FormExameComponent;
  let fixture: ComponentFixture<FormExameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormExameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormExameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
