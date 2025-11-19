import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  public backendUrl: string | null = null;
  public isModalOpen: boolean = false;

  private port: string = '3003';

  constructor() {
    this.determineBackendUrl();
  }

  private determineBackendUrl(): void {
    const url = window.location.href;
    let urlParts = url.split('/');
    let ip = urlParts[2];

    if (ip.includes('localhost')) {
      this.backendUrl = 'localhost' + ':' + this.port;
    } else {
      ip = ip.split(':')[0];
      this.backendUrl = ip + ':' + this.port;
    }
  }
  
}
