import { Component } from '@angular/core';
import { RecordingGroup } from '../models/recording-group.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recording-groups',
  imports: [],
  templateUrl: './recording-groups.html',
  styleUrl: './recording-groups.css',
})
export class RecordingGroups {

  groups: RecordingGroup[] = [];
  showAddGroup: boolean = false;

  constructor(private router: Router) {}

  toggleAddGroup() {
    this.showAddGroup = !this.showAddGroup;
  }

  addGroup(name: string) {
    const trimmed = (name || '').trim();
    if (!trimmed) {
      return; // ignore empty
    }
    const newGroup: RecordingGroup = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      name: trimmed,
      recordings: []
    };

    this.groups.push(newGroup);
  }

  editGroup(group: RecordingGroup) {
    this.router.navigate(['/affirmation-home/groups', group.id]);
  }

}
