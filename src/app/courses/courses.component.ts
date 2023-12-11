import { Component, OnInit, inject } from '@angular/core';
import { CourseCardComponent } from '../components/course-card/course-card.component';
import { ModalComponent } from '../components/modal/modal.component';
import { CreateCourseFormComponent } from '../components/create-course-form/create-course-form.component';
import { CollectionReference, Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Course } from '../types';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseCardComponent, ModalComponent, CreateCourseFormComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  firestore = inject(Firestore)
  isCreateCourseModalOpen = false;
  courses: Course[] = [];
  isLoadingCourses = false;
  ngOnInit() {
    this.getCourses();
  }

  async getCourses() {
    this.isLoadingCourses = true;
    try {
      const courses = await getDocs(collection(this.firestore, 'courses'));
      this.courses = courses.docs.map(snapshot => snapshot.data() as Course);
    } catch(err) {
      console.log(err);
    } finally {
      this.isLoadingCourses = false;
    }
  }
}
