module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['.eslintrc.cjs', 'next.config.js', 'jest.config.js'],
  plugins: ['@typescript-eslint', 'eslint-comments', 'promise', 'prettier'],
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.cjs'],
  },
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': [0],
    indent: [0],
    quotes: ['error', 'single', { avoidEscape: true }],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'no-unused-expressions': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'eslint-comments/disable-enable-pair': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
        typedefs: true,
      },
    ],
  },
  overrides: [
    {
      files: ['components/**/*.ts*'],
      excludedFiles: ['*.cjs'],
      rules: { 'import/no-default-export': 'error' },
    },
  ],
};
