<template>
  <div class="candidate-edit" v-if="Object.keys(form).length">
    <h1>Кандидат</h1>
    <div class="inline-buttons candidate-edit__inline-buttons">
      <button
        type="button"
        class="el-button el-button--primary"
        @click="uploadResumeFile"
      >
        <span>Сохранить</span>
      </button>
      <button
        type="button"
        @click="resetForm('form')"
        class="el-button inline-buttons__btn el-button--primary"
      >
        <span>Закрыть</span>
      </button>
    </div>
    <el-form
      ref="form"
      id="form"
      :model="form"
      :rules="rules"
      status-icon
      class="candidate-form demo-ruleForm"
      label-width="auto"
      size="medium"
      enctype="multipart/form-data"
    >
      <div class="hidden-elems">
        <input type="hidden" name="module" value="HRPAC_CANDIDATES" />
        <input type="hidden" name="record" :value="form.id || ''" />
        <input type="hidden" name="isDuplicate" value="false" />
        <input type="hidden" name="action" value="Save" />
        <input type="hidden" name="return_module" value="HRPAC_CANDIDATES" />
        <input type="hidden" name="return_action" value="DetailView" />
        <input type="hidden" name="return_id" :value="form.id || ''" />
        <input type="hidden" name="module_tab" />
        <input type="hidden" name="contact_role" />
        <input type="hidden" name="offset" value="1" />
        <input type="hidden" name="relate_to" value="HRPAC_CANDIDATES" />
        <input type="hidden" name="relate_id" :value="form.id || ''" />
      </div>
      <form id="upload-doc" enctype="multipart/form-data">
        <upload
          class="upload-doc"
          :candidateId="form.id"
          :name="'filename_file'"
          :accept="'.doc,.docx,.rtf'"
          :file="resume_file"
          :uploadText="'Загрузить резюме из файла .doc, .docx, .rtf'"
          @upload-resume="uploadResumeFile"
        ></upload>
      </form>
      <div class="candidate-form__section">
        <h3>Основная информация</h3>
        <div class="candidate-form__block candidate-form__block_pos_left">
          <el-form-item label="Фамилия" prop="last_name">
            <el-input
              name="last_name"
              v-model.lazy="form.last_name"
              maxlength="100"
            ></el-input>
          </el-form-item>
          <el-form-item label="Имя" prop="first_name">
            <el-input
              name="first_name"
              v-model.lazy="form.first_name"
              maxlength="100"
            ></el-input>
          </el-form-item>
          <el-form-item label="Отчество" prop="middle_name">
            <el-input
              v-model.lazy="form.middle_name"
              name="middle_name"
              maxlength="100"
            ></el-input>
          </el-form-item>
          <el-form-item label="Пол" prop="gender">
            <el-select name="gender" v-model="form.gender" placeholder="" :default-first-option="true" filterable>
              <el-option
                v-for="(name, val) in fields.gender.options"
                :key="val"
                :label="name"
                :data-val="val"
                :value="val"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Дата рождения" prop="birth_date">
            <el-date-picker
              type="date"
              name="birth_date"
              value-format="dd.MM.yyyy"
              format="dd.MM.yyyy"
              v-mask="'##.##.####'"
              v-model="form.birth_date"
              :picker-options="pickerOptions"
            ></el-date-picker>
            <!-- :default-value="['01.01.1930', new Date().toLocaleDateString()]" -->
          </el-form-item>
        </div>
        <div class="candidate-form__block candidate-form__block_pos_right">
          <upload
            :candidateId="form.id"
            :name="'photo_file'"
            :accept="'image/png, image/jpeg, image/jpg'"
            :listType="'picture-card'"
            :file="photo_file"
            :uploadText="'Загрузить фото'"
          ></upload>
          <input type="hidden" name="deleteAttachment" value="0" />
          <input type="hidden" name="photo_record_id" :value="form.id || ''" />
          <input type="hidden" name="photo_escaped" value="" />
        </div>
      </div>
      <div class="candidate-form__section">
        <h3>Контакты</h3>
        <div class="candidate-form__block candidate-form__block_pos_left">
          <el-form-item label="Локация" prop="location_id">
            <el-select
              v-model="form.location_id"
              name="location_id"
              placeholder=""
              filterable
              :default-first-option="true"
              autocomplete
              auto-complete
              no-match-text="Нет результатов поиска"
              @change="changeOption('location_id', 'hrpac_cities_id_c')"
            >
              <el-option
                v-for="option in cityOptions"
                :key="option.id"
                :label="option.name"
                :value="option.name"
              ></el-option>
            </el-select>
            <input
              type="hidden"
              name="hrpac_cities_id_c"
              v-model="form.hrpac_cities_id_c"
            />
          </el-form-item>
          <el-form-item label="Мобильный телефон">
            <div class="el-input el-input-medium">
              <the-mask
                type="tel"
                name="phone_mobile_code"
                class="el-input__inner form-item form-item_width_18"
                v-model.lazy="form.phone_mobile_code"
                :masked="false"
                :mask="['+#', '+##', '+###', '+####']"
              ></the-mask>
              <the-mask
                type="tel"
                name="phone_mobile"
                class="el-input__inner form-item form-item_width_80"
                :masked="false"
                :mask="['(###) ###-##-##']"
                v-model.lazy="form.phone_mobile"
              ></the-mask>
            </div>
          </el-form-item>
          <!-- <el-form-item label="Домашний телефон">
            <div class="el-input el-input-medium">
              <the-mask
                type="tel"
                class="el-input__inner form-item form-item_width_18"
                v-model.lazy="form.phone_home_code"
                :masked="false"
                :mask="['+#', '+##', '+###', '+####']"
              ></the-mask>
              <the-mask
                type="tel"
                class="el-input__inner form-item form-item_width_80"
                :masked="false"
                :mask="['(###) ###-##-##']"
                v-model.lazy="form.phone_home"
              ></the-mask>
            </div>
          </el-form-item>
          <el-form-item label="Рабочий телефон">
            <div class="el-input el-input-medium">
              <the-mask
                type="tel"
                class="el-input__inner form-item form-item_width_18"
                v-model.lazy="form.phone_work_code"
                :masked="false"
                :mask="['+#', '+##', '+###', '+####']"
              ></the-mask>
              <the-mask
                type="tel"
                class="el-input__inner form-item form-item_width_80"
                :masked="false"
                :mask="['(###) ###-##-##']"
                v-model.lazy="form.phone_work"
              ></the-mask>
            </div>
          </el-form-item> -->
          <el-form-item label="Email" :rules="rules.email" prop="email">
            <el-input
              type="email"
              name="email"
              v-model.lazy="form.email"
              maxlength="64"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="Skype">
            <el-input v-model.lazy="form.skype"></el-input>
          </el-form-item>
          <el-form-item label="Telegram">
            <el-input v-model.lazy="form.telegram"></el-input>
          </el-form-item> -->
        </div>
      </div>
      <div class="candidate-form__section">
        <h3>Желаемая зарплата и опыт</h3>
        <div class="candidate-form__block candidate-form__block_pos_left">
          <el-form-item label="Желаемая должность" prop="specialty">
            <el-input
              name="specialty"
              v-model.lazy="form.specialty"
              maxlength="50"
            ></el-input>
          </el-form-item>
          <el-form-item label="Желаемая зарплата" prop="salary">
            <div class="el-input el-input--medium form-item form-item_width_63">
              <the-mask
                type="text"
                name="salary"
                class="el-input__inner"
                :masked="false"
                :mask="[
                  '### ',
                  '# ###',
                  '## ###',
                  '### ### ',
                  '# ### ###',
                  '## ### ###'
                ]"
                v-model.lazy.trim="formattedSalary"
              ></the-mask>
            </div>
            <el-form-item class="form-item form-item_width_35">
              <el-select
                name="currency_id"
                v-model="form.currency_id"
                placeholder=""
              >
                <el-option
                  v-for="option in fields.currency_id.options"
                  :key="option.id"
                  :label="option.name"
                  :value="option.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item label="Опыт работы" prop="experience">
            <el-input
              name="experience"
              type="text"
              v-model.lazy="form.experience"
            ></el-input>
          </el-form-item>
          <el-form-item label="Последнее место работы" prop="last_work">
            <el-input
              name="last_work"
              v-model.lazy="form.last_work"
              maxlength="50"
            ></el-input>
          </el-form-item>
          <el-form-item label="Последняя должность" prop="last_post">
            <el-input
              name="last_post"
              v-model.lazy="form.last_post"
              maxlength="50"
            ></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="candidate-form__section">
        <h3>Резюме</h3>
        <div class="candidate-form__block candidate-form__block_pos_left">
          <el-form-item
            label="Источник"
            :rules="rules.resume_source_id"
            prop="resume_source_id"
          >
            <el-select
              v-model="form.resume_source_id"
              name="resume_source_id"
              placeholder=""
              filterable
              autocomplete
              auto-complete
              no-match-text="Нет результатов поиска"
              @change="changeOption('resume_source_id', 'hrpac_sources_id_c')"
            >
              <el-option
                v-for="option in fields.resume_source_id.options"
                :key="option.id"
                :label="option.name"
                :value="option.name"
              ></el-option>
            </el-select>
            <input
              type="hidden"
              name="hrpac_sources_id_c"
              v-model="form.hrpac_sources_id_c"
            />
            <input type="hidden" name="self_response" value="0" />
          </el-form-item>
          <el-form-item label="Ссылка на резюме" prop="resume_url">
            <el-input
              name="resume_url"
              v-model.lazy="form.resume_url"
              maxlength="500"
            ></el-input>
          </el-form-item>
          <el-form-item label="Дата обновления" prop="resume_date_upd">
            <el-date-picker
              type="datetime"
              name="resume_date_upd"
              format="dd.MM.yyyy HH:mm"
              value-format="dd.MM.yyyy HH:mm"
              v-mask="'##.##.#### ##:##'"
              :picker-options="pickerOptions"
              v-model="form.resume_date_upd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="Резюме" prop="resume_text">
            <el-input
              type="textarea"
              name="resume_text"
              v-model="form.resume_text"
              maxlength="3000"
            ></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mask, TheMask } from 'vue-the-mask';
