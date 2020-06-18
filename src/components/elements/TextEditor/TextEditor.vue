<template>
  <el-form-item :label="label" :prop="name" class="ql-editor-container">
    <vue-editor
      v-model="editedText"
      ref="editor"
      :editor-toolbar="customToolbar"
      :disabled="disabled"
      @text-change="handleChange"
      :class="['el-textarea', disabled ? 'is-disabled' : '']"
    >
    </vue-editor>
    <span :class="['el-input__count', disabled ? 'is-disabled' : '']">
      {{ `${textLength}/${maxLength}` }}
    </span>
    <el-input
      type="hidden"
      :value="editedText"
      :name="name"
      v-show="false"
    ></el-input>
  </el-form-item>
</template>

<script>
import './ql-editor.scss';
import { VueEditor } from 'vue2-editor';

export default {
  props: {
    name: {
      type: String
    },
    label: {
      type: String
    },
    text: {
      type: String,
      default: ''
    },
    rule: {
      type: [Object, Array]
    },
    formVisible: {
      type: Boolean,
      default: true
    },
    maxLength: {
      type: Number,
      default: 50000
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editedText: '',
      textLength: 0,
      customToolbar: [
        // [{ header: [false, 1, 2, 3, 4, 5, 6] }], // размер текста
        ['bold', 'italic', 'underline'], // курсив/ форматирование текста
        // [
        //   { align: '' },
        //   { align: 'center' }, // выравнивание текста
        //   { align: 'right' },
        //   { align: 'justify' }
        // ],
        // ['blockquote', 'code-block'], // цитата, редактор кода
        // [{ list: 'ordered' }, { list: 'bullet' }], // форматирование в виде списка
        // [{ indent: '-1' }, { indent: '+1' }], // отступы
        [{ color: [] }, { background: [] }] // цвет текста, фона, в формате rgb
        // ['image', 'code-block', 'video'], // прикрепление файлов, img, video
        // ['clean'] // очистить содержимое
      ]
    };
  },
  created() {
    var matches = [...this.text.matchAll(/<(\/?)div/gim)];
    let editedStr = '';
    let startIndex = 0;

    matches.map((tag, i) => {
      let strLength = 0;

      if (tag[0]) {
        strLength = tag[0].length;

        if (i === 0 && tag.index !== 0) {
          editedStr += this.text.slice(startIndex, tag.index);
        }
        startIndex = tag.index + strLength;
        var replace = tag[1] && tag[1] === '/' ? '</p' : '<p';
        editedStr += replace;

        const nextIteration = i !== matches.length - 1;
        if (nextIteration) {
          editedStr += this.text.slice(startIndex, matches[i + 1].index);
        } else {
          editedStr += this.text.slice(startIndex, this.text.length);
        }
      }
    });

    this.editedText = editedStr || this.text;
  },
  mounted() {
    if (
      this.formVisible &&
      !document.querySelector('#quill-container.el-textarea__inner')
    ) {
      document
        .getElementById('quill-container')
        .classList.add('el-textarea__inner');
    }
  },
  updated() {
    if (!this.editedText && this.textLength !== 0) {
      this.textLength = 0;
    }

    if (
      this.formVisible &&
      !document.querySelector('#quill-container.el-textarea__inner')
    ) {
      document
        .getElementById('quill-container')
        .classList.add('el-textarea__inner');
    }
  },
  methods: {
    handleChange() {
      let count = 0;
      const max = this.maxLength;

      // пробегаемся по вложенным тегам и текстовым узлам
      const editorTags = document.querySelector('.ql-editor').children;
      for (let n = 0; n < editorTags.length; n++) {
        const nodes = editorTags[n].childNodes;

        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const text = node.nodeType !== 3 ? node.innerText : node.nodeValue;

          count += text.length;

          if (count > max) {
            const num = max - count;

            if (node.innerText) {
              node.innerText = node.innerText.replace(
                node.innerText.slice(num),
                ''
              );
            }
            if (node.nodeValue) {
              node.nodeValue = node.nodeValue.replace(
                node.nodeValue.slice(num),
                ''
              );
            }
          }
        }
      }

      this.textLength = count;
    }
  },
  watch: {
    editedText: function() {
      this.$emit('set-text-value', this.editedText);
    }
  },
  components: {
    VueEditor
  }
};
</script>
