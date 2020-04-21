<template>
  <div>
    <!-- предусмотреть сворачиваемость фильтров -->
    <!-- мои фильтры -->
    <!-- сортировка отдельно -->
    <!-- форма фильтров: с/ без настроек -->
    <el-form
      ref="filterForm"
      :model="filterForm"
      size="mini"
      hide-required-asterisk
      class="filter-form"
    >
      <h4>Фильтры</h4>
      <el-form-item
        v-for="(filter, i) in filterForm"
        :key="`${filter.name}_${i}`"
        class="row"
      >
        <el-select
          v-model="filter.label"
          :name="filter.name"
          placeholder=""
          filterable
          @change="test"
          no-match-text="Нет результатов поиска"
        >
          <el-option
            v-for="(item, idx) in filterForm"
            :key="`${item.name}_${item.label}_${i}_${idx}`"
            :label="item.label"
            :value="item.name"
          ></el-option>
        </el-select>
        <el-input
          v-if="filter.field_type === 'text'"
          v-model="filter.value"
          @change="test"
          :name="filter.name"
        ></el-input>
        <el-select
          v-if="filter.field_type === 'select'"
          v-model="filter.value"
          :name="filter.name"
          :multiple="filter.multiselect"
          @change="test"
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
          @change="test"
          v-model="filter.value"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-button
          size="mini"
          icon="el-icon-close"
          @click="deleteFilter(item, index)"
        ></el-button>
        <el-button
          size="mini"
          icon="el-icon-plus"
          circle
          @click="addFilter(item, index)"
        ></el-button>
      </el-form-item>
    </el-form>
    <!-- панель кнопок -->
    <div class="inline-buttons vacancy-view__inline-buttons">
      <el-button
        class="inline-buttons__btn"
        type="primary"
        @click="searchByFilter"
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
      filterForm: {}
    };
  },
  created() {
    // сортировка
    // не дублируем поля
    // мультивыбор?
    // обновлять все селекты фильтров во избежание дублирования
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
          this.filterForm[filter.name] = {
            ...filter,
            field_type: 'text'
          };
          // number field opts
          break;

        case 'enum':
        case 'multienum':
        case 'relate':
        case 'currency_id':
          // multiple select with enum?
          this.filterForm[filter.name] = {
            ...filter,
            field_type: 'select',
            multiselect:
              filter.type === 'multienum' ||
              (filter.table && filter.table === 'users')
          };
          break;

        case 'datetime':
          this.filterForm[filter.name] = {
            ...filter,
            field_type: 'datetime'
          };
          break;

        default:
          break;
      }
    });
  },
  computed: {
    getOpts() {
      console.log(this.filterForm)
      return this.opts.hr_gender_list || this.opts.hr_grade_list;
    }
  },
  methods: {
    deleteFilter(item, index) {
      console.log('delete', item, index);
    },
    addFilter(item, index) {
      console.log('add', item, index);
    },
    searchByFilter() {},
    test() {
      console.log('ch', this.filterForm, this.filterList)
    }
  }
};
</script>