import Upload from 'Elements/Upload/Upload.vue';
const FormData = require('form-data');

export default {
  directives: { mask },
  props: {
    fields: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        // phone_home_code: '',
        // phone_home: '',
        // phone_work_code: '',
        // phone_work: '',
        // skype: '',
        // telegram: ''
      },
      resume_file: [],
      photo_file: [],
      rules: {
        // проверка даты на валидный год??
        email: [
          {
            required: true,
            message: 'Необходимо указать email',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'Введенный email указан некорректно',
            trigger: ['blur', 'change']
          }
        ],
        resume_source_id: [
          {
            required: true,
            message: 'Необходимо указать Источник резюме',
            trigger: 'change'
          }
        ]
      },
      formattedSalary: '',
      dateFormat: '',
      maskFormat: '',
      cityOptions: [
        {
          id: '123',
          name: 'Moscow'
        },
        {
          id: '456',
          name: 'Spb'
        }
      ],
      sources: [],
      formattedHtml: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  mounted() {
    this.$set(this.sources, [], this.fields.resume_source_id.options);
    for (let key in this.fields) {
      this.$set(this.form, key, this.fields[key].value);
    }
    this.formatHtml(this.form.resume_text, 'form', 'resume_text');
    this.sources.map((source, idx) =>
      this.formatHtml(source.name, 'sources', 'name', idx)
    );

    this.formattedSalary = this.form.salary.split('.')[0];
    this.fields.location_id.options = this.cityOptions;
    this.fields.resume_source_id.options = this.sources;
  },
  methods: {
    formatHtml(text, sourceVariable, key, idx = null) {
      const replacement = [[/&quot;/g, '"'], [/&gt;/g, '>'], [/&lt;/g, '<']];
      const variable =
        idx !== null ? this[sourceVariable][idx] : this[sourceVariable];
      const formattedText = text
        .replace(...replacement[0])
        .replace(...replacement[1])
        .replace(...replacement[2]);

      this.$set(variable, key, formattedText);
    },
    updateFormData(newId, formData) {
      // if (!this.form.id) {
      formData.set('module', 'Documents');
      formData.set('record', newId);
      formData.set('action', 'Save');
      formData.set('relate_to', 'hrpac_candidates_documents_1');
      formData.set('relate_id', newId);
      formData.set('parent_type', 'HRPAC_CANDIDATES');
      formData.set('parent_id', newId);
      formData.set('revision', '1');
      formData.set('jsqon_return', '1');
      // }
      return formData;
    },
    saveCandidateForm(formName) {
      const form = document.getElementById('form');
      const formData = new FormData(form);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post('/abv', formData, {
              header: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(() => console.log(123))
            .catch(err => console.log(1, err));
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      location.replace(
        '/index.php?module=HRPAC_CANDIDATES&action=index&parentTab=Основная'
      );
    },
    formatSalary(val, key, precision = 2) {
      const format = parseFloat(val).toFixed(precision);
      this.$set(this.form, key, format);
    },
    changeOption(option, model) {
      const selectedOpt = this.fields[option].options.filter(
        opt => opt.name === this.form[option]
      );
      this.form[model] = selectedOpt[0].id;
    },
    uploadResumeFile() {
      // const form = document.getElementById('upload-doc');
      this.$refs.form.validate((valid, obj) => {
        const field = Object.keys(obj)[0];
        console.log(document.querySelector(`input[name=${field}]`));
      });

      // let formData = new FormData(form);
      // this.$axios
      //   .post('/abc', formData, {
      //     header: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   })
      //   .then(() => console.log(123))
      //   .catch(err => console.log('get id error', err));
    }
  },
  watch: {
    formattedSalary: function() {
      const precision = this.fields.salary.precision;
      this.formatSalary(this.formattedSalary, 'salary', precision);
    },
    // formattedHtml: function() {
    //   this.formatHtml('form', 'resume_text', 'formattedHtml');
    // }
  },
  components: { TheMask, Upload }
};
</script>
