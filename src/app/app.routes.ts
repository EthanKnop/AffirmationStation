import { Routes } from '@angular/router';
import { RecordingGroupManager } from './recording-group-manager/recording-group-manager';
import { AffirmationHome } from './affirmation-home/affirmation-home';

export const routes: Routes = [
    { path: '', redirectTo: 'affirmation-home', pathMatch: 'full' },
    { path: 'affirmation-home', component: AffirmationHome },
    { path: 'affirmation-home/groups/:id', component: RecordingGroupManager }
];