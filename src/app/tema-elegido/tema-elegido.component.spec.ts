import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemaElegidoComponent } from './tema-elegido.component';

describe('TemaElegidoComponent', () => {
  let component: TemaElegidoComponent;
  let fixture: ComponentFixture<TemaElegidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemaElegidoComponent]
    });
    fixture = TestBed.createComponent(TemaElegidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
