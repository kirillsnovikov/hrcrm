<template>
  <div class="vacancy-edit" v-if="Object.keys(form).length">
    <div
      class="inline-buttons vacancy-edit__inline-buttons"
      v-scroll="handleScroll"
    >
      <div v-loading="loading">
        <el-button
          type="primary"
          class="el-button el-button--primary"
          @click="saveVacancyForm('form')"
        >
          <span>Сохранить</span>
        </el-button>
        <el-button
          @click="resetForm('form')"
          class="el-button inline-buttons__btn"
        >
          <span>Закрыть</span>
        </el-button>
      </div>
    </div>
    <el-form
      id="vacancy-edit"
      ref="form"
      :model="form"
      :rules="rules"
      status-icon
      class="vacancy-form demo-ruleForm"
      label-width="auto"
      size="medium"
    >
      <div class="vacancy-form__wrapper">
        <div class="vacancy-form__section">
          <div class="hidden-elems">
            <input type="hidden" name="module" value="HRPAC_VACANCY" />
            <input type="hidden" name="record" :value="form.id || ''" />
            <input type="hidden" name="action" value="Save" />
            <input type="hidden" name="jsqon_return" value="1" />
          </div>
          <el-form-item
            class="row"
            label="Наименование вакансии"
            prop="name_id"
          >
            <el-select
              v-model="form.name_id"
              name="name_id"
              placeholder=""
              :rules="rules.name_id"
              filterable
              no-match-text="Нет результатов поиска"
              @change="
                changeOption(
                  'name_id',
                  'hrpac_vacancy_names_id_c',
                  'vacancy_names'
                )
              "
            >
              <el-option
                v-for="vacancy in options.vacancy_names"
                :key="vacancy.id"
                :label="vacancy.name"
                :value="vacancy.name"
              ></el-option>
            </el-select>
            <input
              type="hidden"
              name="hrpac_vacancy_names_id_c"
              :value="form.hrpac_vacancy_names_id_c"
            />
          </el-form-item>
          <el-form-item
            v-if="form.name_id === 'Другое'"
            label="Другое"
            prop="other_name"
            class="row"
            :rules="rules.other_name"
          >
            <el-input
              v-model.lazy="form.other_name"
              name="other_name"
              maxlength="100"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="row"
            label="Количество"
            prop="amount"
            :rules="rules.amount"
          >
            <el-input
              type="number"
              name="amount"
              :min="1"
              :max="100"
              v-model.lazy="form.amount"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Статус"
            prop="status_id"
            class="row"
            :rules="rules.status_id"
          >
            <el-select
              v-model="form.status_id"
              name="status_id"
              placeholder=""
              filterable
              no-match-text="Нет результатов поиска"
              @change="
                changeOption(
                  'status_id',
                  'hrpac_vacancy_statuses_id_c',
                  'vacancy_statuses'
                )
              "
            >
              <el-option
                v-for="status in options.vacancy_statuses"
                :key="status.id"
                :label="status.name"
                :value="status.name"
              ></el-option>
            </el-select>
            <input
              type="hidden"
              name="hrpac_vacancy_statuses_id_c"
              :value="form.hrpac_vacancy_statuses_id_c"
            />
          </el-form-item>
        </div>
        <div class="vacancy-form__section">
          <h3>Основная информация</h3>
          <el-form-item
            label="Бизнес юнит"
            class="row"
            prop="business_unit_id"
            :rules="rules.business_unit_id"
          >
            <el-select
              v-model="form.business_unit_id"
              name="business_unit_id"
              placeholder=""
              filterable
              no-match-text="Нет результатов поиска"
              @change="
                changeOption(
                  'business_unit_id',
                  'hrpac_business_units_id_c',
                  'business_units'
                )
              "
            >
              <el-option
                v-for="unit in options.business_units"
                :key="unit.id"
                :label="unit.name"
                :value="unit.name"
              ></el-option>
            </el-select>
            <input
              type="hidden"
              name="hrpac_business_units_id_c"
              :value="form.hrpac_business_units_id_c"
            />
          </el-form-item>
          <el-form-item
            label="Отдел"
            class="row"
            prop="department_id"
            :rules="rules.department_id"
          >
            <el-select
              v-model="form.department_id"
              name="department_id"
              placeholder=""
              filterable
              no-match-text="Нет результатов поиска"
              @change="
                changeOption(
                  'department_id',
                  'hrpac_departments_id_c',
                  'hrpac_departments'
                )
              "
            >
              <el-option
                v-for="opt in options.hrpac_departments"
                :key="opt.id"
                :label="opt.name"
                :value="opt.name"
              ></el-option>
            </el-select>
            <input
              type="hidden"
              name="hrpac_departments_id_c"
              :value="form.hrpac_departments_id_c"
            />
          </el-form-item>
          <el-form-item label="Проект" prop="project_link_id" class="row">
            <el-select
              v-model="form.project_link_id"
              name="project_link_id"
              placeholder=""
              filterable
              no-match-text="Нет результатов поиска"
              @change="
                changeOption('project_link_id', 'project_id_c', 'projects')
              "
            >
              <el-option
                v-for="project in options.projects"
                :key="project.id"
                :label="project.name"
                :value="project.name"
              ></el-option>
            </el-select>
            <input
              type="hidden"
              name="project_id_c"
              :value="form.project_id_c"
            />
          </el-form-item>
          <el-form-item
            label="Локация"
            prop="location_id"
            class="row"
            :rules="rules.location_id"
          >
            <el-select
              name="location_id"
              v-model="form.location_id"
              filterable
              no-match-text="Нет результатов поиска"
              placeholder=""
              @change="
                changeOption('location_id', 'hrpac_cities_id_c', 'locations')
              "
            >
              <el-option
                v-for="location in options.locations"
                :key="location.id"
                :label="location.name"
                :value="location.name"
              ></el-option>
            </el-select>
            <input
              type="hidden"
              name="hrpac_cities_id_c"
              :value="form.hrpac_cities_id_c"
            />
          </el-form-item>
          <el-form-item label="Грейд" class="row">
            <el-select
              v-model="grade"
              name="grade"
              multiple
              placeholder=""
              filterable
              no-match-text="Нет результатов поиска"
              @change="convertTagData(grade, 'grade')"
            >
              <el-option
                v-for="option in options.grades"
                :key="option.id"
                :data-key="option.id"
                :label="option.name"
                :value="option.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Оклад" class="row">
            <div class="el-input el-input--medium form-item form-item_width_30">
              <el-form-item prop="salary_min" :rules="rules.salary_min">
                <the-mask
                  type="text"
                  name="salary_min"
                  class="el-input__inner"
                  @change="validateField('salary_min')"
                  placeholder="От"
                  :masked="false"
                  :mask="[
                    '### ',
                    '# ###',
                    '## ###',
                    '### ### ',
                    '# ### ###',
                    '## ### ###'
                  ]"
                  v-model.lazy.trim="salary_min"
                  :value="(salary_min = Number(salary_min))"
                ></the-mask>
              </el-form-item>
            </div>
            <div class="el-input el-input--medium form-item form-item_width_30">
              <el-form-item prop="salary_max" :rules="rules.salary_max">
                <the-mask
                  type="text"
                  name="salary_max"
                  class="el-input__inner"
                  @change="validateField('salary_max')"
                  placeholder="До"
                  :masked="false"
                  :mask="[
                    '### ',
                    '# ###',
                    '## ###',
                    '### ### ',
                    '# ### ###',
                    '## ### ###'
                  ]"
                  v-model.lazy.trim="salary_max"
                  :value="(salary_max = Number(salary_max))"
                ></the-mask>
              </el-form-item>
            </div>
            <el-select
              v-model="form.currency_id"
              name="currency_id"
              placeholder="Валюта"
              class="form-item form-item_width_35"
              filterable
              no-match-text="Нет результатов поиска"
            >
              <el-option
                v-for="option in fields.currency_id.options"
                :key="option.id"
                :label="option.name"
                :value="option.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Стек" prop="stack" class="row">
            <el-input
              v-model.lazy="form.stack"
              name="stack"
              maxlength="100"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Должностные обязанности и требования"
            prop="description"
            class="row"
          >
            <el-input
              type="textarea"
              name="description"
              v-model.lazy="form.description"
              show-word-limit
              maxlength="2000"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Шаблоны этапов подбора"
            prop="stage_templates_name"
            class="row"
          >
            <el-select
              v-model="form.stage_templates_name"
              name="stage_templates_name"
              placeholder=""
              filterable
              no-match-text="Нет результатов поиска"
              @change="
                changeOption(
                  'stage_templates_name',
                  'stage_templates_id',
                  'stage_templates'
                )
              "
            >
              <el-option
                v-for="opt in options.stage_templates"
                :key="opt.id"
                :label="opt.name"
                :value="opt.name"
              ></el-option>
            </el-select>
            <input
              type="hidden"
              name="stage_templates_id"
              :value="form.stage_templates_id"
            />
          </el-form-item>
        </div>
        <div class="vacancy-form__section">
          <h3>Участники</h3>
          <el-form-item
            label="Линейный руководитель"
            prop="supervisor_id"
            class="row"
            :rules="rules.supervisor_id"
          >
            <el-select
              v-model="form.supervisor_id"
              name="supervisor_id"
              placeholder=""
              filterable
              no-match-text="Нет результатов поиска"
              @change="
                changeOption('supervisor_id', 'user_id1_c', 'users_list')
              "
            >
              <el-option
                v-for="user in options.users_list"
                :key="user.id"
                :label="user.name"
                :value="user.name"
              ></el-option>
            </el-select>
            <input type="hidden" name="user_id1_c" :value="form.user_id1_c" />
          </el-form-item>
          <el-form-item
            label="Нанимающий менеджер"
            prop="manager_id"
            class="row"
            :rules="rules.manager_id"
          >
            <el-select
              v-model="form.manager_id"
              name="manager_id"
              placeholder=""
              filterable
              no-match-text="Нет результатов поиска"
              @change="changeOption('manager_id', 'user_id_c', 'users_list')"
            >
              <el-option
                v-for="user in options.users_list"
                :key="user.id"
                :label="user.name"
                :value="user.name"
              ></el-option>
            </el-select>
            <input type="hidden" name="user_id_c" :value="form.user_id_c" />
          </el-form-item>
          <el-form-item label="Рекрутер" prop="assigned_user_name" class="row">
            <el-select
              v-model="form.assigned_user_name"
              name="assigned_user_name"
              placeholder=""
              filterable
              no-match-text="Нет результатов поиска"
              @change="
                changeOption(
                  'assigned_user_name',
                  'assigned_user_id',
                  'users_list'
                )
              "
            >
              <el-option
                v-for="user in options.users_list"
                :key="user.id"
                :label="user.name"
                :value="user.name"
              ></el-option>
            </el-select>
            <input
              type="hidden"
              name="assigned_user_id"
              :value="form.assigned_user_id"
            />
          </el-form-item>
          <el-form-item label="Дополнительные рекрутеры" class="row">
            <el-select
              v-model="additional_assigned_ids"
              multiple
              placeholder=""
              filterable
              no-match-text="Нет результатов поиска"
            >
              <el-option
                v-for="user in options.users_list"
                :key="user.id"
                :label="user.name"
                :value="user.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Дополнительные менеджеры" class="row">
            <el-select
              v-model="additional_managers_ids"
              multiple
              placeholder=""
              filterable
              no-match-text="Нет результатов поиска"
            >
              <el-option
                v-for="user in options.users_list"
                :key="user.id"
                :label="user.name"
                :value="user.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Наблюдатели" class="row">
            <el-select
              v-model="spectators_ids"
              multiple
              placeholder=""
              filterable
              no-match-text="Нет результатов поиска"
            >
              <el-option
                v-for="user in options.users_list"
                :key="user.id"
                :label="user.name"
                :value="user.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { scrollToError } from '@/utils/helpers';
