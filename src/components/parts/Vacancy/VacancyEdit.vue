<template>
  <div class="vacancy-edit">
    <link href="https://cdn.quilljs.com/1.2.6/quill.snow.css" rel="stylesheet">
    <script src="https://cdn.quilljs.com/1.2.6/quill.min.js"></script>
    <h1>Вакансия</h1>
    <div class="inline-buttons vacancy-edit__inline-buttons">
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
    <el-form
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
          <el-form-item label="Наименование вакансии" prop="name_id">
            <el-select
              v-model="form.name_id"
              placeholder=""
              :rules="rules.name_id"
              filterable
              autocomplete
              auto-complete
              no-match-text="Нет результатов поиска"
            >
              <el-option
                v-for="vacancy in options.vacancy_names"
                :key="vacancy.id"
                :label="vacancy.name"
                :value="vacancy.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="form.name_id === 'Другое'"
            label="Другое"
            prop="other_name"
            :rules="rules.other_name"
          >
            <el-input v-model.lazy="form.other_name" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="Количество" prop="amount" :rules="rules.amount">
            <el-input
              type="number"
              :min="1"
              :max="100"
              v-model.lazy="form.amount"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Статус"
            prop="status_id"
            :rules="rules.status_id"
          >
            <el-select
              v-model="form.status_id"
              placeholder=""
              filterable
              autocomplete
              auto-complete
              no-match-text="Нет результатов поиска"
            >
              <el-option
                v-for="status in options.vacancy_statuses"
                :key="status.id"
                :label="status.name"
                :value="status.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="vacancy-form__section">
          <h2>Основная информация</h2>
          <el-form-item
            label="Бизнес юнит"
            prop="business_unit_id"
            :rules="rules.business_unit_id"
          >
            <el-select
              v-model="form.business_unit_id"
              placeholder=""
              filterable
              autocomplete
              auto-complete
              no-match-text="Нет результатов поиска"
            >
              <el-option
                v-for="unit in options.business_units"
                :key="unit.id"
                :label="unit.name"
                :value="unit.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="Отдел"
            prop="department_id"
            :rules="rules.department_id"
          >
            <el-select
              v-model="form.department_id"
              placeholder=""
              filterable
              autocomplete
              auto-complete
              no-match-text="Нет результатов поиска"
            >
              <el-option :label="'Test option'" :value="'werwr3'"></el-option>
              <!-- <el-option
                v-for="name in fields.department_id.options"
                :key="val"
                :label="name"
                :value="val"
              ></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="Проект" prop="project_link_id">
            <el-select
              v-model="form.project_link_id"
              placeholder=""
              filterable
              autocomplete
              auto-complete
              no-match-text="Нет результатов поиска"
            >
              <el-option
                v-for="project in options.projects"
                :key="project.id"
                :label="project.name"
                :value="project.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="Локация"
            prop="location_id"
            :rules="rules.location_id"
          >
            <el-select
              v-model="form.location_id"
              placeholder=""
              filterable
              autocomplete
              auto-complete
              no-match-text="Нет результатов поиска"
            >
              <el-option
                v-for="location in options.locations"
                :key="location.id"
                :label="location.name"
                :value="location.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Грейд">
            <el-select
              v-model="grade"
              multiple
              placeholder=""
              @change="convertTagData(grade, 'grade')"
              filterable
              autocomplete
              auto-complete
              no-match-text="Нет результатов поиска"
            >
              <el-option
                v-for="(name, val) in fields.grade.options"
                :key="val"
                :label="name"
                :value="name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Оклад">
            <el-input
              v-model.lazy.trim="form.salary_min"
              placeholder="От"
              class="form-item form-item_width_30"
            ></el-input>
            <el-input
              v-model.lazy.trim="form.salary_max"
              placeholder="До"
              class="form-item form-item_width_30"
            ></el-input>
            <el-select
              v-model="form.currency_id"
              placeholder=""
              class="form-item form-item_width_35"
            >
              <el-option
                v-for="option in fields.currency_id.options"
                :key="option.id"
                :label="option.name"
                :value="option.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Стек" prop="stack">
            <el-input v-model.lazy="form.stack" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item
            label="Должностные обязанности и требования"
            prop="description"
          >
            <el-input
              type="textarea"
              v-model.lazy="form.description"
              maxlength="2000"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Шаблоны этапов подбора"
            prop="stage_templates_name"
          >
            <el-select
              v-model="form.stage_templates_name"
              placeholder=""
              filterable
              autocomplete
              auto-complete
              no-match-text="Нет результатов поиска"
            >
              <el-option :label="'test stage'" :value="'valer353'"></el-option>
              <!-- <el-option
                v-for="name in fields.stage_templates_name.options"
                :key="val"
                :label="name"
                :value="val"
              ></el-option> -->
            </el-select>
          </el-form-item>
        </div>
        <div class="vacancy-form__section">
          <h2>Участники</h2>
          <el-form-item
            label="Линейный руководитель"
            prop="supervisor_id"
            :rules="rules.supervisor_id"
          >
            <el-select
              v-model="form.supervisor_id"
              placeholder=""
              filterable
              autocomplete
              auto-complete
              no-match-text="Нет результатов поиска"
            >
              <el-option
                v-for="user in options.users_list"
                :key="user.id"
                :label="`${user.first_name} ${user.last_name}`"
                :value="`${user.first_name} ${user.last_name}`"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="Нанимающий менеджер"
            prop="manager_id"
            :rules="rules.manager_id"
          >
            <!-- Проверка на роль <Рекрутер> или <Нанимающий менеджер> -->
            <el-select
              v-model="form.manager_id"
              placeholder=""
              filterable
              autocomplete
              auto-complete
              no-match-text="Нет результатов поиска"
            >
              <el-option
                v-for="user in options.users_list"
                :key="user.id"
                :label="`${user.first_name} ${user.last_name}`"
                :value="`${user.first_name} ${user.last_name}`"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Рекрутер" prop="assigned_user_name">
            <el-select
              v-model="form.assigned_user_name"
              placeholder=""
              filterable
              autocomplete
              auto-complete
              no-match-text="Нет результатов поиска"
            >
              <!-- Проверка на роль <Рекрутер> или <Нанимающий менеджер> -->
              <el-option
                v-for="user in options.users_list"
                :key="user.id"
                :label="`${user.first_name} ${user.last_name}`"
                :value="`${user.first_name} ${user.last_name}`"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Участники со стороны бизнеса">
            <el-select
              v-model="hr_participants"
              multiple
              placeholder=""
              @change="convertTagData(hr_participants, 'hr_participants')"
              filterable
              autocomplete
              auto-complete
              no-match-text="Нет результатов поиска"
            >
              <el-option
                v-for="user in options.users_list"
                :key="user.id"
                :label="`${user.first_name} ${user.last_name}`"
                :value="`${user.first_name} ${user.last_name}`"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Участники со стороны HR">
            <el-input type="textarea" :value="formatHtml"></el-input>
            <!-- <el-select
              v-model="business_participants"
              multiple
              placeholder=""
              @change="convertTagData(business_participants, 'business_participants')"
              filterable
              autocomplete
              auto-complete
              no-match-text="Нет результатов поиска"
            >
              <el-option
                v-for="user in options.users_list"
                :key="user.id"
                :label="`${user.first_name} ${user.last_name}`"
                :value="`${user.first_name} ${user.last_name}`"
              ></el-option>
            </el-select> -->
          </el-form-item>
          <div id="editor">
            <p>Hello World!</p>
            <p>Some initial <strong>bold</strong> text</p>
            <p><br></p>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
const quill = new Quill('#editor', {
  modules: {
    toolbar: '#toolbar'
  },
  theme: 'snow'
});

export default {
  props: {
    fields: {
      type: Object
    },
    options: {
      type: Object
    }
  },
  data() {
    return {
      html: '&lt;div id=&quot;sugar_text_HH-React-Root&quot;&gt;test 11111&lt;div&gt;',
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
        ]
      },
      grade: [],
      hr_participants: [],
      business_participants: []
    };
  },
  computed: {
    formatHtml() {
      return this.html
        .replace(/&quot;/g, '"')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<');
    }
  },
  mounted() {
    for (let key in this.fields) {
      this.$set(this.form, key, this.fields[key].value);
      if (
        (key == 'grade' ||
          key == 'hr_participants' ||
          key == 'business_participants') &&
        this.fields[key].value
      ) {
        this[key] = this.form[key].split(', ');
      }
    }
  },
  methods: {
    saveVacancyForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      location.replace(
        '/index.php?module=HRPAC_VACANCY&action=index&parentTab=Основная'
      );
    },
    convertTagData(tag, prop) {
      this.form[prop] = tag.join(', ');
    }
  }
};
</script>
