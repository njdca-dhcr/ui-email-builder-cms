import type { GatsbyConfig } from 'gatsby'
import postcssPresetEnv from 'postcss-preset-env'

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Email Builder`,
    appMode: process.env.GATSBY_APP_MODE,
    env: process.env.NODE_ENV,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-root-import`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Email Builder (Beta)`,
        short_name: `Email Builder (Beta)`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#285f77`,
        display: `standalone`,
        icon: `src/images/favicon.png`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/email-templates/`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.tsx`,
        manualInit: true,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          postcssPresetEnv(), // includes autoprefixer
        ],
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: 'Public Sans',
            file: 'https://fonts.googleapis.com/css?family=Public%20Sans:700&display=swap&subset=cyrillic',
          },
          {
            name: 'Public Sans',
            file: 'https://fonts.googleapis.com/css?family=Public%20Sans:600&display=swap&subset=cyrillic',
          },
          {
            name: 'Public Sans',
            file: 'https://fonts.googleapis.com/css?family=Public%20Sans:400&display=swap&subset=cyrillic',
          },
          {
            name: 'Public Sans',
            file: 'https://fonts.googleapis.com/css?family=Public%20Sans:400i&display=swap&subset=cyrillic',
          },
          {
            name: 'Public Sans',
            file: 'https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@1,700&display=swap',
          },
          {
            name: 'Public Sans',
            file: 'https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,600;1,700&display=swap',
          },
          { name: 'EB Garamond', file: 'https://fonts.googleapis.com/css?family=EB+Garamond:400' },
          {
            name: 'Roboto Mono',
            file: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&display=swap',
          },
        ],
      },
    },
  ],
}

export default config
