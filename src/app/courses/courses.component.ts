import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CourseCardComponent } from '../components/course-card/course-card.component';
import { ModalComponent } from '../components/modal/modal.component';
import { CreateCourseFormComponent } from '../components/create-course-form/create-course-form.component';
import { collectionData, Firestore, collection } from '@angular/fire/firestore';
import { Course } from '../types';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { LoaderComponent } from '../components/loader/loader.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CourseCardComponent,
    ModalComponent,
    CreateCourseFormComponent,
    AsyncPipe,
    LoaderComponent
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  firestore = inject(Firestore);
  isCreateCourseModalOpen = false;
  courses$!: Observable<Course[]>;
  isLoadingCourses = false;
  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.courses$ = collectionData(collection(this.firestore, 'courses')).pipe(
      map((courses) => {
        return courses;
      })
    ) as Observable<Course[]>;
  }
}
