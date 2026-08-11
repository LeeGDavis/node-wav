import { neostandard } from 'neostandard';

export default [
  ...neostandard({
    env: ['node'],
    noJsx: true,
    semi: true
  }),
  {
    files: ['test/**/*.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly'
      }
    }
  }
];
