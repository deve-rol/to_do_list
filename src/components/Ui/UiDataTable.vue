<template>
  <div class="data-table">
    <div class="table-row head" :style="{ gridTemplateColumns }">
      <div
        v-for="(item, key) in headItems"
        :key="key"
        :class="['head-item', { sort: item.sort }]"
        @click="sorting(item)"
      >
        <span>{{ item.name }}</span>
        <ui-icon
          v-if="item.sort"
          name="sort-icon"
          fill="#000"
          :class="['sort-icon', { up: sortOptions.up }]"
        />
      </div>
    </div>

    <template v-if="sortedBodyItems.length">
      <div
        v-for="item in sortedBodyItems"
        :key="item.id"
        class="table-row body"
        :style="{ gridTemplateColumns }"
      >
        <div v-for="(prop, key) in bodyProps" :key="key" class="body-item">
          <div v-if="prop === 'remove-icon'" class="icon-group">
            <ui-icon
              @click="editById(item.id)"
              name="edit"
              fill="#777"
              class="edit-icon"
            />
            <ui-icon
              @click="removeById(item.id)"
              name="remove"
              fill="#777"
              class="remove-icon"
            />
          </div>
          <span v-else :title="item[prop]">{{ item[prop] }}</span>
        </div>
      </div>
    </template>
    <div v-else class="table-row no-result">
      <span>Нет данных</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "UiDataTable",
  props: {
    headItems: {
      type: Array,
      required: true,
    },
    bodyItems: {
      type: Array,
      required: true,
    },
    bodyProps: {
      type: Array,
      required: true,
    },
    columnsStyle: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      sortOptions: {
        prop: "",
        up: false,
      },
    };
  },
  computed: {
    sortedBodyItems() {
      const prop = this.sortOptions.prop;
      const up = this.sortOptions.up;
      const items = [...this.bodyItems].sort((a, b) => {
        return a[prop].toLowerCase() > b[prop].toLowerCase()
          ? 1
          : a[prop].toLowerCase() < b[prop].toLowerCase()
          ? -1
          : 0;
      });

      return up ? items.reverse() : items;
    },
    gridTemplateColumns() {
      return this.columnsStyle || "1fr ".repeat(this.headItems.length);
    },
  },
  created() {
    this.sortOptions.prop = this.headItems.find((item) => item.sort)?.prop;
  },
  methods: {
    sorting(item) {
      if (!item.sort) return;

      this.sortOptions.prop = item.prop;
      this.sortOptions.up = !this.sortOptions.up;
    },
    editById(id) {
      this.$emit("edit", id);
    },
    removeById(id) {
      this.$emit("remove", id);
    },
  },
};
</script>

<style scoped lang="scss">
.data-table {
  width: 100%;

  .head {
    border-bottom: 1px solid #aaa;
  }

  .table-row {
    display: grid;
    padding: 4px;

    &.body:hover {
      background-color: rgba(100, 100, 100, 0.1);

      .icon-group {
        opacity: 1;
      }
    }

    .head-item {
      display: flex;
      align-items: center;

      &.sort {
        cursor: pointer;
      }

      .sort-icon.up {
        transform: rotate(180deg);
      }
    }

    .body-item {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .icon-group {
      display: flex;
      align-items: center;
      opacity: 0;

      .edit-icon {
        margin-right: 4px;
      }
      .edit-icon,
      .remove-icon {
        cursor: pointer;
      }
    }

    &.no-result {
      text-align: center;
    }
  }
}
</style>