import { mask, TheMask } from 'vue-the-mask';
const FormData = require('form-data');
const SCROLL_VALUE = 90;

export default {
  directives: { mask },
  props: {
    fields: {
      type: Object
    },
    options: {
      type: Object
    }
  },
  data() {
    const validateSalaryMin = (rule, value, callback) => {
      if (Number(value) > Number(this.form.salary_max)) {
        callback(new Error('Введен неверный диапазон сумм'));
      } else {
        callback();
      }
    };
    const validateSalaryMax = (rule, value, callback) => {
      if (Number(value) < Number(this.form.salary_min)) {
        callback(new Error('Введен неверный диапазон сумм'));
      } else {
        callback();
      }
    };
    return {
      resume_file: [],
      form: {},
      rules: {
        name_id: [
          {
            required: true,
            message: 'Необходимо выбрать наименование вакансии',
            trigger: 'change'
          }
        ],
        other_name: [
          {
            required: true,
            message: 'Необходимо указать другое наименование вакансии',
            trigger: 'change'
          }
        ],
        amount: [
          {
            required: true,
            message: 'Необходимо указать количество кандидатов',
            trigger: 'change'
          }
        ],
        status_id: [
          {
            required: true,
            message: 'Необходимо выбрать статус вакансии',
            trigger: 'change'
          }
        ],
        location_id: [
          {
            required: true,
            message: 'Необходимо выбрать локацию',
            trigger: 'change'
          }
        ],
        business_unit_id: [
          {
            required: true,
            message: 'Необходимо выбрать Бизнес Юнит',
            trigger: 'change'
          }
        ],
        department_id: [
          {
            required: true,
            message: 'Необходимо выбрать отдел',
            trigger: 'change'
          }
        ],
        manager_id: [
          {
            required: true,
            message: 'Необходимо указать нанимающего менеджера',
            trigger: 'change'
          }
        ],
        supervisor_id: [
          {
            required: true,
            message: 'Необходимо указать линейного руководителя',
            trigger: 'change'
          }
        ],
        salary_min: [
          {
            validator: validateSalaryMin,
            trigger: 'blur'
          }
        ],
        salary_max: [
          {
            validator: validateSalaryMax,
            trigger: 'blur'
          }
        ]
      },
      grade: [],
      additional_assigned_ids: [],
      additional_managers_ids: [],
      spectators_ids: [],
      salary_min: '',
      salary_max: '',
      loading: false
    };
  },
  mounted() {
    for (let key in this.fields) {
      const additionalRole =
        key == 'additional_assigned_ids' ||
        key == 'additional_managers_ids' ||
        key == 'spectators_ids';
      const value = this.fields[key].value;

      this.$set(this.form, key, value);
      if (key == 'grade' && value) {
        this[key] = this.form[key].replace(/\^/g, '').split(',');
      }
      if (additionalRole && value) {
        this[key] = this.form[key];
      }
    }
    this.salary_min = this.form.salary_min.split('.')[0];
    this.salary_max = this.form.salary_max.split('.')[0];
    if (!this.form.currency_id) {
      this.$set(
        this.form,
        'currency_id',
        this.fields.currency_id.options['-99'].id
      );
    }
    const gradeOptions = this.fields.grade.options;
    for (let key in gradeOptions) {
      this.options.grades.push({ id: key, name: gradeOptions[key] });
    }
    this.filterCities();
  },
  methods: {
    handleScroll(evt, el) {
      if (window.scrollY > SCROLL_VALUE) {
        el.classList.add('scroll');
      } else {
        el.classList.remove('scroll');
      }
    },
    saveVacancyForm(formName) {
      const form = document.getElementById('vacancy-edit');
      let formData = new FormData(form);
      formData.set('grade', this.grade);
      formData.set('currency_id', this.form.currency_id);

      this.$refs[formName].validate((valid, fields) => {
        if (valid) {
          this.loading = true;
          this.$axios
            .post('index.php', formData, {
              header: {
                'Content-Type': 'multipart/form-data'
              },
              params: {
                spectators_ids: this.spectators_ids,
                additional_assigned_ids: this.additional_assigned_ids,
                additional_managers_ids: this.additional_managers_ids
              }
            })
            .then(resp => {
              const newId = resp.data.id;
              this.loading = false;
              window.location.replace(
                `index.php?module=HRPAC_VACANCY&action=DetailView&record=${newId}`
              );
            })
            .catch(err => console.log('save form error', err));
        } else {
          scrollToError(fields, SCROLL_VALUE);
          console.log('Заполните обязательные поля!');
          return false;
        }
      });
    },
    formatSalary(val, key, precision = 2) {
      const format = parseFloat(val).toFixed(precision);
      this.$set(this.form, key, format);
      if (this.$refs.form) {
        this.$refs.form.validateField(['salary_min', 'salary_max']);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      location.replace(
        '/index.php?module=HRPAC_VACANCY&action=index&parentTab=Основная'
      );
    },
    changeOption(option, model, source) {
      if (source && this.options[source]) {
        const selectedOpt = this.options[source].filter(
          opt => opt.name === this.form[option]
        );
        this.form[model] = selectedOpt[0].id;
      }
      if (option === 'location_id') {
        this.filterCities();
      }
    },
    convertTagData(tag, prop) {
      if (prop === 'grade') {
        const gradeOptions = this.options.grades;
        const result = this.filterByOrder(prop, gradeOptions);
        this[prop] = result;
        this.form[prop] = result;
      } else {
        this.form[prop] = tag.join(',');
      }
    },
    filterByOrder(key, options) {
      return this[key].sort(
        (a, b) =>
          options.findIndex(({ id }) => id === a) -
          options.findIndex(({ id }) => id === b)
      );
    },
    filterCities() {
      // упорядочиваем список городов, две столицы - в топ списка
      const cities = this.options.locations;
      const thisCity = this.form.location_id;
      cities.sort((a, b) => a.name.localeCompare(b.name));
      const priorityCities = ['Санкт-Петербург', 'Москва'];
      if (
        !priorityCities.filter(city => !thisCity || city === thisCity).length
      ) {
        priorityCities.push(thisCity);
      }
      priorityCities.map(city => {
        const idx = cities.findIndex(({ name }) => name == city);
        const movedCity = cities.filter(({ name }) => name == city)[0];
        cities.splice(idx, 1);
        cities.unshift(movedCity);
      });
    }
  },
  watch: {
    salary_min: function() {
      const precision = this.fields.salary_min.precision;
      this.formatSalary(this.salary_min, 'salary_min', precision);
    },
    salary_max: function() {
      const precision = this.fields.salary_max.precision;
      this.formatSalary(this.salary_max, 'salary_max', precision);
    }
  },
  components: { TheMask }
};
</script>
