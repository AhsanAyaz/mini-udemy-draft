import { Injectable } from '@angular/core';
import { init, Client, PickerOptions } from 'filestack-js';

@Injectable({
  providedIn: 'root'
})
export class FilestackService {
  client: Client;
  constructor() {
    this.client = init('ACE4aO8mcTFe25kBeimxZz');
  }

  openPicker(options: PickerOptions = {}) {
    this.client.picker(options).open();
  }
}
