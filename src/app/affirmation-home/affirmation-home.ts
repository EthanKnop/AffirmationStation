import { Component } from '@angular/core';
import { RecordingGroups } from "../recording-groups/recording-groups";
import { MainPlayer } from "../main-player/main-player";

@Component({
  selector: 'app-affirmation-home',
  imports: [RecordingGroups, MainPlayer],
  templateUrl: './affirmation-home.html',
  styleUrl: './affirmation-home.css',
})
export class AffirmationHome {

}
