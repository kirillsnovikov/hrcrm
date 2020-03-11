<template>
  <div class="candidate-edit" v-if="Object.keys(form).length">
    <div
      class="inline-buttons candidate-edit__inline-buttons"
      v-scroll="handleScroll"
    >
      <div v-loading="loading">
        <button
          type="button"
          class="el-button el-button--primary"
          @click="saveCandidateForm('form')"
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
    </div>
    <el-form
      id="candidate-form"
      ref="form"
      :model="form"
      :rules="rules"
      status-icon
      class="candidate-form demo-ruleForm"
      label-width="auto"
      size="medium"
      enctype="multipart/form-data"
    >
      <div class="candidate-form__section">
        <div class="hidden-elems">
          <input type="hidden" name="module" value="HRPAC_CANDIDATES" />
          <input type="hidden" name="record" :value="form.id || ''" />
          <input type="hidden" name="action" value="Save" />
          <input type="hidden" name="name" :value="setFullname" />
          <input type="hidden" name="jsqon_return" value="1" />
        </div>
        <h3>Основная информация</h3>
        <div class="candidate-form__block candidate-form__block_pos_left">
          <el-form-item label="Фамилия" prop="last_name" class="row">
            <el-input
              name="last_name"
              v-model.lazy="form.last_name"
              maxlength="100"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Имя"
            prop="first_name"
            :rules="rules.first_name"
            class="row"
          >
            <el-input
              name="first_name"
              v-model.lazy="form.first_name"
              maxlength="100"
            ></el-input>
          </el-form-item>
          <el-form-item label="Отчество" prop="middle_name" class="row">
            <el-input
              name="middle_name"
              v-model.lazy="form.middle_name"
              class="row"
              maxlength="100"
            ></el-input>
          </el-form-item>
          <el-form-item label="Пол" prop="gender" class="row">
            <el-select name="gender" v-model="form.gender" placeholder="">
              <el-option
                v-for="(name, val) in fields.gender.options"
                :key="val"
                :label="name"
                :value="val"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Дата рождения" prop="birth_date" class="row">
            <el-date-picker
              type="date"
              name="birth_date"
              :format="`${datepicker.dateFormat}`"
              :value-format="`${datepicker.dateFormat}`"
              v-mask="`${datepicker.mask}`"
              v-model="form.birth_date"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="Локация" prop="location_id" class="row">
            <el-select
              v-model="form.location_id"
              name="location_id"
              placeholder=""
              filterable
              no-match-text="Нет результатов поиска"
              @change="changeOption('location_id', 'hrpac_cities_id_c')"
            >
              <el-option
                v-for="option in fields.location_id.options"
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
        </div>
        <div class="candidate-form__block candidate-form__block_pos_right">
          <Upload
            v-if="!form.photo"
            :accept="'image/png, image/jpeg, image/jpg'"
            :listType="'picture-card'"
            name="photo_file"
            :file="photo_file"
            :limit="1"
            :uploadText="'Загрузить фото'"
          ></Upload>
          <div class="photo-block" v-if="form.photo">
            <img
              :src="
                `/index.php?entryPoint=download&id=${form.id}_photo&type=HRPAC_CANDIDATES`
              "
              alt=""
            />
            <el-button
              type="primary"
              size="small"
              icon="el-icon-delete"
              @click="removeCandidatePhoto"
            ></el-button>
          </div>
          <input type="hidden" name="deleteAttachment" value="0" />
          <input type="hidden" name="photo_record_id" :value="form.id || ''" />
        </div>
      </div>
      <div class="candidate-form__section">
        <h3>Контакты</h3>
        <el-menu
          ref="menu"
          :collapse="true"
          mode="horizontal"
          menu-trigger="click"
          @select="selectContact"
        >
          <el-submenu index="1">
            <template slot="title">
              <el-button circle icon="el-icon-plus" size="mini"></el-button>
            </template>
            <div class="el-menu-list">
              <el-menu-item-group v-for="(item, idx) in contactOpts" :key="idx">
                <el-menu-item v-if="!item.submenu" :index="idx">
                  {{ item.title }}
                </el-menu-item>
                <el-submenu v-else :index="idx" :popper-append-to-body="true">
                  <span slot="title">{{ item.title }}</span>
                  <el-menu-item
                    v-for="(it, idx) in item.submenu"
                    :key="idx"
                    :index="idx"
                  >
                    {{ it.title }}
                  </el-menu-item>
                </el-submenu>
              </el-menu-item-group>
            </div>
          </el-submenu>
        </el-menu>
        <contact-form
          :contacts="form.contacts"
          @delete-contact="deleteContact"
          @set-value="setContactValue"
          @set-list="setContactList"
          class="candidate-form__block candidate-form__block_pos_left"
        ></contact-form>
      </div>
      <div class="candidate-form__section">
        <h3>Желаемая зарплата и опыт</h3>
        <div class="candidate-form__block candidate-form__block_pos_left">
          <el-form-item label="Желаемая должность" prop="specialty" class="row">
            <el-input
              name="specialty"
              v-model.lazy="form.specialty"
              maxlength="50"
            ></el-input>
          </el-form-item>
          <el-form-item label="Желаемая зарплата" prop="salary" class="row">
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
            <el-form-item class="form-item form-item_width_35 row">
              <el-select
                name="currency_id"
                v-model="form.currency_id"
                filterable
                placeholder="Валюта"
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
          <el-form-item label="Опыт работы" prop="experience" class="row">
            <el-input
              name="experience"
              type="text"
              v-model.lazy="form.experience"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Последнее место работы"
            prop="last_work"
            class="row"
          >
            <el-input
              name="last_work"
              v-model.lazy="form.last_work"
              maxlength="50"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Последняя должность"
            prop="last_post"
            class="row"
          >
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
            class="row"
            prop="resume_source_id"
          >
            <el-select
              v-model="form.resume_source_id"
              name="resume_source_id"
              placeholder=""
              filterable
              no-match-text="Нет результатов поиска"
              @change="changeOption('resume_source_id', 'hrpac_sources_id_c')"
            >
              <el-option
                v-for="option in sources"
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
          <el-form-item label="Ссылка на резюме" prop="resume_url" class="row">
            <el-input
              name="resume_url"
              v-model.lazy="form.resume_url"
              maxlength="500"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Дата обновления"
            prop="resume_date_upd"
            class="row"
          >
            <el-date-picker
              type="datetime"
              name="resume_date_upd"
              :format="`${datepicker.dateFormat} HH:mm`"
              :value-format="`${datepicker.dateFormat} HH:mm`"
              v-mask="`${datepicker.mask} ##:##`"
              v-model="form.resume_date_upd"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="Резюме" prop="resume_text" class="row">
            <el-input
              type="textarea"
              name="resume_text"
              v-model="form.resume_text"
              show-word-limit
              maxlength="3000"
            ></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { formatHtml, scrollToError } from '@/utils/helpers';
