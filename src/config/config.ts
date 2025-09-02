import { Config } from './interface';

export default (): Config => ({
  port: parseInt(process.env.PORT || '', 10),
  brandId: process.env.BRAND_ID,
  apiKey: process.env.API_KEY,
  s2sToken: process.env.S2S_TOKEN,
  apiUrl: process.env.API_URL,
});
