<template>
  <div class="candidate-view">
    <Dialog
      v-if="is_visible.candidate_dialog"
      title="Вы действительно хотите удалить эту запись?"
      :is_visible="is_visible.candidate_dialog"
      @ok-callback="deleteCandidate"
      @cancel-callback="$set(is_visible, 'candidate_dialog', false)"
    >
    </Dialog>
    <Dialog
      v-if="deletedVacancy"
      :is_visible="is_visible.relation_dialog"
      :title="
        `Вы действительно хотите удалить связь с вакансией «${deletedVacancy.name}»?`
      "
      @ok-callback="confirmVacancyRemove"
      @cancel-callback="cancelDialogSelect('relation_dialog', 'deletedVacancy')"
    >
    </Dialog>
    <Dialog
      v-if="selectedStage"
      :is_visible="is_visible.stage_dialog"
      :title="
        `Вы действительно хотите сменить этап подбора на «${selectedStage.stage_data.name}»?`
      "
      @ok-callback="confirmStageSelect(selectedStage, 'stage_dialog')"
      @cancel-callback="cancelDialogSelect('stage_dialog', 'selectedStage')"
    >
    </Dialog>
    <Dialog
      v-if="is_visible.document_dialog"
      :is_visible="is_visible.document_dialog"
      title="Вы действительно хотите удалить этот документ?"
      @ok-callback="removeDocument(deletedDoc)"
      @cancel-callback="cancelDialogSelect('document_dialog', 'deletedDoc')"
    >
    </Dialog>
    <Dialog
      v-if="is_visible.comment_dialog"
      title="Вы действительно хотите удалить этот комментарий?"
      :is_visible="is_visible.comment_dialog"
      @ok-callback="confirmCommentDeletion"
      @cancel-callback="cancelDialogSelect('comment_dialog', 'deletedComment')"
    >
    </Dialog>
    <el-dialog
      v-if="is_visible.rejection_dialog"
      title="Причина отказа"
      :visible.sync="is_visible.rejection_dialog"
      @close="cancelDialogSelect('rejection_dialog', null, 'rejectionForm')"
    >
      <el-form
        ref="rejectionForm"
        :model="rejectionForm"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="Категория отказа" prop="rejection_categories">
          <el-select
            v-model="rejectionForm.rejection_categories"
            filterable
            no-match-text="Нет результатов поиска"
            placeholder=""
          >
            <el-option
              v-for="item in rejection_categories"
              :key="item.ID"
              :label="item.NAME"
              :value="item.ID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Причина отказа" prop="rejection_reasons">
          <el-select
            v-model="rejectionForm.rejection_reasons"
            filterable
            no-match-text="Нет результатов поиска"
            placeholder=""
            :disabled="!rejectionForm.rejection_categories"
          >
            <el-option
              v-for="item in filteredReasons"
              :key="item.ID"
              :label="item.NAME"
              :value="item.ID"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.prevent="confirmRejection()">
          Сохранить
        </el-button>
        <el-button
          @click="cancelDialogSelect('rejection_dialog', null, 'rejectionForm')"
        >
          Отмена
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      v-if="is_visible.no_rejection_dialog"
      title="Причина возврата"
      :visible.sync="is_visible.no_rejection_dialog"
      @close="
        cancelDialogSelect('no_rejection_dialog', null, 'cancelRejectionForm')
      "
    >
      <el-form
        ref="cancelRejectionForm"
        :model="cancelRejectionForm"
        :rules="rules"
        label-position="top"
      >
        <el-form-item
          label="Причина возврата"
          prop="return_reason"
          :rules="rules.return_reason"
        >
          <el-input
            type="textarea"
            name="return_reason"
            v-model="cancelRejectionForm.return_reason"
            show-word-limit
            maxlength="500"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.prevent="confirmCancelRejection">
          Сохранить
        </el-button>
        <el-button
          @click="
            cancelDialogSelect(
              'no_rejection_dialog',
              null,
              'cancelRejectionForm'
            )
          "
        >
          Отмена
        </el-button>
      </span>
    </el-dialog>
    <div class="inline-buttons candidate-view__inline-buttons">
      <a
        :href="
          `index.php?module=HRPAC_CANDIDATES&action=EditView&record=${candidate.id.value}`
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
          :disabled="selectionNotAllowed ? true : false"
          :class="[
            'el-button inline-buttons__btn el-button--primary',
            selectionNotAllowed ? 'is-disabled' : ''
          ]"
        >
          <span>Отобрать на</span>
        </button>
        <el-dropdown-menu
          v-if="all_vacancies_list"
          slot="dropdown"
          class="select-vacancy-menu select-vacancy-menu_margin_left"
        >
          <el-dropdown-item
            v-for="vacancy in all_vacancies_list"
            :key="vacancy.ID"
            :data-id="vacancy.ID"
          >
            <el-link
              :underline="false"
              v-html="vacancyInfo(vacancy)"
              @click="selectVacancy(vacancy)"
            ></el-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <button
        :disabled="data.length ? true : false"
        type="button"
        :class="[
          'el-button inline-buttons__btn el-button--primary',
          data.length ? 'is-disabled' : ''
        ]"
        @click="$set(is_visible, 'candidate_dialog', true)"
      >
        <span>Удалить</span>
      </button>
    </div>
    <div class="selected-vacancies" v-if="data.length">
      <div
        class="selected-vacancy-item"
        v-for="item in vacancies"
        :key="item.vacancy_id"
      >
        <div class="selected-vacancy-top">
          <a
            :href="
              `/index.php?module=HRPAC_VACANCY&action=DetailView&record=${item.vacancy_id}`
            "
            class="selected-vacancy-item__name"
          >
            {{ item.vacancy_data.name_id }}
          </a>
          <div
            class="selected-vacancy-item__response"
            v-if="Number(item.candidates_data.self_response)"
          >
            <input
              type="checkbox"
              name="selfResponse"
              id="selfResponse"
              disabled
              :checked="Number(item.candidates_data.self_response)"
            />
            <label for="selfResponse">Откликнулся</label>
          </div>
          <div
            v-if="!item.stage_data.hasOwnProperty('length')"
            class="selected-vacancy-item__rejection"
          >
            <el-link
              :underline="false"
              icon="el-icon-circle-close"
              type="danger"
              :disabled="isDisabledRejectBtn(item)"
              @click="selectStage(item.vacancy_id, lastStage(item), item)"
            >
              Отказ
            </el-link>
          </div>
          <div class="selected-vacancy-item__recruter">
            Рекрутер
            <b>{{ item.vacancy_data.assigned_user_name }}</b>
          </div>
          <i
            v-if="
              !item.stage_data.hasOwnProperty('length') &&
                item.this_stage === firstStage(item).id
            "
            class="el-icon-close"
            @click="showRelationDialog(item)"
            title="Удалить"
          ></i>
        </div>
        <div class="selected-vacancy-middle">
          <el-tooltip
            :content="item.vacancy_data.stack"
            placement="top"
            effect="light"
          >
            <span v-if="item.vacancy_data.stack">
              {{ item.vacancy_data.stack }}
            </span>
          </el-tooltip>
          <el-tooltip
            :content="item.vacancy_data.project_link_id"
            placement="top"
            effect="light"
          >
            <span v-if="item.vacancy_data.project_link_id">
              {{ item.vacancy_data.project_link_id }}
            </span>
          </el-tooltip>
        </div>
        <div class="selected-vacancy-bottom">
          <div class="stages-panel candidate-sel__stages-panel">
            <label
              :class="['stages-panel__item', setDisabledClass(stage, item)]"
              :style="stage.styles"
              v-for="(stage, i) in item.stage_data"
              :key="`${stage.id}_${i}`"
            >
              <el-tooltip :content="stage.name" placement="top-start">
                <span class="stages-panel__label">{{ stage.name }}</span>
              </el-tooltip>
              <span class="stages-panel__date" v-if="stage.date_start_stage">
                {{ formatDate(stage.date_start_stage || '') }}
              </span>
              <input
                type="checkbox"
                v-if="stage.name != 'Отказ'"
                @change="selectStage(item.vacancy_id, stage, item)"
                class="stages-panel__input"
                :value="`${item.vacancy_id}_${stage.id}_${stage.name}`"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
    <form id="candidate-view" ref="form" enctype="multipart/form-data">
      <div class="hidden-elems">
        <input type="hidden" name="module" value="HRPAC_CANDIDATES" />
        <input type="hidden" name="record" :value="candidate.id.value" />
      </div>
      <candidate-list-item
        :candidate="candidate"
        :mod="mod"
      ></candidate-list-item>
    </form>
    <div class="candidate-view__main">
      <div class="candidate-view__info">
        <el-tabs v-model="activeInfo">
          <el-tab-pane
            :label="resumeTabName"
            name="resume"
            class="candidate-fields"
          >
            <resume-tab-info :candidate="candidate"></resume-tab-info>
          </el-tab-pane>
          <el-tab-pane label="История" name="history"
            >Тут будет какая-то история по данной вакансии</el-tab-pane
          >
          <el-tab-pane label="Документы" name="documents">
            <form
              v-if="candidate.id.value"
              id="upload-doc"
              enctype="multipart/form-data"
            >
              <Upload
                name="filename_file"
                uploadText="
                  <i class='el-icon-upload'></i>
                  Перетащите файлы, чтобы прикрепить или <em>обзор</em>
                "
                @upload-file="uploadDocument"
                :file="filename_file"
                :multiple="true"
                :show-file-list="false"
                v-loading="addFile_loading"
                class="upload-doc"
              ></Upload>
            </form>
            <div
              class="candidate-view__documents"
              v-loading="removeFile_loading"
            >
              <div
                v-for="doc in all_documents_list"
                :key="doc.id.value"
                class="candidate-view__document"
              >
                <span>
                  <a
                    :href="
                      `/index.php?preview=yes&entryPoint=download&id=${doc.id.value}&type=Documents`
                    "
                  >
                    <i class="el-icon-paperclip"></i>
                    {{ doc.filename.value }}
                  </a>
                </span>
                <span>{{ doc.active_date.value }}</span>
                <span :data-id="doc.created_by.value">
                  {{ doc.created_by_name.value }}
                </span>
                <div class="candidate-view__doc-btns" v-if="doc.id.value">
                  <a
                    :href="
                      `/index.php?entryPoint=download&id=${doc.id.value}&type=Documents`
                    "
                    class="el-icon el-icon-download"
                    title="Скачать"
                  >
                  </a>
                  <a
                    href="javascript:void(0)"
                    v-if="user_id === doc.created_by.value"
                    class="el-icon el-icon-delete"
                    title="Удалить"
                    @click="showDocumentDialog(doc)"
                  >
                  </a>
                </div>
              </div>
              <div
                class="candidate-view__no-docs"
                v-if="!all_documents_list.length"
              >
                Ничего не обнаружено
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="candidate-view__comments">
        <el-tabs v-model="activeComments">
          <div class="inline-buttons stage-form__inline-buttons">
            <el-button
              class="inline-buttons__btn"
              type="primary"
              @click="is_visible.comment_form = true"
              >Комментарий</el-button
            >
          </div>
          <el-tab-pane label="Комментарии" name="comments">
            <s-comment-form
              :form-visible="is_visible.comment_form"
              @set-form-visible="showCommentForm"
              :edited-data="editedComment"
              @save-comment-form="saveCommentForm"
              :loader="saveComment_loading"
            ></s-comment-form>
            <s-comment
              class="candidate-view__comments__s-comment"
              v-for="(comment, i) in comments"
              :data="comment"
              :key="`${i}_${comment.date}`"
              :user_id="user_id"
              @delete-comment="deleteComment"
              @set-form-visible="showCommentForm"
            ></s-comment>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { formatHtml } from '@/utils/helpers';
