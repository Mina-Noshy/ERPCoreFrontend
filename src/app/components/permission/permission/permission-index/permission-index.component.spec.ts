import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionIndexComponent } from './permission-index.component';

describe('PermissionIndexComponent', () => {
  let component: PermissionIndexComponent;
  let fixture: ComponentFixture<PermissionIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
