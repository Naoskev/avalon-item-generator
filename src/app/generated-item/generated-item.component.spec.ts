import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedItemComponent } from './generated-item.component';

describe('GeneratedItemComponent', () => {
  let component: GeneratedItemComponent;
  let fixture: ComponentFixture<GeneratedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
