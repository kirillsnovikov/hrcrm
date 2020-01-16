<template>
  <div class="candidate-edit" v-if="Object.keys(form).length">
    <h1>Кандидат</h1>
    <div class="inline-buttons candidate-edit__inline-buttons">
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
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      status-icon
      class="candidate-form demo-ruleForm"
      label-width="auto"
      size="medium"
      enctype="multipart/form-data"
    >
      <upload
        :candidateId="form.id"
        :accept="'.doc,.docx,.rtf'"
        :file="resume_file"
        :uploadText="'Загрузить резюме из файла .doc, .docx, .rtf'"
      ></upload>
      <div class="candidate-form__section">
        <h3>Основная информация</h3>
        <div class="candidate-form__block candidate-form__block_pos_left">
          <el-form-item label="Фамилия" prop="last_name">
            <el-input v-model.lazy="form.last_name" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="Имя" prop="first_name">
            <el-input v-model.lazy="form.first_name" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="Отчество" prop="middle_name">
            <el-input
              v-model.lazy="form.middle_name"
              maxlength="100"
            ></el-input>
          </el-form-item>
          <el-form-item label="Пол" prop="gender">
            <el-select v-model="form.gender" placeholder="">
              <el-option
                v-for="(name, val) in fields.gender.options"
                :key="val"
                :label="name"
                :value="val"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Дата рождения" prop="birth_date">
            <el-date-picker
              type="date"
              value-format="dd.MM.yyyy"
              format="dd.MM.yyyy"
              v-mask="'##.##.####'"
              v-model="form.birth_date"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="candidate-form__block candidate-form__block_pos_right">
          <upload
            :candidateId="form.id"
            :accept="'image/png, image/jpeg, image/jpg'"
            :listType="'picture-card'"
            :file="photo_file"
            :uploadText="'Загрузить фото'"
          ></upload>
        </div>
      </div>
      <div class="candidate-form__section">
        <h3>Контакты</h3>
        <div class="candidate-form__block candidate-form__block_pos_left">
          <el-form-item label="Локация" prop="location_id">
            <el-select v-model="form.location_id" placeholder="">
              <el-option label="Moscow" value="shanghai"></el-option>
              <el-option label="Spb" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Мобильный телефон" prop="phone_mobile">
            <div class="el-input el-input-medium">
              <the-mask
                type="tel"
                class="el-input__inner form-item form-item_width_18"
                v-model.lazy="form.phone_mobile_code"
                :masked="false"
                :mask="['+#', '+##', '+###', '+####']"
              ></the-mask>
              <the-mask
                type="tel"
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
                class="el-input__inner"
                :masked="false"
                :mask="[
                  '# (###) ###-##-##',
                  '## (###) ###-##-##',
                  '### (###) ###-##-##',
                  '#### (###) ###-##-##'
                ]"
                v-model.lazy="form.phone_home"
              ></the-mask>
            </div>
          </el-form-item>
          <el-form-item label="Рабочий телефон">
            <div class="el-input el-input-medium">
              <the-mask
                type="tel"
                class="el-input__inner"
                :masked="false"
                :mask="[
                  '# (###) ###-##-##',
                  '## (###) ###-##-##',
                  '### (###) ###-##-##',
                  '#### (###) ###-##-##'
                ]"
                v-model.lazy="form.phone_work"
              ></the-mask>
            </div>
          </el-form-item> -->
          <el-form-item label="Email" :rules="rules.email" prop="email">
            <el-input
              type="email"
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
            <el-input v-model.lazy="form.specialty" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="Желаемая зарплата" prop="salary">
            <div
              class="el-input el-input--medium form-item form-item_width_63"
            >
              <the-mask
                type="text"
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
                v-model.lazy.trim="form.salary"
                :value="Math.ceil(form.salary)"
              ></the-mask>
            </div>
            <el-form-item class="form-item form-item_width_35">
              <el-select v-model="form.currency_id" placeholder="">
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
            <el-input type="text" v-model.lazy="form.experience"></el-input>
          </el-form-item>
          <el-form-item label="Последнее место работы" prop="last_work">
            <el-input v-model.lazy="form.last_work" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="Последняя должность" prop="last_post">
            <el-input v-model.lazy="form.last_post" maxlength="50"></el-input>
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
            <el-select v-model="form.resume_source_id" placeholder="">
              <el-option
                v-for="option in fields.resume_source_id.options"
                :key="option.id"
                :label="option.name"
                :value="option.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Ссылка на резюме" prop="resume_url">
            <el-input v-model.lazy="form.resume_url" maxlength="500"></el-input>
          </el-form-item>
          <el-form-item label="Дата обновления" prop="resume_date_upd">
            <el-date-picker
              type="date"
              format="dd.MM.yyyy"
              value-format="dd.MM.yyyy"
              v-mask="'##.##.####'"
              v-model="form.resume_date_upd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="Резюме" prop="resume_text">
            <el-input
              type="textarea"
              v-model.lazy="form.resume_text"
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

export default {
  directives: { mask },
  props: {
    fields: {
      type: Object
    }
  },
  data() {
    return {
      form: {},
      resume_file: [],
      photo_file: [],
      //   resume_file: [], // уточнить переменную
      //   phone_home: '', // уточнить переменную
      //   phone_work: '', // уточнить переменную
      //   skype: '', // уточнить переменную
      //   telegram: '', // уточнить переменную
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
      }
    };
  },
  mounted() {
    for (let key in this.fields) {
      this.$set(this.form, key, this.fields[key].value);
    }
  },
  methods: {
    saveCandidateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // из сохраненной формы выцепить локальные данные формы,
          // также данные загруженных файлов
          // будет ли на бэке проверка данных на валидность, например валидность года даты?
          // в каком виде отправлять номер телефона? (раздельно от кода страны/ код любой страны начинать с + / сырые данные)
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
        '/index.php?module=HRPAC_CANDIDATES&action=index&parentTab=Основная'
      );
    }
  },
  components: { TheMask, Upload }
};
</script>
