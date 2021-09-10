import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeroomComponent } from './makeroom.component';

describe('MakeroomComponent', () => {
  let component: MakeroomComponent;
  let fixture: ComponentFixture<MakeroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
