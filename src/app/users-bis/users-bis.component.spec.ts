import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBisComponent } from './users-bis.component';

describe('UsersBisComponent', () => {
  let component: UsersBisComponent;
  let fixture: ComponentFixture<UsersBisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersBisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersBisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
