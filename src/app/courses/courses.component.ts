import { Component } from '@angular/core';
import { CourseCardComponent } from '../components/course-card/course-card.component';
import { ModalComponent } from '../components/modal/modal.component';
import { CreateCourseFormComponent } from '../components/create-course-form/create-course-form.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseCardComponent, ModalComponent, CreateCourseFormComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  isCreateCourseModalOpen = false;
}
