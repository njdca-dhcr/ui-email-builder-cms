const React = require('react')
const gatsby = jest.requireActual('gatsby-plugin-image')

module.exports = {
  ...gatsby,
  StaticImage: jest.fn().mockImplementation(({ alias, ...rest }) =>
    React.createElement('img', {
      ...rest,
      'data-test-slice-alias': alias,
    }),
  ),
}
