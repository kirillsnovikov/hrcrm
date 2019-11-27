<template>
  <section class="s-card">
    <div class="s-card__buttons">
      <el-button type="primary" disabled>Править</el-button>
      <el-button type="primary" disabled>Дублировать</el-button>
      <el-button type="primary" disabled>Отправить на согласование</el-button>
      <el-button type="primary" disabled>Подобрать кандидата</el-button>
    </div>
    <div class="s-card__candidates">
      <div
        :key="`${i}_${candidate}`"
        v-for="(candidate, i) in candidates"
        class="candidate"
      >
        <div class="candidate__main">
          <el-link :type="'primary'" class="candidate__name">
            {{ candidate }}
          </el-link>
          <span class="candidate__stage">Этап подбора</span>
        </div>
        <div class="candidate__close" @click="closeCandidate(candidate)">
          <i class="candidate__close-icon el-icon-close"></i>
        </div>
      </div>
    </div>
    <s-table-item
      :type="'card'"
      :data="data"
      :wide="true"
      :id="data.id.value"
    ></s-table-item>
    <div class="s-card__main">
      <div class="s-card__info">
        <el-tabs v-model="activeInfo">
          <el-tab-pane label="Требования" name="description">{{
            data.description.value
          }}</el-tab-pane>
          <el-tab-pane label="История" name="history"
            >Тут будет какая-то история по данной вакансии</el-tab-pane
          >
        </el-tabs>
      </div>
      <div class="s-card__comments">
        <el-tabs v-model="activeComments">
          <el-tab-pane label="Комментарии" name="comments">
            <s-comment
              class="s-card__comments__s-comment"
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
import STableItem from 'Parts/Table/STableItem';
import SComment from 'Elements/Comment/SComment';
import peoplesData from 'Parts/Table/mockPeoples.json';
import { rand } from '@/utils/helpers';

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
    }
  },
  data() {
    return {
      activeInfo: 'description',
      activeComments: 'comments',
      comments: comments,
      peoplesData: peoplesData,
      candidates: []
    };
  },
  mounted() {
    // console.log(this.data);
    for (let i = 0; i < rand(15, 20); i++) {
      this.candidates.push(
        peoplesData.peoples[rand(0, this.peoplesData.peoples.length - 1)]
      );
    }
  },
  computed: {
    // candidates() {
    //   let res = [];
    //   for (let i = 0; i < rand(15, 10); i++) {
    //     res.push(
    //       peoplesData.peoples[rand(0, this.peoplesData.peoples.length - 1)]
    //     );
    //   }
    //   return res;
    // }
  },
  methods: {
    closeCandidate(candidate) {
      // console.log(candidate);
      this.candidates.splice(this.candidates.indexOf(candidate), 1);
    }
  }
};
</script>
