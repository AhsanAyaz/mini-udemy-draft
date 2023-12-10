import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureComponent } from './lecture.component';

describe('LectureComponent', () => {
  let component: LectureComponent;
  let fixture: ComponentFixture<LectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LectureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
