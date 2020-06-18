<template>
  <div class="filter-wrapper">
    <el-collapse v-model="activeFilter" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          Фильтры<i :class="filterClass"></i>
        </template>
        <!-- <template v-html="content">{{ content }}</template> -->
        <!-- <filterr
          v-for="id in [1, 2, 12]"
          :key="id"
          :id="id"
          url="http://test.ru"
          image="photo.jpg"
          title="Товар 1"
          :cart-items="[{ id: 1 }, { id: 12 }, { id: 123 }]"
          class="snippet"
        >
        </filterr> -->
        <el-form
          status-icon
          class="vacancy-form demo-ruleForm"
          label-width="250px"
          size="medium"
          style="max-width: 700px; margin: 0 auto;"
        >
          <el-form-item
            label="Желательные навыки"
            prop="desirable_skills_ids"
            class="row"
          >
            <el-select
              v-model="form.desirable_skills_ids"
              class="el-form-item form-item"
              @visible-change="handleBlur($event, 'desirable_skills_ids')"
              placeholder=""
              filterable
              multiple
            >
              <el-option
                v-for="option in [{id:'1', name: 'qwerr'}, {id:'2', name: '44dfsfr'}]"
                :key="option.id"
                :label="option.name"
                :value="option.id"
              ></el-option>
              <div slot="empty">
                <p class="el-select-dropdown__empty">
                  No data
                </p>
                <div class="add-skill-btn">
                  <span>
                    Добавить
                  </span>
                </div>
              </div>
            </el-select>
        </el-form-item>
          <!-- <text-editor
            name="resume_text"
            label="Резюме"
            :text="form.resume_text"
            :max-length="3000"
            @set-text-value="setTextValue"
          ></text-editor> -->
          <!-- <el-form-item label="Ссылка на тест" class="row test">
            <el-input v-model.lazy="test_url" type="textarea" @input.native="input" @change="change"></el-input>
            <el-popover
              placement="top-start"
              width="auto"
              trigger="hover"
              :offset="4"
            >
              <span>
                Чтобы ссылка на тест была уникальной,<br />
                подставьте "?id=" в конец ссылки
              </span>
              <i slot="reference" class="el-icon-info"></i>
            </el-popover>
          </el-form-item> -->
          <!-- <el-form-item
            label="Ключевые навыки"
            prop="stack"
            class="row"
          >
            <el-select
              v-model="stack"
              name="stack"
              class="el-form-item form-item"
              @input.native="handleChange($event, 'stack')"
              placeholder=""
              filterable
              multiple
              :multiple-limit="3"
            >
              <el-option
                v-for="(option, key) in fields.stack.options"
                :key="key"
                :label="option"
                :value="key"
              ></el-option>
              <div v-if="hasSkillOptions('stack')" slot="empty">
                <p class="el-select-dropdown__empty">Не найдено...</p>
                <div class="add-skill-btn">
                  <span @click="addNewSkill('stack')">Добавить</span>
                </div>
              </div>
              <p v-else slot="empty" class="el-select-dropdown__empty">
                Справочник пуст
              </p>
            </el-select>
          </el-form-item>
          <el-form-item
            label="Желательные навыки"
            prop="desirable_skills"
            class="row"
          >
            <el-select
              v-model="desirable_skills"
              name="desirable_skills"
              class="el-form-item form-item"
              @input.native="handleChange($event, 'desirable_skills')"
              @change="handleChange($event, 'desirable_skills')"
              placeholder=""
              filterable
              multiple
            >
              <el-option
                v-for="(option, key) in fields.desirable_skills.options"
                :key="key"
                :label="option"
                :value="key"
              ></el-option>
              <div v-if="hasSkillOptions('desirable_skills')" slot="empty">
                <p class="el-select-dropdown__empty">Не найдено...</p>
                <div class="add-skill-btn">
                  <span @click="addNewSkill('desirable_skills')">Добавить</span>
                </div>
              </div>
              <p v-else slot="empty" class="el-select-dropdown__empty">
                Справочник пуст
              </p>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="Ссылка на тест (вариант 2)" class="row">
            <el-tooltip
              content="Подставьте '?id=' в конец ссылки"
              placement="top-start"
              effect="light"
            >
              <el-input v-model.lazy="test_url"></el-input>
            </el-tooltip>
          </el-form-item> -->
          <!-- <el-form-item label="Ссылка на тест (вариант 3)" class="row test-2">
            <el-input v-model="test_url">
              <i slot="prefix" class="el-input__icon el-icon-info"></i>
            </el-input>
            <div class="el-form-item__error">
              Подставьте '?id=' в конец ссылки
            </div>
          </el-form-item> -->
        </el-form>

        <div class="saved-filters">
          <span><b>Мои фильтры</b></span>
          <div class="saved-filters__header">
            <div v-if="inputVisible" class="saved-filters__new">
              <el-input
                v-model="inputValue"
                ref="saveNewFilter"
                size="mini"
                @keyup.enter.native="saveNewFilter"
                @blur="saveNewFilter"
              >
              </el-input>
              <el-button @click="saveNewFilter" size="mini" type="primary">
                ОК
              </el-button>
              <el-button @click="inputVisible = false" size="mini">
                Отмена
              </el-button>
            </div>
            <el-button
              v-else
              plain
              class="button-new-tag"
              size="mini"
              @click="showInput"
            >
              + Новый фильтр
            </el-button>
            <!-- effect="dark" for active -->
            <el-tag
              effect="dark"
              closable
              type="primary"
              size="mini"
            >
              Выбранный фильтр
            </el-tag>
            <el-tag
              v-for="tag in savedFilters"
              :key="tag"
              closable
              type="primary"
              size="mini"
              @click="findBySavedFilter"
              @close="testClose(tag)"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>

        <el-form
          ref="filterForm"
          :model="form"
          size="mini"
          hide-required-asterisk
          class="filter-form"
        >
          <el-form-item
            v-for="({ filter, menuOpts }, i) in filters"
            :key="`${filter.name}_${i}`"
            :prop="filter.name"
            class="row"
          >
            <el-select
              v-model="filters[i].opt"
              :name="filter.name"
              placeholder=""
              filterable
              default-first-option
              @change="selectFilter(filters[i].opt, filter.name, i)"
              no-match-text="Нет результатов поиска"
              class="filter-form__filter-label"
            >
              <el-option
                v-for="(label, name) in menuOpts"
                :key="`${name}_${i}`"
                :label="label"
                :value="name"
              ></el-option>
            </el-select>
            <!-- <the-mask
              type="text"
              :name="filter.name"
              placeholder="От"
              :masked="false"
              disabled
              class="filter-form__filter"
              :mask="[
                '### ',
                '# ###',
                '## ###',
                '### ### ',
                '# ### ###',
                '## ### ###'
              ]"
              v-model.lazy.trim="form[filter.name]"
            ></the-mask> -->
            <el-input
              v-if="filter.field_type === 'text'"
              v-model="form[filter.name]"
              clearable
              :name="filter.name"
              class="filter-form__filter"
            ></el-input>
            <el-select
              v-if="filter.field_type === 'select'"
              v-model="form[filter.name]"
              :name="filter.name"
              :multiple="filter.multiselect"
              clearable
              placeholder=""
              class="filter-form__filter"
            >
              <el-option
                v-for="(name, val) in getOpts"
                :key="`${name}_${i}`"
                :label="name"
                :value="val"
              ></el-option>
            </el-select>
            <el-date-picker
              v-if="filter.field_type === 'datetime'"
              v-model="form[filter.name]"
              type="date"
              :name="filter.name"
              :format="`${datepicker.dateFormat}`"
              :value-format="`${datepicker.dateFormat}`"
              :picker-options="pickerOptions"
              class="filter-form__filter"
            ></el-date-picker>
            <el-button
              size="mini"
              icon="el-icon-close"
              @click="deleteFilter(i, filter.name)"
            ></el-button>
            <el-button
              size="mini"
              icon="el-icon-plus"
              circle
              @click="addFilter(i)"
            ></el-button>
          </el-form-item>
          <el-form-item
            prop="sortByColumn"
            label="Сортировать по колонке:"
            label-width="305px"
            label-position="right"
            class="saved-filters__setting-item"
          >
            <el-select
              v-model="form['sortByColumn']"
              name="sortByColumn"
              placeholder=""
              size="mini"
            >
              <el-option
                v-for="(col, i) in cols"
                :key="`${col}_${i}`"
                :label="col"
                :value="col"
              ></el-option>
            </el-select>
            <el-form-item prop="sortBy">
              <el-tooltip content="Тип сортировки" effect="light">
                <el-button size="mini" @click="sortBy">
                  <font-awesome-icon size="2x" :icon="sortIcon">
                  </font-awesome-icon>
                </el-button>
              </el-tooltip>
            </el-form-item>
          </el-form-item>
        </el-form>
        <div class="inline-buttons">
          <el-button
            class="inline-buttons__btn"
            type="primary"
            @click="findByFilter"
          >
            Найти
          </el-button>
          <el-button class="inline-buttons__btn" @click="resetForm">
            Очистить
          </el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import './filters.scss';
