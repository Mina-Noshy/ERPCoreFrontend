import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGroupFormComponent } from './page-group-form.component';

describe('PageGroupFormComponent', () => {
  let component: PageGroupFormComponent;
  let fixture: ComponentFixture<PageGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageGroupFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
