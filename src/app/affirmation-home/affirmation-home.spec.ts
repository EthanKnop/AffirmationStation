import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffirmationHome } from './affirmation-home';

describe('AffirmationHome', () => {
  let component: AffirmationHome;
  let fixture: ComponentFixture<AffirmationHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffirmationHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffirmationHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
