import { Environment, Network, RecordSource, Store } from 'relay-runtime';

// wrapper around fetch to send a query the GQL server
import { fetchQuery } from './network';

// init relay environment with the default store
// and the network configuration
// the standard network configuration with fetch is being used
export const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});