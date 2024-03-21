export default () => ({
    port: parseInt(process.env.PORT, 10) || 8087,
    zoho_api_url: process.env.ZOHO_API_URL
  });