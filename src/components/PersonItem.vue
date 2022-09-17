<template>
  <div class="actor-item">
    <el-avatar shape="square" fit="cover" :size="70" :src="avatar"></el-avatar>
    <div>{{ name }}</div>
    <i class="el-icon-error" @click="deleteActor()"></i>
  </div>
</template>
<script>
export default {
  props: ["id", "name", "avatar"],
  data() {
    return {};
  },
  methods: {
    deleteActor() {
      // 通知父组件，点击了删除,主动触发在父组件中监听的delete事件
      this.$emit("delete");
    },
  },
};
</script>
<style scoped>
.actor-item {
  display: inline-block;
  margin: 20px 20px 0px 0px;
  text-align: center;
  position: relative;
}
.actor-item:hover i {
  display: block;
}
.actor-item i {
  position: absolute;
  font-size: 1.2em;
  top: -6px;
  right: -6px;
  display: none;
}
.actor-item div {
  font-size: 0.9em;
}
.el-avatar >>> img {
  width: 100%;
}
</style>
