import { Config } from './interface';

export default (): Config => ({
  port: Number(process.env.PORT) || 3000,
});
