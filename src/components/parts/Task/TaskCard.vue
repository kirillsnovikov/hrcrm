<template>
  <el-container class="task-card">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">/ suitecrm</el-breadcrumb-item>
      <el-breadcrumb-item
        ><a href="/">/ suite-366 Задача уровня 1</a></el-breadcrumb-item
      >
      <el-breadcrumb-item>/ suite-378 Задача уровня 2</el-breadcrumb-item>
    </el-breadcrumb>
    <el-header class="task-card__header">
      <!-- header fixed pos -->
      <h1>Наименование задачи, бла-бла</h1>
      <div class="command-bar">
        <el-button>Править</el-button>
        <el-button>В разработку</el-button>
        <el-button>Завершено</el-button>
      </div>
    </el-header>
    <el-container class="task-body">
      <el-main class="task-body__main">
        <div class="task-details">
          <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
              {{ 'List item ' + o }}
            </div>
          </el-card>
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleTagClose(tag)"
          >
            {{ tag }}
          </el-tag>
        </div>
        <div class="task-description">
          <h3>Описание</h3>
          <div class="task-full-text">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
              voluptate, corporis velit mollitia, sapiente sint commodi dolor
              distinctio beatae molestias ipsum praesentium earum obcaecati
              laborum. Laboriosam facilis labore illum maiores?
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum,
              accusantium?
            </p>
            <ul>
              <li>Сделать это это</li>
              <li>Сделать то и другое</li>
              <li>Сделать третий пункт и тд</li>
            </ul>
          </div>
        </div>
        <div class="task-tabs">
          <el-tabs
            v-model="activeName"
            type="border-card"
            @tab-click="handleClickTab"
          >
            <el-tab-pane label="Comment" name="comment"
              >Комментарии</el-tab-pane
            >
            <el-tab-pane label="Document" name="document"
              >Документы</el-tab-pane
            >
            <el-tab-pane label="History" name="history">История</el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
      <el-aside class="task-body__sidebar">
        <div class="task-people"></div>
      </el-aside>
    </el-container>
    <el-footer></el-footer>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      detailsData: {
        // task_type: 
      },
      activeName: 'comment',
      dynamicTags: ['Tag 1', 'Tag 2', 'Tag 3'],
      inputVisible: false,
      inputValue: ''
    };
  },
  methods: {
    handleClickTab(tab, event) {
      console.log(tab, event);
    },
    handleTagClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
};
</script>
