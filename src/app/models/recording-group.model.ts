import { SafeUrl } from '@angular/platform-browser';

export interface Recording {
  id: string;
  name: string;
  url: SafeUrl; // blob/object URL sanitized
  createdAt: number;
  durationMs: number;
}

export interface RecordingGroup {
  id: string;
  name: string;
  recordings: Recording[];
}
