<template>
  <div class="candidate-view s-card">
    <el-dialog
      width="40%"
      title="Вы действительно хотите удалить связь с вакансией «Аналитик»?"
      :visible.sync="relationDialogVisible"
    >
      <div slot="footer" class="dialog-footer">
        <el-button @click="relationDialogVisible = false">Отмена</el-button>
        <el-button type="primary" @click="relationDialogVisible = false">
          Ок
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="40%"
      title="Вы действительно хотите сменить этап подбора на «Оффер»?"
      :visible.sync="stageDialogVisible"
    >
      <div slot="footer" class="dialog-footer">
        <el-button @click="stageDialogVisible = false">Отмена</el-button>
        <el-button type="primary" @click="stageDialogVisible = false">
          Ок
        </el-button>
      </div>
    </el-dialog>
    <div class="inline-buttons s-card__inline-buttons">
      <a
        :href="
          `/index.php?module=HRPAC_VACANCY&action=EditView&record=${data.id.value}`
        "
        class="inline-buttons__btn"
      >
        <button type="button" class="el-button el-button--primary">
          <span>Править</span>
        </button>
      </a>
      <el-dropdown
        placement="right"
        trigger="click"
        class="candidate-header__actions-item"
      >
        <button
          type="button"
          class="el-button inline-buttons__btn el-button--primary"
        >
          <span>Отобрать на</span>
        </button>
        <el-dropdown-menu
          slot="dropdown"
          class="select-vacancy-menu select-vacancy-menu_margin_left"
        >
          <el-dropdown-item>
            <el-link
              :underline="false"
              icon="el-icon-circle-close"
              type="danger"
            >
              Отказ
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-link :underline="false">
              Аналитик
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-link :underline="false">
              Разработчик
            </el-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <button
        disabled="disabled"
        type="button"
        class="el-button inline-buttons__btn el-button--primary is-disabled"
      >
        <span>Удалить</span>
      </button>
    </div>
    <div class="selected-vacancies">
      <div class="selected-vacancy-item">
        <div class="selected-vacancy-top">
          <div class="selected-vacancy-item__name">Аналитик</div>
          <div class="selected-vacancy-item__recruter">
            Рекрутер Денисова Ольга
          </div>
          <i class="el-icon-close" @click="relationDialogVisible = true"></i>
        </div>
        <div class="selected-vacancy-bottom">
          <div class="stages-panel candidate-sel__stages-panel">
            <label
              class="stages-panel__item"
              :style="{ background: stage.color }"
              v-for="(stage, i) in stages"
              :key="`${stage.id}_${i}`"
            >
              <el-tooltip :content="stage.name" placement="top-start">
                <span class="stages-panel__label">{{ stage.name }}</span>
              </el-tooltip>
              <input type="checkbox" class="stages-panel__input" />
            </label>
          </div>
        </div>
      </div>
      <div class="selected-vacancy-item">
        <div class="selected-vacancy-top">
          <div class="selected-vacancy-item__name">Разработчик</div>
          <div class="selected-vacancy-item__recruter">
            Рекрутер Денисова Ольга
          </div>
          <i class="el-icon-close" @click="relationDialogVisible = true"></i>
        </div>
        <div class="selected-vacancy-bottom">
          <div class="stages-panel candidate-sel__stages-panel">
            <label
              class="stages-panel__item"
              :style="{ background: stage.color }"
              v-for="(stage, i) in stages"
              :key="`${stage.id}_${i}`"
            >
              <el-tooltip :content="stage.name" placement="top-start">
                <span class="stages-panel__label">{{ stage.name }}</span>
              </el-tooltip>
              <input type="checkbox" class="stages-panel__input" />
            </label>
          </div>
        </div>
      </div>
    </div>
    <candidate-list-item
      :candidate="candidate"
      :mod="mod"
    ></candidate-list-item>
    <div class="s-card__main">
      <div class="s-card__info">
        <el-tabs v-model="activeInfo">
          <el-tab-pane
            label="Резюме (hh.ru)"
            name="resumeHH"
            class="candidate-fields"
          >
            <resume-tab-info :candidate="candidate"></resume-tab-info>
          </el-tab-pane>
          <el-tab-pane label="Резюме (Работа.ру)" name="resumeRabota">
            <resume-tab-info :candidate="candidate"></resume-tab-info>
          </el-tab-pane>
          <el-tab-pane label="История" name="history"
            >Тут будет какая-то история по данной вакансии</el-tab-pane
          >
        </el-tabs>
      </div>
      <div class="s-card__comments">
        <el-tabs v-model="activeComments">
          <div class="inline-buttons stage-form__inline-buttons">
            <el-button
              class="inline-buttons__btn"
              type="primary"
              @click="commentFormVisible = true"
              >Комментарий</el-button
            >
          </div>
          <el-tab-pane label="Комментарии" name="comments">
            <s-comment-form
              :form-visible="commentFormVisible"
              @set-form-visible="showCommentForm"
            ></s-comment-form>
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
  </div>
</template>

<script>
import CandidateListItem from 'Parts/Candidate/CandidateListItem';
import SComment from 'Elements/Comment/SComment';
import SCommentForm from 'Elements/Comment/SCommentForm';
import ResumeTabInfo from 'Parts/Candidate/ResumeTabInfo';
import { rand } from '@/utils/helpers';
import candidatesInfo from 'Parts/Candidate/candidatesMock';

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
    mod: {
      type: Object
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      candidate: {},
      activeInfo: 'resumeHH',
      activeComments: 'comments',
      comments: comments,
      stages: [],
      activeStage: 1,
      relationDialogVisible: false,
      stageDialogVisible: false,
      commentFormVisible: false
    };
  },
  created() {
    const candidates = candidatesInfo.vacancies[0].candidates;
    const vacancy = candidatesInfo.vacancies[0].name;
    this.candidate = candidates[rand(0, candidates.length - 1)];
    this.stages = candidatesInfo.vacancies[0].stages;
    // временно, для тестовых данных
    this.candidate = {
      ...this.candidate,
      vacancy,
      stage: {
        ...this.stages[0]
      }
    };
    // console.log(this.candidate);
  },
  methods: {
    showCommentForm({ flag, form }) {
      this.commentFormVisible = flag;
      if (form) {
        // console.log(form);
      }
    }
  },
  components: {
    CandidateListItem,
    SComment,
    SCommentForm,
    ResumeTabInfo
  }
};
</script>
