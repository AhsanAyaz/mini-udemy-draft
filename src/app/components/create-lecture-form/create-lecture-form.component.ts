import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  Firestore,
  doc,
  setDoc,
  serverTimestamp,
} from '@angular/fire/firestore';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Course } from '../../types';
@Component({
  selector: 'app-create-lecture-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-lecture-form.component.html',
  styleUrl: './create-lecture-form.component.scss',
})
export class CreateLectureFormComponent {
  lectureForm!: FormGroup;
  fb = inject(FormBuilder);
  firestore = inject(Firestore);
  @Input() course!: Course;
  @Output() formSubmit = new EventEmitter<void>();

  constructor() {
    this.lectureForm = this.fb.group({
      title: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.lectureForm.valid) {
      const lectureId = self.crypto.randomUUID();
      const lectureDocRef = doc(
        this.firestore,
        `courses/${this.course.id}/lectures/${lectureId}`
      );
      setDoc(lectureDocRef, {
        id: lectureId,
        ...this.lectureForm.value,
        cts: serverTimestamp(),
      });
      this.formSubmit.emit();
    }
  }
}
