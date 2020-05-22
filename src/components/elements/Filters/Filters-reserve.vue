<template>
  <div class="filter-wrapper">
    <!-- мои фильтры -->
    <!-- сортировка отдельно -->
    <!-- форма фильтров: с/ без настроек -->
    <!-- можно создать второй коллапс для моих фильтров -->
    <template>
      <!-- <el-carousel :autoplay="false" arrow="hover" indicator-position="none" height="50px">
        <el-carousel-item v-for="item in 4" :key="item">
          <span>{{ item }}</span>
          <span>{{ item }}</span>
          <span>{{ item }}</span>
          <span>{{ item }}</span>
          <span>{{ item }}</span>
        </el-carousel-item>
      </el-carousel> -->
    </template>
    <el-collapse v-model="activeFilter" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          Фильтры<i :class="filterClass"></i>
        </template>
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
            >
              <el-option
                v-for="(label, name) in menuOpts"
                :key="`${name}_${i}`"
                :label="label"
                :value="name"
              ></el-option>
            </el-select>
            <el-input
              v-if="filter.field_type === 'text'"
              v-model="form[filter.name]"
              clearable
              :name="filter.name"
            ></el-input>
            <el-select
              v-if="filter.field_type === 'select'"
              v-model="form[filter.name]"
              :name="filter.name"
              :multiple="filter.multiselect"
              clearable
              placeholder=""
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
              type="date"
              :name="filter.name"
              :format="`${datepicker.dateFormat}`"
              :value-format="`${datepicker.dateFormat}`"
              v-model="form[filter.name]"
              :picker-options="pickerOptions"
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
        </el-form>
        <div class="saved-filters__sort">
          <!-- <el-select
            v-model="myActiveFilter"
            name="abc"
            placeholder=""
            size="mini"
            @change="selectSavedFilter"
          >
            <el-option label="--не выбрано--" value=""></el-option>
            <el-option
              v-for="(filter, i) in savedFilters"
              :key="`${filter}_${i}`"
              :label="filter"
              :value="filter"
            ></el-option>
          </el-select> -->
          <div
            prop="saved_search_name"
            label="Сохранить фильтр как"
            class="saved-filters__settings"
          >
            <!-- <div
              prop="saved_search_name"
              label="Сохранить фильтр как"
              class="saved-filters__setting-item"
            >
              <label for="saved_search_name">Сохранить фильтр как:</label>
              <el-input
                v-model="saved_search_name"
                name="saved_search_name"
                size="mini"
              ></el-input>
              <el-button @click="saveFilter" type="primary" size="mini">
                Сохранить
              </el-button>
            </div> -->
            <div prop="" class="saved-filters__setting-item">
              <label for="">Сортировать по колонке:</label>
              <el-select
                v-model="sortByColumn"
                name=""
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
            </div>
            <div prop="" class="saved-filters__setting-item">
              <label for="">Сортировка:</label>
              <el-radio v-model="sortBy" label="DESC" size="mini">
                Восходящая
              </el-radio>
              <el-radio v-model="sortBy" label="ASC" size="mini">
                Нисходящая
              </el-radio>
            </div>
          </div>
        </div>
        <div class="inline-buttons">
          <el-button
            class="inline-buttons__btn"
            type="primary"
            @click="findByFilter"
          >
            Найти
          </el-button>
          <el-button
            class="inline-buttons__btn"
            @click="$refs.filterForm.resetFields()"
          >
            Очистить
          </el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import './filters.scss';

export default {
  props: {
    opts: {
      type: Object
    }
  },
  data() {
    return {
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
      menuOpts: {},
      form: {},
      filters: [],
      savedFilters: ['мой фильтр 1', 'мой фильтр 2', 'мой фильтр 3', 'мой фильтр 4', 'мой фильтр 5', 'мой фильтр 6', 'мой фильтр 7', 'мой фильтр 8', 'мой фильтр 9', 'мой фильтр 10', 'мой фильтр 11', 'мой фильтр 12'],
      myActiveFilter: '',
      saved_search_name: '',
      sortByColumn: '',
      cols: [1, 2, 3, 4, 5, 6],
      sortBy: '',
      inputVisible: false,
      inputValue: ''
    };
  },
  beforeMount() {
    // сортировка
    // мультивыбор?
    // первое дефолтное поле - полное имя (кандидаты) и наименование (вакансии)
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
    }
  },
  methods: {
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
      console.log('close')
      this.savedFilters.splice(this.savedFilters.indexOf(tag), 1);
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
    }
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
</style>
