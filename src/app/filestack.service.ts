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

  deleteFile(handle: string) {
    return this.client.remove(handle, {
      policy: 'eyJleHBpcnkiOjE3MzU1OTk2MDAsImNhbGwiOlsicGljayIsInJlYWQiLCJ3cml0ZSIsInN0b3JlIiwicmVtb3ZlIl19',
      signature: '86a449eff9507e6962412ec6e6a41a9f1db0ca26de207caacaa70393d45e20f7'
    });
  }
}
