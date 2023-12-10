import { Component, inject } from '@angular/core';
import { FilestackService } from '../filestack.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {
  fileStackService = inject(FilestackService);
  course = {
    name: 'Introduction to Angular',
    description: 'Learn the fundamentals of Angular to build scalable web applications.',
    lectures: [
      { title: 'Setting up the Environment', duration: '15 min' },
      { title: 'Components and Modules', duration: '30 min' },
      // ... more lectures
    ]
  };

  uploadFile() {
    const options = {
      fromSources: [ 'local_file_system', 'googledrive', 'unsplash', 'facebook', 'instagram'],
      maxFiles: 20,
      uploadInBackground: false,
      onUploadDone: (res: any) => console.log(res),
    };
    this.fileStackService.openPicker(options)
  }
}
