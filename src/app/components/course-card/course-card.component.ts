import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../../types';
import { FilestackService } from '../../filestack.service';
import { File } from 'filestack-js/build/main/lib/api/upload';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
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
  filestackService = inject(FilestackService);
  firestore = inject(Firestore);

  editCourseImage($event: Event) {
    $event.stopImmediatePropagation();
    const options = {
      fromSources: [
        'local_file_system',
        'googledrive',
        'unsplash',
        'facebook',
        'instagram',
      ],
      maxFiles: 1,
      uploadInBackground: true,
      onUploadDone: (res: any) => {
        this.deletePreviousImage(this.course);
        this.setImageUrl(res.filesUploaded[0]);
        this.updateCourseImage(res.filesUploaded[0]);
      },
    };
    this.filestackService.openPicker(options);
  }

  setImageUrl(file: File) {
    this.image = file;
    this.course.imageUrl = file.url;
  }

  updateCourseImage(file: File) {
    updateDoc(doc(this.firestore, `courses/${this.course.id}`), {
      ...this.course,
      imageUrl: file.url,
    });
  }

  async deletePreviousImage(course: Course) {
    const handle = course.imageUrl?.split('/').at(-1);
    if (!handle) {
      return;
    }
    const resp = await this.filestackService.deleteFile(handle);
    console.log({
      resp,
    });
  }
}
