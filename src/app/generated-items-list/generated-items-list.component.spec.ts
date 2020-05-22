import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedItemsListComponent } from './generated-items-list.component';

describe('GeneratedItemsListComponent', () => {
  let component: GeneratedItemsListComponent;
  let fixture: ComponentFixture<GeneratedItemsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedItemsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
