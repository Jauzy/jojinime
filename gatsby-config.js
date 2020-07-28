module.exports = {
  siteMetadata: {
    title: `Jojinime`,
    description: `Streaming dan Download Anime tanpa iklan dan buffer dengan server tercepat! Buruan mampir dan cobain bedanya dengan web anime lain!`,
    author: `@alzaujy`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `media`,
    //     path: `${__dirname}/static/media/`,
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,

    //to enable netlify cms
    // `gatsby-plugin-netlify-cms`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sass`,
    {
      // The name of the plugin
      resolve: 'gatsby-source-mongodb',
      options: {
        // Name of the database and collection where are books reside
        dbName: 'jojinime',
        collection: ['animes', 'episodes', 'users'],
        server: {
          address: 'firstcluster-shard-00-02-zqwwp.gcp.mongodb.net',
          port: 27017
        },
        auth: {
          user: 'root',
          password: 'root'
        },
        extraParams: {
          replicaSet: 'Firstcluster-0',
          ssl: true,
          authSource: 'admin',
          retryWrites: true
        }
      }
    },
  ],
}
