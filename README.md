# UI Email Builder CMS

This repo contains the entirety of the Email Builder CMS. It uses the following technologies:

- [Decap CMS](https://decapcms.org/)
- [Gatsby](https://www.gatsbyjs.com/)
- [NodeJS](https://nodejs.org/en)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## Development

Before beginning, make sure you have NodeJS v18 or higher installed.

### Running the Development Server

To work on this project on your local machine:

1. Clone the repo with `git clone git@github.com:newjersey/ui-email-builder-cms.git`
2. Install dependencies with `npm install`
3. Run the development server with `npm run development`
4. Visit `localhost:8000/` to visit the homepage and `localhost:8000/admin` to visit the admin interface

### Using Decap Locally

The following is adapted from [the docs](https://decapcms.org/docs/beta-features/#working-with-a-local-git-repository).

1. Make sure `static/admin/config.yml` contains `local_backend: true` before any other configuration. **Note:** do not commit this change since turns off authentication
2. Run `npx decap-server`
3. In a different terminal pane or window run `npm run development`

Now any changes you publish in Decap CMS on your local machine will appear in your local repository.

### Linting

To see which files are different, run `npm run lint`. To have automatically correct any lint errors
run `npm run lint:fix`.

## Deployment
