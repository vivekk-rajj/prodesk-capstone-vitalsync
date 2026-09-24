import 'dotenv/config';
import app from './app.js';
import { connectDatabase } from './config/database.js';

const port = process.env.PORT || 5000;

connectDatabase()
  .then(() => app.listen(port, () => console.log(`VitalSync API listening on port ${port}`)))
  .catch((error) => {
    console.error('Unable to start API', error);
    process.exit(1);
  });
