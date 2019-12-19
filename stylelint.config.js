module.exports = {
  rules: {
    'block-no-empty': null,
    'color-no-invalid-hex': true,
    'comment-empty-line-before': [
      'always',
      {
        ignore: ['after-comment']
      }
    ],
    'comment-whitespace-inside': 'always',
    'number-leading-zero': 'always',
    'no-invalid-double-slash-comments': true,
    'declaration-colon-space-after': 'always',
    'declaration-bang-space-after': 'never',
    'declaration-block-semicolon-newline-after': 'always',
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
    'unit-whitelist': ['em', 'rem', '%', 's', 'px', 'ms']
  }
};
