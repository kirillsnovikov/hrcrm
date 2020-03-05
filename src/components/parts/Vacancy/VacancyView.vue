<template>
  <section class="vacancy-view">
    <Dialog
      v-if="is_visible.remove_dialog"
      title="Вы действительно хотите удалить эту вакансию?"
      :is_visible="is_visible.remove_dialog"
      @ok-callback="removeVacancy"
      @cancel-callback="$set(is_visible, 'remove_dialog', false)"
    >
    </Dialog>
    <div class="inline-buttons vacancy-view__inline-buttons">
      <a
        :href="vacancyModule | route('edit', data.id.value)"
        class="inline-buttons__btn"
      >
        <el-button type="primary">Править</el-button>
      </a>
      <el-button class="inline-buttons__btn" type="primary" disabled
        >Дублировать
      </el-button>
      <el-button class="inline-buttons__btn" type="primary" disabled
        >Отправить на согласование
      </el-button>
      <el-button class="inline-buttons__btn" type="primary" disabled
        >Подобрать кандидата
      </el-button>
      <button
        type="button"
        :disabled="isDisabled ? true : false"
        :class="[
          'el-button inline-buttons__btn el-button--primary',
          isDisabled ? 'is-disabled' : ''
        ]"
        @click="$set(is_visible, 'remove_dialog', true)"
      >
        <span>Удалить</span>
      </button>
    </div>
    <div class="stages-vacancy">
      <el-dropdown
        class="stages-vacancy__dropdown"
        v-for="(stage, i) in stages"
        :key="`${stage.name}_${i}`"
      >
        <div class="stages-vacancy__item" :style="stage.style">
          <el-tooltip :content="stage.name" placement="top-start">
            <span class="stages-vacancy__label">{{ stage.name }}</span>
          </el-tooltip>
          <el-tag size="mini">{{ stage.count }}</el-tag>
        </div>
        <el-dropdown-menu slot="dropdown">
          <a
            class="stages-vacancy__candidate-link"
            :href="candidateModule | route('view', candidate.id)"
            v-for="(candidate, j) in stage.candidates"
            :key="`${candidate.name}_${j}`"
          >
            <el-dropdown-item>
              {{ candidate.name }}
            </el-dropdown-item>
          </a>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <form id="vacancy-view" ref="form" enctype="multipart/form-data">
      <div class="hidden-elems">
        <input type="hidden" name="module" value="HRPAC_VACANCY" />
        <input type="hidden" name="record" :value="data.id.value" />
      </div>
      <vacancy-table-item
        type="card"
        :data="data"
        :wide="true"
        :id="data.id.value"
        :percentage="percentage"
      ></vacancy-table-item>
    </form>
    <div class="vacancy-view__main">
      <div class="vacancy-view__info">
        <el-tabs v-model="activeInfo">
          <el-tab-pane label="Требования" name="description">
            {{ data.description.value }}
          </el-tab-pane>
          <el-tab-pane label="История" name="history"
            >Тут будет какая-то история по данной вакансии</el-tab-pane
          >
        </el-tabs>
      </div>
      <div class="vacancy-view__comments">
        <el-tabs v-model="activeComments">
          <el-tab-pane
            label="Комментарии"
            name="comments"
            v-if="comments.length"
          >
            <s-comment
              class="vacancy-view__comments__s-comment"
              v-for="(comment, i) in comments"
              :data="comment"
              :key="`${i}_${comment.date}`"
            ></s-comment>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </section>
</template>

<script>
const FormData = require('form-data');
import VacancyTableItem from 'Parts/Vacancy/VacancyTableItem';
import SComment from 'Elements/Comment/SComment';
import Dialog from 'Elements/Dialog/Dialog';

const comments = [
  {
    name: 'Иванов Иван',
    value:
      'Разнообразный и богатый опыт консультация с широким активом позволяет выполнять важные задания по разработке существенных финансовых и административных условий. Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей деятельности способствует подготовки и реализации форм развития. ',
    avatar: 'https://cs6.pikabu.ru/avatars/930/v930290-1745288993.jpg',
    date: '21.01.2019'
  },
  {
    name: 'Иванов Иван', 
    value:
      'Таким образом укрепление и развитие структуры способствует подготовки и реализации позиций, занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт реализация намеченных плановых заданий в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. Товарищи! дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации позиций, занимаемых участниками в отношении поставленных задач. Идейные соображения высшего порядка, а также сложившаяся структура организации способствует подготовки и реализации системы обучения кадров, соответствует насущным потребностям.',
    avatar: '',
    date: '21.01.2019'
  },
  {
    name: 'Иванов Иван',
    value:
      'Равным образом постоянный количественный рост и сфера нашей активности требуют определения и уточнения новых предложений.',
    avatar: 'https://cs6.pikabu.ru/avatars/930/v930290-1745288993.jpg',
    date: '21.01.2019'
  }
];
export default {
  props: {
    data: {
      type: Object
    },
    candidates: {
      type: Array
    }
  },
  data() {
    return {
      activeInfo: 'description',
      activeComments: 'comments',
      comments: comments,
      stages: [],
      candidateModule: 'HRPAC_CANDIDATES',
      vacancyModule: 'HRPAC_VACANCY',
      is_visible: {
        remove_dialog: false
      }
    };
  },
  mounted() {
    this.stages = this.candidates.length
      ? Object.values(this.candidates[0].stage_data)
      : [];
    this.stages.forEach(stage => {
      if (!stage.candidates) {
        stage['candidates'] = [];
      }
      let style = {
        background: stage.color
      };
      this.candidates.forEach(cand => {
        if (cand.this_stage === stage.id) {
          stage.candidates.push(cand.candidates_data);
        }
      });
      stage['style'] = style;
      stage['count'] = stage.candidates ? stage.candidates.length : 0;
    });
  },
  computed: {
    percentage() {
      let stages = this.stages.filter(stage => stage.name !== 'Отказ');
      let lastActiveStage = 0;
      stages.forEach((stage, i) => {
        if (stage.count > 0) {
          lastActiveStage = i + 1;
        }
      });
      return stages.length
        ? Math.round((lastActiveStage / stages.length) * 100)
        : 0;
    },
    isDisabled() {
      // добавить проверку на право удаления
      // только нанимающий менеджер и рекрутер
      return !!this.candidates.length || this.data.status_id.value !== 'Новая';
    }
  },
  methods: {
    removeVacancy() {
      if (!this.isDisabled) {
        const form = document.getElementById('vacancy-view');
        const formData = new FormData(form);
        formData.set('action', 'Delete');
        this.is_visible.remove_dialog = false;

        this.$axios
          .post('index.php', formData)
          .then(() => {
            window.location.replace(
              '/index.php?module=HRPAC_VACANCY&action=index&parentTab=Основная'
            );
          })
          .catch(err => console.log('vacancy remove error', err));
      }
    }
  },
  components: {
    VacancyTableItem,
    SComment,
    Dialog
  }
};
</script>
