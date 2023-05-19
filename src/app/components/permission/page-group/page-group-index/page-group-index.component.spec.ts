import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGroupIndexComponent } from './page-group-index.component';

describe('PageGroupIndexComponent', () => {
  let component: PageGroupIndexComponent;
  let fixture: ComponentFixture<PageGroupIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageGroupIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGroupIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