// import TextEditor from 'Elements/TextEditor/TextEditor';
// import Filterr from 'Elements/Filters/Filter';
// import { mask, TheMask } from 'vue-the-mask';

// const MyAwesomeList = items => `<ul>
//       <li
//       v-for="item in ${items}"
//       :text="item.text"
//       class="my-fancy-item"
//     >{{ item.text }}</li>
//   </ul>`;

export default {
  // directives: { mask },
  props: {
    opts: {
      type: Object
    }
  },
  template: `<ul>
      <li
      v-for="item in items"
      :text="item.text"
      class="my-fancy-item"
    >{{ item.text }}</li>
  </ul>`,
  data() {
    return {
      items: [
        {
          text: 'zs',
          id: 1
        },
        {
          text: 'zs0',
          id: 12
        },
        {
          text: 'zs1',
          id: 13
        }
      ],
      datepicker: {
        dateFormat: 'dd.MM.yyyy',
        timeFormat: 'dd.MM.yyyy',
        mask: '##.##.####'
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      activeFilter: '1',
      // props:
      filterList: [
        {
          type: 'varchar', // text
          name: 'first_name',
          label: 'Имя',
          value: ''
        },
        {
          type: 'multienum', // multiselect
          name: 'grade',
          label: 'Грейд',
          value: ''
        },
        {
          type: 'datetime', // datetime
          name: 'date_entered',
          label: 'Дата создания',
          value: ''
        },
        {
          type: 'relate', // select
          name: 'location_id',
          label: 'Локация',
          value: ''
        },
        {
          type: 'relate', // multiselect
          table: 'users',
          name: 'created_by_name',
          label: 'Добавил',
          value: ''
        }
      ],
      title: 'Товар 1',
      menuOpts: {},
      form: {},
      filters: [],
      savedFilters: [
        'мой фильтр 1',
        'мой фильтр 2',
        'мой фильтр 3',
        'мой фильтр 4',
        'мой фильтр 5',
        'мой фильтр 6',
        'мой фильтр 7',
        'мой фильтр 8',
        'мой фильтр 9',
        'мой фильтр 10',
        'мой фильтр 11',
        'мой фильтр 12'
      ],
      myActiveFilter: '',
      saved_search_name: '',
      // sortByColumn: '',
      cols: [1, 2, 3, 4, 5, 6],
      // sortBy: '',
      inputVisible: false,
      inputValue: '',
      test_url: '/test',
      fields: {},
      stack: '',
      desirable_skills: ''
    };
  },
  beforeMount() {
    // мультивыбор?
    // первое дефолтное поле - полное имя (кандидаты) и наименование (вакансии)
    this.form.resume_text = `<br>- разработка и согласование методики </span><span class="highlighted">тестирования</span><span>: создание тестовых сценариев и тест-кейсов на основании технического задания;`;
    this.fields.stack = {
      ...this.fields.stack,
      options: {
        java: 'Java',
        js: 'JavaScript',
        php: 'PHP',
        python: 'Python'
      },
      value: ['java']
    };
    this.fields.desirable_skills = {
      value: ['java-ee'],
      options: {
        nginx: 'Nginx',
        'java-ee': 'Java EE',
        gulp: 'Gulp',
        nodejs: 'Node.js'
      }
    };
    this.sortIcon;
    this.filterList.map(filter => {
      // настройки для двойных полей, типа возраст, оклад+валюта
      switch (filter.type) {
        case 'varchar':
        case 'text':
        case 'decimal':
        case 'int':
        case 'name':
          // проверить наличие value в пропсах фильтра
          filter.field_type = 'text';
          // number field opts
          break;

        case 'enum':
        case 'multienum':
        case 'relate':
        case 'currency_id':
          // multiple select with enum?
          filter.field_type = 'select';
          filter.multiselect =
            filter.type === 'multienum' ||
            (filter.table && filter.table === 'users') ||
            false;
          break;

        case 'datetime':
          filter.field_type = 'datetime';
          break;

        default:
          break;
      }
      this.menuOpts[filter.name] = filter.label;
    });

    // если нет моих фильтров:
    // для каждого поля вычисляем свои опции, если есть мои фильтры:
    // if (!this.savedFilters.length) {
    this.filters.push({
      opt: this.filterList[0].name,
      filter: this.filterList[0],
      menuOpts: { ...this.menuOpts }
    });
    this.$set(this.form, this.filterList[0].name, '');
    // } else {
    //   console.log('обработать сохраненные фильтры');
    // для своих фильтров отображаем свои списки опций:
    // this.updateFilterList()
    // }
  },
  computed: {
    getOpts() {
      return this.opts.hr_gender_list || this.opts.hr_grade_list;
    },
    filterClass() {
      return [
        'filter-icon el-icon-arrow-right',
        this.activeFilter ? 'is-active' : ''
      ];
    },
    sortIcon() {
      const isDesc = this.form['sortBy'] === 'DESC';
      const isAsc = this.form['sortBy'] === 'ASC';
      return isDesc
        ? ['fas', 'sort-alpha-up']
        : isAsc
        ? ['fas', 'sort-alpha-down']
        : ['fas', 'random'];
    }
  },
  methods: {
    setTextValue(text) {
      this.$set(this.form, 'resume_text', text);
    },
    handleBlur(visible, name) {
      console.log(visible, name);
    },
    handleChange(e, name) {
      console.log(this[name], e.target.value);
      // if (this.form[name].length === 3) {

      // }
    },
    resetForm() {
      this.$refs.filterForm.resetFields();
      this.sortIcon;
    },
    updateFilterList() {
      const selectedOpts = Array.from(this.filters, ({ opt }) => opt);
      this.filters.map(({ opt }, i) => {
        let filterList = { ...this.menuOpts };
        selectedOpts.map(s_opt => {
          if (s_opt !== opt) {
            this.$delete(filterList, s_opt);
          }
        });
        this.$set(this.filters[i], 'menuOpts', filterList);
      });
    },
    deleteFilter(idx, filter) {
      // проверка на удаление единственного фильтра
      // установить дисейбл для кнопок удаления, добавления
      if (this.filters.length > 1) {
        this.filters.splice(idx, 1);
        this.$delete(this.form, filter);
        this.updateFilterList();
        // console.log('delete', idx, this.filters);
      }
    },
    editFilter(idx, filter) {
      // проверка на удаление единственного фильтра
      // установить дисейбл для кнопок удаления, добавления
      console.log(idx, filter);
      // if (this.filters.length > 1) {
      //   this.filters.splice(idx, 1);
      //   this.$delete(this.form, filter);
      //   this.updateFilterList();
      //   // console.log('delete', idx, this.filters);
      // }
    },
    addFilter(idx) {
      let list = [...this.filterList];

      this.filters.filter(({ filter }) => {
        let idx;
        list.filter(({ name }, i) => (name === filter.name ? (idx = i) : name));
        list.splice(idx, 1);
      });

      if (list.length) {
        this.$set(this.form, list[0].name, '');
        this.filters.splice(++idx, 0, {
          filter: list[0],
          menuOpts: { ...this.menuOpts },
          opt: list[0].name
        });
        this.updateFilterList();
      }
      // console.log('add', list, this.filters);
    },
    selectFilter(filter, oldFilter, idx) {
      this.$delete(this.form, oldFilter);
      this.$set(this.form, filter, '');
      const newIdx = this.filterList.findIndex(({ name }) => name === filter);
      this.$set(this.filters[idx], 'filter', this.filterList[newIdx]);
      this.updateFilterList();
      // console.log('select', filter, oldFilter, idx, this.filters);
    },
    selectSavedFilter(filter) {
      console.log(filter);
      // обновлять отображение активного фильтра
    },
    findByFilter() {},
    findBySavedFilter() {},
    testClose(tag) {
      console.log('close');
      this.savedFilters.splice(this.savedFilters.indexOf(tag), 1);
    },
    sortBy() {
      const isDesc = this.form['sortBy'] === 'DESC';
      const sortValue = isDesc ? 'ASC' : 'DESC';
      this.$set(this.form, 'sortBy', sortValue);
      this.sortIcon;
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveNewFilter.$refs.input.focus();
      });
    },
    saveNewFilter() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.savedFilters.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    input() {
      if (this.test_url.length > 20) {
        this.test_url = this.test_url.slice(0, 20);
      }
      console.log(123, 'input', this.test_url, this.test_url.length);
    },
    change() {
      console.log('change', this.test_url);
    },
    hasSkillOptions() {},
    addNewSkill() {}
  },
  components: {
    /*TextEditor , Filterr, TheMask*/
  }
};
</script>

<style>
/* .el-carousel__item span {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 50px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
} */
.el-icon-info {
  z-index: 1;
  color: #ffbe5a;
  font-size: 18px;
  background: #ffffff;
}
.test .el-icon-info {
  position: absolute;
  top: -7px;
  left: -5px;
}
.filter-wrapper .el-form .test-2 .el-icon-info {
  /* top: -9px;
  position: relative; */
  top: 2px;
  position: absolute;
  left: 0;
  width: 14px;
  height: 14px;
  font-size: 14px;
  line-height: 14px !important;
}
/*.el-input__prefix {
   height: auto !important;
} */
.el-form .el-form-item__error {
  padding: 0;
  color: #e6a23c;
  margin-left: 15px;
}

.test-2 .el-input input {
  padding-left: 20px;
}

.el-popover {
  padding: 7px !important;
  font-size: 13px !important;
  transform: translateY(10px);
  /* color: #e6a23c !important; */
}
</style>
