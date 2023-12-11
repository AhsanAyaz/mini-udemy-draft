import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FilestackService } from '../../filestack.service';
import { NgIf } from '@angular/common';
import { File } from 'filestack-js/build/main/lib/api/upload';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-create-course-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-course-form.component.html',
  styleUrl: './create-course-form.component.scss'
})
export class CreateCourseFormComponent {
  courseForm!: FormGroup;
  image: File | null = null;
  fb = inject(FormBuilder);
  firestore = inject(Firestore);
  filestackService = inject(FilestackService);

  constructor() {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  uploadFile() {
    const options = {
      fromSources: ['local_file_system', 'googledrive', 'unsplash', 'facebook', 'instagram'],
      maxFiles: 1,
      uploadInBackground: false,
      onUploadDone: (res: any) => this.setImageUrl(res.filesUploaded[0])
    };
    this.filestackService.openPicker(options);
  }

  setImageUrl(file: File) {
    this.image = file;
    this.courseForm.controls['image'].setValue(file.url);
  }

  async deleteFile() {
    try {
      const resp = await this.filestackService.deleteFile(this.image!.handle)
      console.log(resp);
      this.courseForm.controls['image'].reset();
      this.image = null;
    } catch (err) {
      alert('could not delete file');
    }
  }

  onSubmit() {
    const coll = collection(this.firestore, 'courses');
    if (this.courseForm.valid) {
      console.log('Course Data:', this.courseForm.value);
      // Further processing like sending data to the server...
      addDoc(coll, this.courseForm.value);
    }
  }
}
