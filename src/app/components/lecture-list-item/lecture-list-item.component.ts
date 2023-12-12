import { Component, Input, inject } from '@angular/core';
import { Course, Lecture } from '../../types';
import { CommonModule } from '@angular/common';
import { FilestackService } from '../../filestack.service';
import { PickerOptions } from 'filestack-js';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { File } from 'filestack-js/build/main/lib/api/upload';

@Component({
  selector: 'app-lecture-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lecture-list-item.component.html',
  styleUrl: './lecture-list-item.component.scss'
})
export class LectureListItemComponent {
  isOpen = false;
  @Input() lecture!: Lecture;
  @Input() course!: Course;
  firestore = inject(Firestore);
  fileStackService = inject(FilestackService);

  toggle() {
    if (!this.lecture.description && !this.lecture.videoUrl) {
      return;
    }
    this.isOpen = !this.isOpen;
  }

  uploadFile($event: Event) {
    $event.stopImmediatePropagation();
    const options: PickerOptions = {
      fromSources: [
        'local_file_system',
        'googledrive',
        'unsplash',
        'facebook',
        'instagram',
      ],
      maxFiles: 20,
      customText: {
        "Select Files to Upload": `Upload video for ${this.lecture.title}`
      },
      uploadInBackground: false,
      onUploadDone: (res: any) => {
        this.deletePreviousVideo(this.lecture);
        this.setVideoUrl(res.filesUploaded[0]);
        this.updateCourseImage(res.filesUploaded[0]);
      },
    };
    this.fileStackService.openPicker(options);
  }


  setVideoUrl(file: File) {
    this.lecture.videoUrl = file.url;
  }

  updateCourseImage(file: File) {
    updateDoc(doc(this.firestore, `courses/${this.course.id}/lectures/${this.lecture.id}`), {
      ...this.lecture,
      videoUrl: file.url,
    });
  }

  async deletePreviousVideo(lecture: Lecture) {
    const handle = lecture.videoUrl?.split('/').at(-1);
    if (!handle) {
      return;
    }
    const resp = await this.fileStackService.deleteFile(handle);
    console.log({
      resp,
    });
  }
}
