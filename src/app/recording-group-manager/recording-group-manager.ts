import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Recording, RecordingGroup } from '../models/recording-group.model';

@Component({
  selector: 'app-recording-group-manager',
  imports: [],
  templateUrl: './recording-group-manager.html',
  styleUrl: './recording-group-manager.css',
})
export class RecordingGroupManager {

  @Input() recordingGroup: RecordingGroup | null = null;

  isRecording = false;
  mediaRecorder: MediaRecorder | null = null;
  chunks: BlobPart[] = [];
  recordingStart = 0;
  elapsedMs = 0;
  timerId: any;
  error: string | null = null;
  editingRecordingId: string | null = null;
  editingRecordingName = '';

  constructor(private sanitizer: DomSanitizer) {

    // temp create recording group if none provided
    if (!this.recordingGroup) {
      this.recordingGroup = {
        id: 'temp-group',
        name: 'Temporary Group',
        recordings: []
      };
    }
  }

  get canRecord(): boolean {
    return !!(navigator.mediaDevices && (navigator.mediaDevices as any).getUserMedia) && typeof MediaRecorder !== 'undefined';
  }

  startRecording() {
    if (!this.canRecord || this.isRecording) return;
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.chunks = [];
        this.isRecording = true;
        this.recordingStart = performance.now();
        this.timerId = setInterval(() => {
          this.elapsedMs = performance.now() - this.recordingStart;
        }, 200);
        this.mediaRecorder.ondataavailable = e => {
          if (e.data && e.data.size > 0) this.chunks.push(e.data);
        };
        this.mediaRecorder.onstop = () => {
          clearInterval(this.timerId);
          const blob = new Blob(this.chunks, { type: 'audio/webm' });
          const objectUrl = URL.createObjectURL(blob);
          const safe = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
          const duration = this.elapsedMs;
          if (this.recordingGroup) {
            const rec: Recording = {
              id: crypto.randomUUID(),
              name: `Recording ${this.recordingGroup.recordings.length + 1}`,
              url: safe,
              createdAt: Date.now(),
              durationMs: duration
            };
            this.recordingGroup.recordings.push(rec);
          }
          this.resetRecordingState(stream);
        };
        this.mediaRecorder.start();
      })
      .catch(err => {
        this.error = err?.message || 'Failed to access microphone';
      });
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
    }
  }

  cancelRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop(); // will finalize; but we discard chunks below
      this.chunks = []; // discard
    }
  }

  private resetRecordingState(stream: MediaStream) {
    stream.getTracks().forEach(t => t.stop());
    this.mediaRecorder = null;
    this.isRecording = false;
    this.elapsedMs = 0;
    this.recordingStart = 0;
    this.timerId = null;
    this.chunks = [];
  }

  formatElapsed(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  startEditing(rec: Recording) {
    this.editingRecordingId = rec.id;
    this.editingRecordingName = rec.name;
  }

  commitEditing(rec: Recording) {
    if (this.editingRecordingId === rec.id) {
      const trimmed = this.editingRecordingName.trim();
      if (trimmed) rec.name = trimmed;
    }
    this.cancelEditing();
  }

  cancelEditing() {
    this.editingRecordingId = null;
    this.editingRecordingName = '';
  }

  deleteRecording(rec: Recording) {
    if (!this.recordingGroup) return;
    this.recordingGroup.recordings = this.recordingGroup.recordings.filter(r => r.id !== rec.id);
    // Cannot revoke SafeUrl directly; but object URL would be earlier - omitted for now.
    if (this.editingRecordingId === rec.id) this.cancelEditing();
  }

}
