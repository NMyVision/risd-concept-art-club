export default {
  routesFolder: [
    {
      src: 'src/pages',
      path: '',
      exclude: ['**/partials/**'],
    },
    {
      name: 'NotFound',
      src: 'src/pages/notfound',
      path: '[...path]'
    }
  ],
}
