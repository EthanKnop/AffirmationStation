import express from 'express';
import { RecordingGroup } from '../src/app/models/recording-group.model';

export default class AffirmationRecordingEndpoints {
  constructor(private app: express.Express) {
    this.defineRoutes();
  }

  private defineRoutes() {

    this.app.get('/recording-groups', this.getRecordingGroups);

  }


  private getRecordingGroups(req: express.Request, res: express.Response) {
    // Implementation for getting recording groups
  }

}