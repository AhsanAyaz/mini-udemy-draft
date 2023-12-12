import { Component, inject, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-create-course-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-course-form.component.html',
  styleUrl: './create-course-form.component.scss',
})
export class CreateCourseFormComponent {
  courseForm!: FormGroup;
  fb = inject(FormBuilder);
  firestore = inject(Firestore);
  @Output() formSubmit = new EventEmitter<void>();
  constructor() {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  onSubmit() {
    const coll = collection(this.firestore, 'courses');
    if (this.courseForm.valid) {
      const id = self.crypto.randomUUID();
      setDoc(doc(coll, id), {
        id,
        ...this.courseForm.value,
      });
      this.formSubmit.emit();
    }
  }
}
