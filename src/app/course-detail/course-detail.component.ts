import { Component, OnInit, inject } from '@angular/core';
import { FilestackService } from '../filestack.service';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { Course, Lecture } from '../types';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../components/modal/modal.component';
import { CreateLectureFormComponent } from '../components/create-lecture-form/create-lecture-form.component';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [ModalComponent, CreateLectureFormComponent, AsyncPipe],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent implements OnInit {
  fileStackService = inject(FilestackService);
  firestore = inject(Firestore);
  route = inject(ActivatedRoute);
  course: Course | null = null;
  lectures$!: Observable<Lecture[]>;
  isCreateLectureModalOpen = false;
  // course = {
  //   name: 'Introduction to Angular',
  //   description:
  //     'Learn the fundamentals of Angular to build scalable web applications.',
  //   lectures: [
  //     { title: 'Setting up the Environment', duration: '15 min' },
  //     { title: 'Components and Modules', duration: '30 min' },
  //     // ... more lectures
  //   ],
  // };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getCourse(id as string);
    this.lectures$ = collectionData(
      query(
        collection(this.firestore, `courses/${id}/lectures`),
        orderBy('cts', 'asc')
      )
    ) as Observable<Lecture[]>;
  }

  async getCourse(courseId: string) {
    const courseSnapshot = await getDoc(
      doc(this.firestore, `courses/${courseId}`)
    );
    this.course = courseSnapshot.data() as Course;
  }

  uploadFile() {
    const options = {
      fromSources: [
        'local_file_system',
        'googledrive',
        'unsplash',
        'facebook',
        'instagram',
      ],
      maxFiles: 20,
      uploadInBackground: false,
      onUploadDone: (res: any) => console.log(res),
    };
    this.fileStackService.openPicker(options);
  }
}
