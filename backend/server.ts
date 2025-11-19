import express from 'express';
import cors from 'cors';
import AffirmationRecordingEndpoints from './affirmation-recording-endpoints';

const app = express();
const port = Number(process.env.PORT) || 3003;

app.use(cors());
app.use(express.json());

// Register API endpoints
new AffirmationRecordingEndpoints(app);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
