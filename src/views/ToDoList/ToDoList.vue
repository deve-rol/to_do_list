<template>
  <div class="to-do-list">
    <div class="content">
      <ui-data-table
        @remove="removeById"
        @edit="editById"
        :head-items="dataTableHead"
        :body-items="dataTableBody"
        :body-props="dataTableBodyProps"
        columns-style="1fr 1fr 1fr 36px"
        class="list-table"
      />

      <div class="add-btn-wrap">
        <router-link to="Add" tag="button" class="add-btn primary-btn">
          Добавить
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import UiDataTable from "../../components/Ui/UiDataTable";
export default {
  name: "List",
  components: { UiDataTable },
  data() {
    return {
      dataTableHead: [
        { name: "id", prop: "id", sort: false },
        { name: "Наименование", prop: "name", sort: true },
        { name: "Описание", prop: "description", sort: false },
        { name: "", prop: "", sort: false },
      ],
      dataTableBodyProps: ["id", "name", "description", "remove-icon"],
    };
  },
  computed: {
    dataTableBody() {
      return this.$store.getters["toDoList/getToDoList"];
    },
  },
  methods: {
    removeById(id) {
      this.$store.dispatch("toDoList/A_REMOVE_ITEM", id).catch(() => {
        alert("Ошибка");
      });
    },
    editById(id) {
      this.$router.push(`Edit/${id}`);
    },
  },
};
</script>

<style scoped lang="scss">
.to-do-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;

  .content {
    width: 50%;
    min-width: 500px;

    .add-btn-wrap {
      display: flex;
      justify-content: flex-end;

      .add-btn {
        text-align: end;
        margin-top: 20px;
      }
    }
  }
}
</style>
