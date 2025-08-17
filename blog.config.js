module.exports = {
  notionToken: process.env.NOTION_TOKEN,
  notionDatabaseId: process.env.NOTION_DATABASE_ID,
  routeBasePath: '/blog',
  theme: 'modern',
  plugins: [
    
  ],
  caching: {
    enabled: true,
    ttl: 3600
  },
  errorBoundaries: true,
  customization: {}
};