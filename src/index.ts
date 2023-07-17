import express from 'express';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Phala } from './tools/Phala'

const app = express();
const port = 3000;

const wsProvider = new WsProvider('wss://khala.api.onfinality.io/public-ws');
const api = ApiPromise.create({ provider: wsProvider });
const phala = new Phala(api);

app.use(express.json());

app.post('/api/getPhalaComputation_workerBindings', async (req, res) => {
    const jsonData = req.body;

    const data = {
        AccountId32: await phala.getPhalaComputationWorkerBindings(jsonData['SpCoreSr25519Public'])
    }
    res.send(data);
});

app.post('/api/getPhalaComputation_sessions', async (req, res) => {
    const jsonData = req.body;
    const sessions = await phala.getPhalaComputationSessions(jsonData['AccountId32'])

    res.send(sessions);
});

app.post('/api/create_address', async (req, res) => {
    const jsonData = req.body;
    res.send(phala.createAddress());
});

app.post('/api/get_balance', async (req, res) => {
    const jsonData = req.body;
    const sessions = await phala.getBalance(jsonData['address'])
    res.send(sessions);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
