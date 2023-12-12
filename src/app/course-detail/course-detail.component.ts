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
import { LectureListItemComponent } from '../components/lecture-list-item/lecture-list-item.component';
import { LoaderComponent } from '../components/loader/loader.component';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [ModalComponent, CreateLectureFormComponent, AsyncPipe, LectureListItemComponent, LoaderComponent],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent implements OnInit {
  fileStackService = inject(FilestackService);
  firestore = inject(Firestore);
  route = inject(ActivatedRoute);
  course: Course | null = null;
  isLoadingCourse = false;
  lectures$!: Observable<Lecture[]>;
  isCreateLectureModalOpen = false;

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
    this.isLoadingCourse = true;
    const courseSnapshot = await getDoc(
      doc(this.firestore, `courses/${courseId}`)
    );
    this.course = courseSnapshot.data() as Course;
    this.isLoadingCourse = false;
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