import CandidateListItem from 'Parts/Candidate/CandidateListItem';
import Upload from 'Elements/Upload/Upload';
import Dialog from 'Elements/Dialog/Dialog';
import SComment from 'Elements/Comment/SComment';
import SCommentForm from 'Elements/Comment/SCommentForm';
import ResumeTabInfo from 'Parts/Candidate/ResumeTabInfo';
const FormData = require('form-data');

export default {
  props: {
    user_id: {
      type: String
    },
    candidate: {
      type: Object
    },
    data: {
      type: Array
    },
    mod: {
      type: Object
    }
  },
  data() {
    return {
      vacancies: [],
      all_vacancies_list: [],
      all_documents_list: [],
      rejection_reasons: [],
      rejection_categories: [],
      selectionNotAllowed: false,
      activeInfo: 'resume',
      activeComments: 'comments',
      editedComment: null,
      deletedComment: null,
      comments: [],
      is_visible: {
        relation_dialog: false,
        stage_dialog: false,
        comment_form: false,
        candidate_dialog: false,
        document_dialog: false,
        rejection_dialog: false,
        no_rejection_dialog: false,
        comment_dialog: false
      },
      selectedStage: null, // only for dialog
      deletedVacancy: null,
      deletedDoc: null,
      filename_file: [],
      removeFile_loading: false,
      addFile_loading: false,
      saveComment_loading: false,
      rejectionForm: {
        rejection_categories: '',
        rejection_reasons: ''
      },
      cancelRejectionForm: {
        return_reason: ''
      },
      rules: {
        rejection_categories: [
          {
            required: true,
            message: 'Необходимо указать Категорию отказа',
            trigger: 'change'
          }
        ],
        rejection_reasons: [
          {
            required: true,
            message: 'Необходимо указать Причину отказа',
            trigger: 'change'
          }
        ],
        return_reason: [
          {
            required: true,
            message: 'Необходимо указать Причину возврата',
            trigger: ['blur', 'change']
          }
        ]
      }
    };
  },
  mounted() {
    this.vacancies = this.data;
    this.vacancies.map(vacancy => {
      const stages = vacancy.stage_data;

      for (let key in stages) {
        this.addStageStyles(stages[key], stages);
        if (stages[key].id === vacancy.this_stage) {
          vacancy.stage = stages[key];
        }

        switch (stages[key].id) {
          case 'da56c3d2-4b84-d4f6-9a52-5dca56f7b688':
            // Оффер
            stages[key].isOffer = 1;
            break;

          case 'd9d3cffc-8ec0-9ba4-74a9-5dca56460314':
            // Подготовка к выходу
            stages[key].isPreparation = 1;
            break;

          case 'c0520b32-f7ea-858b-4ca6-5dca56388157':
            // Принят
            stages[key].isAccept = 1;
            break;

          case 'b91e9eba-efd0-7cd6-1c99-5dca5619aaf8':
            // Отказ
            stages[key].isRejection = 1;
            break;

          default:
            break;
        }

        // этапы Оффер, Подготовка к выходу, Принят
        if (
          (stages[key].id == 'da56c3d2-4b84-d4f6-9a52-5dca56f7b688' ||
            stages[key].id == 'd9d3cffc-8ec0-9ba4-74a9-5dca56460314' ||
            stages[key].id == 'c0520b32-f7ea-858b-4ca6-5dca56388157') &&
          vacancy.this_stage === stages[key].id
        ) {
          this.selectionNotAllowed = true;
        }
      }
    });
    this.$axios
      .get('index.php', {
        params: {
          module: 'HRPAC_CANDIDATES',
          action: 'get_subpanel_json_data',
          subpanel: 'hrpac_candidates_hrpac_comments_1',
          record: this.candidate.id.value,
          to_pdf: true,
          sort_by: 'date_entered',
          type_sort: 'DESC'
        }
      })
      .then(resp => {
        const comments = resp.data.List;

        if (comments.length) {
          const lastComment = formatHtml(comments[0].text.value);
          const commentValue =
            lastComment.length > 30
              ? lastComment.slice(0, 30) + '...'
              : lastComment;

          comments.map(comment => {
            this.comments.push({
              id: comment.id.value,
              user_id: comment.created_by.value,
              name: comment.created_by_name.value,
              date_entered: comment.date_entered.value,
              text: formatHtml(comment.text.value),
              to_recruits: comment.to_recruits.value,
              avatar: ''
            });
          });
          this.$set(this.candidate.comments, 'value', commentValue);
        }
      })
      .catch(err => console.log('comments loading error', err));
    this.$axios
      .get('index.php', {
        params: {
          module: 'HRPAC_VACANCY',
          action: 'Popup',
          status_id_advanced: 'Открыта',
          relate_mdule: 'HRPAC_CANDIDATES',
          relate_id: this.candidate.id.value,
          relate_mdule_link: 'hrpac_vacancy_hrpac_candidates_1',
          mode: 'MultiSelect',
          query: true,
          func_name: '',
          populate_parent: false,
          only_assigned: 1,
          jsqon_return: 1,
          to_pdf: true
        }
      })
      .then(resp => (this.all_vacancies_list = resp.data.data.data))
      .catch(err => console.log('vacancy list loading error', err));
    this.updateDocumentsList();
    this.$axios
      .get('index.php', {
        params: {
          module: 'HRPAC_REJECTION_REASONS',
          action: 'Popup',
          hide_clear_button: true,
          mode: 'MultiSelect',
          create: true,
          jsqon_return: 1,
          to_pdf: true
        }
      })
      .then(resp => (this.rejection_reasons = resp.data.data.data))
      .catch(err => console.log('rejection reason loading error', err));
    this.$axios
      .get('index.php', {
        params: {
          module: 'HRPAC_REJECTION_CATEGORIES',
          action: 'Popup',
          hide_clear_button: true,
          mode: 'MultiSelect',
          create: true,
          jsqon_return: 1,
          to_pdf: true
        }
      })
      .then(resp => (this.rejection_categories = resp.data.data.data))
      .catch(err => console.log('rejection category loading error', err));
  },
  computed: {
    filteredReasons() {
      if (this.rejectionForm.rejection_categories) {
        const category = this.rejection_categories.find(
          it => it.ID === this.rejectionForm.rejection_categories
        );

        return this.rejection_reasons.filter(
          item => item.CATEGORY_ID === category.NAME
        );
      }
      return this.rejection_reasons;
    },
    resumeTabName() {
      const text = formatHtml(this.candidate.resume_source_id.value);
      return text ? `Резюме (${text})` : 'Резюме';
    }
  },
  methods: {
    stageWidth(stagesAmount) {
      return 100 / stagesAmount + '%';
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    firstStage(item) {
      return item.stage_data[Object.keys(item.stage_data).shift()];
    },
    lastStage(item) {
      return item.stage_data[Object.keys(item.stage_data).pop()];
    },
    rejectIsDone(item) {
      return item.this_stage === this.lastStage(item).id;
    },
    setDisabledClass(stage, vacancy) {
      return stage.id === vacancy.this_stage ||
        stage.isRejection ||
        vacancy.stage.isAccept ||
        this.isOffer(stage, vacancy.stage) ||
        this.isPreparation(stage, vacancy.stage)
        ? 'no-focus'
        : '';
    },
    vacancyInfo(vacancy) {
      const isStack = vacancy.STACK ? `,&nbsp;<em>${vacancy.STACK}</em>` : '';
      const isProject = vacancy.PROJECT_LINK_ID
        ? `,&nbsp;<span>${vacancy.PROJECT_LINK_ID}</span>`
        : '';
      const isManager = vacancy.MANAGER_ID
        ? `,&nbsp;<span>${vacancy.MANAGER_ID}</span>`
        : '';
      return vacancy.NAME_ID + isStack + isProject + isManager;
    },
    updateDocumentsList() {
      this.$axios
        .get('index.php', {
          params: {
            module: 'HRPAC_CANDIDATES',
            action: 'get_subpanel_json_data',
            record: this.candidate.id.value,
            subpanel: 'hrpac_candidates_documents_1',
            to_pdf: true
          }
        })
        .then(resp => (this.all_documents_list = resp.data.List))
        .then(() => {
          this.removeFile_loading = false;
          this.addFile_loading = false;
        })
        .catch(err => console.log('documents loading error', err));
    },
    addStageStyles(stage, stages) {
      const styles = {
        width: this.stageWidth(Object.keys(stages).length)
      };

      if (stage.date_start_stage || Number(stage.this_stage)) {
        styles.background = stage.color;
        styles.color = '#ffffff';
      }
      this.$set(stage, 'styles', styles);
    },
    showCommentForm({ flag, comment = null }) {
      const isAuthor = comment && this.user_id === comment.user_id;
      if (isAuthor || !comment) {
        this.editedComment = null;
        this.is_visible.comment_form = false;
        this.$nextTick(function() {
          this.editedComment = comment;
          this.is_visible.comment_form = flag;
        });
      }
    },
    saveCommentForm(comment, edited) {
      if (comment) {
        this.saveComment_loading = true;
        const formData = new FormData();
        formData.set('module', 'HRPAC_COMMENTS');
        formData.set('record', edited ? comment.id : '');
        formData.set('action', 'Save');
        formData.set('relate_to', 'hrpac_candidates_hrpac_comments_1');
        formData.set('relate_id', this.candidate.id.value);
        formData.set('parent_type', 'HRPAC_CANDIDATES');
        formData.set('parent_id', this.candidate.id.value);
        formData.set('assigned_user_id', this.user_id);
        formData.set('to_recruits', Number(comment.to_recruits));
        formData.set('text', comment.text);

        this.$axios
          .post('index.php', formData)
          .then(() => {
            this.is_visible.comment_form = false;
            this.saveComment_loading = false;
            location.reload();
          })
          .catch(err => console.log('save comment error', err));
      }
    },
    deleteComment(comment) {
      const isAuthor = comment && this.user_id === comment.user_id;
      if (isAuthor || !comment) {
        this.$set(this.is_visible, 'comment_dialog', true);
        this.deletedComment = comment;
      }
    },
    confirmCommentDeletion() {
      if (this.deletedComment) {
        const formData = new FormData();
        this.$set(this.is_visible, 'comment_dialog', false);
        formData.set('module', 'HRPAC_COMMENTS');
        formData.set('record', this.deletedComment.id);
        formData.set('action', 'Delete');

        this.$axios
          .post('index.php', formData)
          .then(() => {
            this.deletedComment = null;
            location.reload();
          })
          .catch(err => console.log('comment remove error', err));
      }
    },
    showRelationDialog(data) {
      const { vacancy_data, this_stage } = data;
      const stageData = this.firstStage(data);
      // если 1 этап "добавлен" - единственный активный/выполненный
      if (this_stage === stageData.id && vacancy_data.name_id) {
        this.deletedVacancy = {
          id: vacancy_data.id,
          name: vacancy_data.name_id
        };
        this.$set(this.is_visible, 'relation_dialog', true);
      }
    },
    confirmVacancyRemove() {
      this.is_visible.relation_dialog = false;
      this.$axios
        .get('index.php', {
          params: {
            module: 'HRPAC_CANDIDATES',
            action: 'DeleteRelationship',
            record: this.candidate.id.value,
            linked_field: 'hrpac_vacancy_hrpac_candidates_1',
            linked_id: this.deletedVacancy.id,
            refresh_page: 1,
            inline: 1,
            ajaxSubpanel: true
          }
        })
        .then(() => {
          this.deletedVacancy = null;
          location.reload();
        })
        .catch(err => console.log('vacancy remove error', err));
    },
    selectStage(vacancy_id, stage, item) {
      const { isAccept, isRejection } = item.stage;
      const { this_stage, stage_data } = item;
      const isLimited =
        this.isOffer(stage, item.stage) ||
        this.isPreparation(stage, item.stage);

      if (stage.id !== this_stage && !isAccept && !isLimited) {
        this.selectedStage = {
          stage_data: stage,
          vacancy_id,
          this_stage,
          stages: stage_data
        };

        if (!isRejection) {
          if (!stage.isRejection) {
            this.is_visible.stage_dialog = true;
          } else {
            if (!isAccept) {
              // отказ
              this.is_visible.rejection_dialog = true;
            }
          }
        } else {
          // возврат отказа
          this.is_visible.no_rejection_dialog = true;
        }
      }
    },
    confirmStageSelect(
      selected,
      dialog,
      rejectionData = null,
      rejectionCancelData = null
    ) {
      console.log(rejectionCancelData);
      if (selected) {
        this.addStageStyles(selected.stage_data, selected.stages);
        this.is_visible[dialog] = false;
        const params = {
          module: 'HRPAC_CANDIDATES',
          action: 'selection_stage',
          candidat_id: this.candidate.id.value,
          vacancy_id: selected.vacancy_id,
          stage_id: selected.stage_data.id,
          refresh_page: 1
        };
        if (rejectionData) {
          const { rejection_categories, rejection_reasons } = rejectionData;
          params.rejection_categories = rejection_categories;
          params.rejection_reasons = rejection_reasons;
        }

        // if (rejectionCancelData) {
        //   const { return_reason } = rejectionCancelData;
        //   params.return_reason = return_reason;
        // }

        this.$axios
          .get('index.php', {
            params
          })
          .then(() => window.location.reload())
          .catch(err => console.log('stage select error', err));
      }
    },
    cancelDialogSelect(dialog, param = null, formName) {
      this.is_visible[dialog] = false;
      if (param) {
        this[param] = null;
      }

      if (formName) {
        this.$refs[formName].resetFields();
      }
    },
    selectVacancy(vacancy) {
      this.$axios
        .get('index.php', {
          params: {
            module: 'HRPAC_CANDIDATES',
            action: 'Save2',
            record: this.candidate.id.value,
            subpanel_id: vacancy.ID,
            value: 'DetailView',
            http_method: 'get',
            isDuplicate: false,
            inline: 1,
            select_entire_list: 0,
            child_field: 'hrpac_vacancy_hrpac_candidates_1',
            subpanel_field_name: 'hrpac_vacancy_hrpac_candidates_1',
            subpanel_module_name: 'hrpac_vacancy_hrpac_candidates_1',
            refresh_page: 1
          }
        })
        .then(() => location.reload())
        .catch(err => console.log('vacancy selection error', err));
    },
    deleteCandidate() {
      if (!this.data.length) {
        const form = document.getElementById('candidate-view');
        const formData = new FormData(form);
        formData.set('action', 'Delete');
        this.is_visible.candidate_dialog = false;

        this.$axios
          .post('index.php', formData)
          .then(() => {
            window.location.replace(
              '/index.php?module=HRPAC_CANDIDATES&action=index&parentTab=Основная'
            );
          })
          .catch(err => console.log('candidate remove error', err));
      }
    },
    showDocumentDialog(doc) {
      this.deletedDoc = doc;
      this.$set(this.is_visible, 'document_dialog', true);
    },
    removeDocument(doc) {
      const isAuthor = doc && this.user_id === doc.created_by.value;
      this.removeFile_loading = true;
      this.$set(this.is_visible, 'document_dialog', false);
      if (isAuthor) {
        this.$axios
          .get('index.php', {
            params: {
              module: 'HRPAC_CANDIDATES',
              action: 'DeleteRelationship',
              record: this.candidate.id.value,
              return_action: 'DeleteRelationship',
              return_module: 'HRPAC_CANDIDATES',
              return_id: this.candidate.id.value,
              linked_field: 'hrpac_candidates_documents_1',
              linked_id: doc.id.value,
              refresh_page: 1,
              inline: 1,
              ajaxSubpanel: true
            }
          })
          .then(() => {
            this.deletedDoc = null;
            this.updateDocumentsList();
          })
          .catch(err => console.log('document remove error', err));
      }
    },
    updateFormData(newId, formData) {
      formData.set('module', 'Documents');
      formData.set('record', newId);
      formData.set('action', 'Save');
      formData.set('relate_to', 'hrpac_candidates_documents_1');
      formData.set('relate_id', newId);
      formData.set('parent_type', 'HRPAC_CANDIDATES');
      formData.set('parent_id', newId);
      formData.set('revision', 1);
      formData.set('jsqon_return', 1);
      return formData;
    },
    uploadDocument(file) {
      const form = document.getElementById('upload-doc');
      let formData = new FormData(form);
      formData = this.updateFormData(this.candidate.id.value, formData);
      this.addFile_loading = true;

      if (file) {
        const { raw: blob, name } = file;
        formData.set('filename_file', blob, name);

        this.$axios
          .post('index.php', formData, {
            header: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(() => {
            this.filename_file = [];
            this.updateDocumentsList();
          })
          .catch(err => console.log('upload file error', err));
      }
    },
    confirmRejection() {
      this.$refs.rejectionForm.validate(valid => {
        if (valid) {
          this.confirmStageSelect(
            this.selectedStage,
            'rejection_dialog',
            this.rejectionForm
          );
        } else {
          console.log('Заполните обязательные поля!');
        }
      });
    },
    confirmCancelRejection() {
      this.$refs.cancelRejectionForm.validate(valid => {
        if (valid) {
          this.confirmStageSelect(
            this.selectedStage,
            'no_rejection_dialog',
            null,
            this.cancelRejectionForm
          );
        } else {
          console.log('Заполните обязательные поля!');
        }
      });
    },
    isOffer(stage, currentStage) {
      const lessThanOffer =
        !currentStage.isOffer &&
        Number(stage.sort) > Number(currentStage.sort) &&
        !currentStage.isPreparation;

      if (currentStage.isOffer) {
        return stage.isAccept;
      } else if (lessThanOffer || currentStage.isRejection) {
        return stage.isAccept || stage.isPreparation;
      } else {
        return false;
      }
    },
    isPreparation(stage, currentStage) {
      return (
        !!currentStage.isPreparation &&
        !stage.isAccept &&
        Number(stage.sort) > Number(currentStage.sort) &&
        !stage.isRejection
      );
    },
    isDisabledRejectBtn(data) {
      const isAcceptedStage = Object.values(data.stage_data).find(
        s => s.isAccept
      );
      const isAccepted = isAcceptedStage
        ? isAcceptedStage.id === data.this_stage
        : false;

      return this.rejectIsDone(data) || isAccepted;
    }
  },
  components: {
    CandidateListItem,
    Upload,
    Dialog,
    SComment,
    SCommentForm,
    ResumeTabInfo
  }
};
</script>
