/** @type {import('stylelint').Config} */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
  ],
  plugins: ['stylelint-scss', 'stylelint-order'],
  customSyntax: 'postcss-scss',
  ignoreFiles: [
    '**/node_modules/**',
    '.next/**',
    'dist/**',
    'out/**',
  ],
  rules: {
    // Allow SCSS at-rules
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,

    // Allow nesting for SCSS
    'no-descending-specificity': null,

    // Optional: match project preferences
    'selector-class-pattern': null,
    'color-hex-length': 'short',

    // Disallow single-line declaration blocks (enforced, not auto-fixed)
    'declaration-block-single-line-max-declarations': 0,

    // Fix the rule names and remove duplicates
    'no-invalid-position-at-import-rule': null,
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-redundant-longhand-properties': true,
    
    // Disable the problematic rule that's causing your errors
    'no-invalid-position-declaration': null,

  },
};