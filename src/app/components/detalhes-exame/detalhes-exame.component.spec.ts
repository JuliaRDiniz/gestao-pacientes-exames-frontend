import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesExameComponent } from './detalhes-exame.component';

describe('DetalhesExameComponent', () => {
  let component: DetalhesExameComponent;
  let fixture: ComponentFixture<DetalhesExameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesExameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesExameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
