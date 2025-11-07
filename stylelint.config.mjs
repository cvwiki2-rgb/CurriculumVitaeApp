/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  plugins: ['stylelint-color-format'],
  rules: {
    'color-named': 'never',
    'color-no-hex': true,
    'color-format/format': {
      format: 'rgb',
    },
  },
};
