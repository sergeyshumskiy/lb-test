import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { name } from '../../package.json';

const sdk = new NodeSDK({
  instrumentations: [getNodeAutoInstrumentations()],
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: name,
  }),
});

try {
  sdk.start();
  console.log('OpenTelemetry initialized');
} catch (err) {
  console.error('Tracing init error:', err);
}

process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((err) => console.error('Error shutdown tracing', err))
    .finally(() => process.exit(0));
});