import { mask, TheMask } from 'vue-the-mask';
import Upload from 'Elements/Upload/Upload.vue';
import ContactForm from 'Elements/ContactForm/ContactForm.vue';
const FormData = require('form-data');
const SCROLL_VALUE = 90;

export default {
  directives: { mask },
  props: {
    fields: {
      type: Object
    },
    dateFormat: {
      type: Object
    }
  },
  data() {
    return {
      form: {},
      photo_file: [],
      rules: {
        first_name: [
          {
            required: true,
            message: 'Необходимо указать имя',
            trigger: 'blur'
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
      formattedHtml: '',
      datepicker: {
        dateFormat: '',
        timeFormat: '',
        mask: ''
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      sources: [],
      loading: false,
      contactOpts: {
        '1-1': {
          type: 'E-mail',
          title: 'E-mail'
        },
        '1-2': {
          type: 'phone',
          title: 'Телефон'
        },
        '1-3': {
          type: 'Skype',
          title: 'Skype'
        },
        '1-4': {
          title: 'Социальные сети',
          submenu: {
            '1-4-1': {
              type: 'Telegram',
              title: 'Telegram'
            }
          }
        }
      },
      selectedContactsOption: null,
      activeContactItem: '1'
    };
  },
  mounted() {
    this.sources = this.fields.resume_source_id.options;
    for (let key in this.fields) {
      if (key === 'resume_text' || key === 'resume_source_id') {
        this.$set(this.form, key, formatHtml(this.fields[key].value));
      } else {
        this.$set(this.form, key, this.fields[key].value);
      }
    }
    this.$set(this.form, 'contacts', []);
    this.setDateFormat();
    if (!this.form.currency_id) {
      this.$set(
        this.form,
        'currency_id',
        this.fields.currency_id.options['-99'].id
      );
    }

    this.sources.map((source, idx) =>
      this.$set(this.sources[idx], 'name', formatHtml(source.name))
    );
    this.formattedSalary = this.form.salary.split('.')[0];
    this.filterCities();
  },
  computed: {
    setFullname() {
      return `${this.form.last_name} ${this.form.first_name} ${this.form.middle_name}`;
    }
  },
  methods: {
    handleScroll(evt, el) {
      if (window.scrollY > SCROLL_VALUE) {
        el.classList.add('scroll');
      } else {
        el.classList.remove('scroll');
      }
    },
    setDateFormat() {
      if (this.dateFormat) {
        const dateSeparator = this.dateFormat.date.match(/[./-]/g)[0];
        const dateArray = this.dateFormat.date
          .replace(/%/g, '')
          .split(dateSeparator);
        const format = dateArray.map(item => {
          item =
            item == 'Y'
              ? item.toLowerCase()
              : item == 'm'
              ? item.toUpperCase()
              : item;
          return item == 'd' || item == 'M' ? item.repeat(2) : item.repeat(4);
        });
        const mask = format.map(item =>
          item.replace(item, '#'.repeat(item.length))
        );

        this.$set(this.datepicker, 'dateFormat', format.join(dateSeparator));
        this.$set(this.datepicker, 'mask', mask.join(dateSeparator));
      }
    },
    saveCandidateForm(formName) {
      const form = document.getElementById('candidate-form');
      let formData = new FormData(form);
      formData.set('gender', this.form.gender);
      formData.set('currency_id', this.form.currency_id);

      if (this.photo_file.length) {
        const { raw: blob, name } = this.photo_file[0];
        formData.set('photo_file', blob, name);
      }
      this.$refs[formName].validate((valid, fields) => {
        if (valid) {
          // this.loading = true;
          // this.$axios
          //   .post('index.php', formData, {
          //     header: {
          //       'Content-Type': 'multipart/form-data'
          //     }
          //   })
          //   .then(resp => {
          //     const newId = resp.data.id;
          //     this.loading = false;
          //     window.location.replace(
          //       `index.php?module=HRPAC_CANDIDATES&action=DetailView&record=${newId}`
          //     );
          //   })
          //   .catch(err => console.log('save form error', err));
        } else {
          scrollToError(fields, SCROLL_VALUE);
          console.log('Заполните обязательные поля!');
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
      if (option === 'location_id') {
        this.filterCities();
      }
    },
    removeCandidatePhoto() {
      const form = document.querySelector('.el-form');
      const formData = new FormData(form);
      this.$axios
        .post('index.php?entryPoint=deleteAttachment&field=photo', formData, {
          header: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          window.location.replace(
            `index.php?module=HRPAC_CANDIDATES&action=EditView&record=${this.form.id}`
          );
        })
        .catch(err => console.log('photo remove error', err));
    },
    filterCities() {
      // упорядочиваем список городов, две столицы - в топ списка
      // const cities = this.fields.location_id.options;
      // const currentCity = this.form.location_id;
      // cities.sort((a, b) => a.name.localeCompare(b.name));
      // const priorityCities = ['Санкт-Петербург', 'Москва'];
      // if (
      //   !priorityCities.filter(city => !currentCity || city === currentCity).length
      // ) {
      //   priorityCities.push(currentCity);
      // }
      // priorityCities.map(city => {
      //   const idx = cities.findIndex(({ name }) => name == city);
      //   const movedCity = cities.filter(({ name }) => name == city)[0];
      //   cities.splice(idx, 1);
      //   cities.unshift(movedCity);
      // });
    },
    selectContact(key, arr) {
      const [, ...activeKeys] = arr;
      this.selectedContactsOption = this.contactOpts;

      activeKeys.map(i => {
        if (this.selectedContactsOption[i].submenu) {
          this.selectedContactsOption = this.selectedContactsOption[i].submenu;
        } else {
          this.selectedContactsOption = this.selectedContactsOption[i];
        }
      });

      let label, icon;
      switch (this.selectedContactsOption.type) {
        case 'phone':
          if (
            !this.form.contacts.filter(item => item.value_type === 'phone')
              .length
          ) {
            label = 'Основной телефон';
          } else {
            label = 'Дополнительный телефон';
          }
          icon = ['fab', 'whatsapp-square'];
          break;

        case 'E-mail':
          label = 'E-mail';
          icon = ['far', 'envelope'];
          break;

        case 'Telegram':
          label = 'Telegram';
          icon = ['fab', 'telegram'];
          break;

        case 'Skype':
          label = 'Skype';
          icon = ['fab', 'skype'];
          break;

        default:
          break;
      }
      const id = String(Date.now()); // локальный id
      this.form.contacts.push({
        id,
        value_type: this.selectedContactsOption.type,
        label,
        icon,
        value: ''
      });
      this.form[id] = '';
      this.form = Object.assign({}, this.form);
    },
    deleteContact(item, index) {
      const contacts = this.form.contacts;
      contacts.splice(index, 1);
      this.$delete(this.form, item.id);

      if (item.value_type === 'phone' && item.label === 'Основной телефон') {
        const index = contacts.findIndex(it => it.value_type === 'phone');
        if (index !== -1) {
          this.$set(contacts[index], 'label', 'Основной телефон');
        }
      }
      // this.form = Object.assign({}, this.form);
    },
    setContactValue(id, index, val) {
      this.$set(this.form.contacts[index], 'value', val);
      this.$set(this.form, id, val);
      this.form = Object.assign({}, this.form);
      let valid = false;
      this.$refs.form.validateField(id, function(err) {
        valid = !!err;
      });
      this.$set(this.form.contacts[index], 'valid', valid);
    },
    setContactList(list) {
      if (list) {
        this.form.contacts = list;
        this.form.contacts
          .filter(item => item.value_type === 'phone')
          .map((item, idx) =>
            idx === 0
              ? (item.label = 'Основной телефон')
              : (item.label = 'Дополнительный телефон')
          );
        this.form = Object.assign({}, this.form);
      }
    }
  },
  watch: {
    formattedSalary: function() {
      const precision = this.fields.salary.precision;
      this.formatSalary(this.formattedSalary, 'salary', precision);
    }
  },
  components: { TheMask, Upload, ContactForm }
};
</script>
