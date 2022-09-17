<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>电影管理</el-breadcrumb-item>
      <el-breadcrumb-item>电影列表</el-breadcrumb-item>
      <el-breadcrumb-item>剧照列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 分割线 -->
    <el-divider content-position="left">剧照列表</el-divider>
    <div v-if="thumbList">
      <div
        class="thumb-item"
        v-for="item in thumbList"
        :key="item.id"
        style="display: inline-block"
      >
        <el-image
          style="
            width: 160px;
            height: 120px;
            box-shadow: #0003 0px 5px 5px 0px;
            margin: 10px 20px 0 0;
          "
          :src="item.url"
          fit="cover"
        ></el-image>
        <i class="el-icon-error" @click="deleteThumb(item.id)"></i>
      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";
export default {
  data() {
    return {
      movie_id: this.$route.params.movie_id,
      thumbList: null,
    };
  },
  mounted() {
    this.loadThumbByMovieId();
  },
  methods: {
    // 删除剧照
    deleteThumb(id) {
      this.$http.MovieThumbApi.delete({ id }).then((res) => {
        console.log("删除剧照", res);
        if (res.data.code == 200) {
          this.loadThumbByMovieId();
        }
      });
    },
    // 通过ID查询剧照列表
    loadThumbByMovieId() {
      this.$http.MovieThumbApi.listByMovieId({ movie_id: this.movie_id }).then(
        (res) => {
          console.log("通过ID查询剧照列表", res);
          this.thumbList = res.data.data;
        }
      );
    },
  },
};
</script>
<style scoped>
.thumb-item {
  display: inline-block;
  position: relative;
}
.thumb-item i {
  position: absolute;
  font-size: 1.3em;
  top: 0;
  right: 10px;
  display: none;
  color: brown;
}
.thumb-item:hover i {
  display: block;
}
</style>
