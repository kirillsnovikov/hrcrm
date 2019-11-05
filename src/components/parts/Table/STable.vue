<template>
  <section id="s-table" class="s-table">
    <s-table-item
      v-for="item in parseTableData"
      :data="item"
      :key="item.id"
    ></s-table-item>
  </section>
</template>

<script>
import STableItem from 'Parts/Table/STableItem.vue';
import 'Parts/Table/table.scss';
export default {
  props: {
    data: {
      type: Object,
      default: new Object()
    }
  },
  components: {
    STableItem
  },
  computed: {
    parseTableData() {
      let tableData = [];
      this.data.entry_list.forEach(item => {
        let result = {};
        result['header'] = {};
        result['body'] = {};
        let data = item.name_value_list;
        result.header['title'] = data.name.value;
        result.header['location'] = data.location_id.value;
        result.header['status'] = data.status_id.value;
        result.body['Бизнес юнит'] = data.business_unit_id.value;
        result.body['Линейный руководитель'] = data.supervisor_id.value;
        result.body['Проект'] = data.project_link_id.value;
        result.body['Нанимающий менеджер'] = data.manager_id.value;
        result.body['Отдел'] = data.department_id.value;
        result.body['Рекрутер'] = data.recruiter_id.value;
        tableData.push(result);
      });
      return tableData;
    }
  }
};
</script>
