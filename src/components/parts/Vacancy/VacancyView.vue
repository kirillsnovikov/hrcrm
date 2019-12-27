<template>
  <section class="vacancy-view">
    <div class="inline-buttons vacancy-view__inline-buttons">
      <a
        :href="vacancyModule | route('edit', data.id.value)"
        class="inline-buttons__btn"
      >
        <el-button type="primary">Править</el-button>
      </a>
      <el-button class="inline-buttons__btn" type="primary" disabled
        >Дублировать</el-button
      >
      <el-button class="inline-buttons__btn" type="primary" disabled
        >Отправить на согласование</el-button
      >
      <el-button class="inline-buttons__btn" type="primary" disabled
        >Подобрать кандидата</el-button
      >
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
    <s-table-item
      :type="'card'"
      :data="data"
      :wide="true"
      :id="data.id.value"
    ></s-table-item>
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
          <el-tab-pane label="Комментарии" name="comments">
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
import STableItem from 'Parts/Vacancy/VacancyTableItem';
import SComment from 'Elements/Comment/SComment';

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
  components: {
    STableItem,
    SComment
  },
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
      panelWidth: 0,
      stages: [],
      candidateModule: 'HRPAC_CANDIDATES',
      vacancyModule: 'HRPAC_VACANCY'
    };
  },
  mounted() {
    console.log(this.data);
    this.panelWidth = this.$el.offsetWidth;
    this.stages = Object.values(this.candidates[0].stage_data);
    this.stages.forEach(stage => {
      if (!stage.candidates) {
        stage['candidates'] = [];
      }
      let style = {
        background: stage.color,
        color: '#ffffff',
        width:
          this.$el.offsetWidth /
            Object.keys(this.candidates[0].stage_data).length +
          'px'
      };
      this.candidates.forEach(cand => {
        if (cand.this_stage === stage.id) {
          stage.candidates.push(cand.candidates_data);
        }
      });
      stage['style'] = style;
      stage['count'] = stage.candidates ? stage.candidates.length : 0;
    });
  }
};
</script>
