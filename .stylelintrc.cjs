module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-prettier',
    'stylelint-config-clean-order',
  ],
  plugins: ['stylelint-scss'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    'scss/at-rule-no-unknown': true,
    'scss/dollar-variable-pattern': null,
    'max-nesting-depth': 3,
    'no-descending-specificity': null,
    'color-named': 'never',
    'declaration-block-no-duplicate-properties': true,
    'block-no-empty': true,
    'number-max-precision': 6,
  },
};
