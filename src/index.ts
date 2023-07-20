import {client} from './bot';
import {createAPI} from './api';
const PORT = process.env.PORT || 8000;

const api = createAPI(client);
api.listen(PORT, () => {
  console.log(`api running at http://localhost:${PORT}`);
});