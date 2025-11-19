import { Injectable } from '@angular/core';
import { RecordingGroup } from '../models/recording-group.model';
import { SettingsService } from './settings-service';

@Injectable({
  providedIn: 'root',
})
export class RecordingGroupService {

  public recordingGroups: RecordingGroup[] = [];

  constructor(private settingsService: SettingsService) {
    this.fetchRecordingGroups();
  }

  fetchRecordingGroups() {
    let getRecordingGroupsUrl = `http://${this.settingsService.backendUrl}/recording-groups`;

    fetch(getRecordingGroupsUrl)
      .then(response => response.json())
      .then((data: RecordingGroup[]) => {
        this.recordingGroups = data;
      })
      .catch(error => {
        console.error('Error fetching recording groups:', error);
      });
  }
  
}
