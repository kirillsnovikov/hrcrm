module.exports = {
  rules: {
    'block-no-empty': null,
    'color-no-invalid-hex': true,
    'comment-empty-line-before': [
      'always',
      {
        ignore: ['stylelint-commands', 'after-comment']
      }
    ],
    'declaration-colon-space-after': 'always',
    'declaration-bang-space-after': 'never',
    'declaration-block-semicolon-newline-after': 'always',
    // 'declaration-block-semicolon-space-after': 'never-single-line',
    // 'declaration-colon-space-after': 'always-single-line',
    indentation: [
      2,
      {
        except: ['value']
      }
    ],
    'max-empty-lines': 1,
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment']
      }
    ],
    'unit-whitelist': ['em', 'rem', '%', 's', 'px']
  }
};
