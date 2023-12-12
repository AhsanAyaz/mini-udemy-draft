import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../../types';
import { File } from 'filestack-js/build/main/lib/api/upload';
@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss',
})
export class CourseCardComponent {
  @Input() course!: Course;
  image: File | null = null;
}
