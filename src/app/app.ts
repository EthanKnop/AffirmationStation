import { Component } from '@angular/core';
import { MainPlayer } from "./main-player/main-player";
import { SettingsService } from './services/settings-service';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public settingsService: SettingsService) {}
}
