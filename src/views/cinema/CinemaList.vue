<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>电影院管理</el-breadcrumb-item>
      <el-breadcrumb-item>电影院列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <div
      id="cinemaListMapContainer"
      style="width: 100%; height: 230px; border: 1px solid #aaa"
    ></div>
    <!-- 分割线 -->
    <el-divider content-position="left">电影院列表</el-divider>
    <el-table :data="tableData" stripe style="width: 100%" height="300px">
      <el-table-column
        align="center"
        prop="cinema_name"
        label="影院名称"
        width="280"
        sortable
      >
      </el-table-column>
      <el-table-column prop="address" label="影院地址" width="280">
      </el-table-column>
      <el-table-column
        label="影院位置"
        width="180"
        sortable
        :sort-method="sortByLocation"
      >
        <template slot-scope="scope">
          {{ scope.row.city }}{{ scope.row.district }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            title="查看影院位置"
            @click="showLocation(scope.row.longitude, scope.row.latitude)"
            type="success"
            icon="el-icon-location-information"
            circle
          ></el-button>
          <el-button
            title="查看影院放映厅列表"
            @click="$router.push(`/home/cinema-room-list/${scope.row.id}`)"
            type="success"
            icon="el-icon-s-unfold"
            circle
          ></el-button>
          <el-button
            title="修改电影院"
            type="warning"
            icon="el-icon-edit"
            circle
            @click="$router.push(`/home/cinema-update/${scope.row.id}`)"
          ></el-button>
          <el-button
            title="删除电影院"
            type="danger"
            @click="showDeleteDialog(scope.row.id)"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  data() {
    return {
      map: null, //地图对象
      tableData: [],
    };
  },
  methods: {
    // 弹出删除对话框
    showDeleteDialog(id) {
      this.$confirm(
        "此操作将会永久关闭影院，已有影片排期将作废，是否确定删除影院？",
        "注意"
      )
        .then((res) => {
          return this.$http.CinemaApi.delete({ id });
        })
        .then((res) => {
          console.log("删除影院", res);
          if (res.data.code == 200) {
            this.$message.success("删除成功");
            this.loadAllCinemas();
          }
        });
    },
    // 显示位置
    showLocation(lng, lat) {
      if (this.map != null) {
        this.map.setCenter([lng, lat], false, 1000);
        this.map.setZoom(18, false, 1000);
      }
    },
    // 初始化显示地图
    initMap() {
      AMapLoader.load({
        key: "433a992dd3ba3630d4060974d1b4a5cc",
        version: "2.0",
        plugins: [],
      })
        .then((AMap) => {
          this.map = new AMap.Map("cinemaListMapContainer", {
            zoom: 11,
            center: [116.397428, 39.90923],
            viewMode: "3D",
          });
          // 将所有的电影院位置再地图中以maker的方式显示
          this.tableData.forEach((item) => {
            let lat = item.latitude;
            let lng = item.longitude;
            // 创建maker
            let marker = new AMap.Marker({
              position: new AMap.LngLat(lng, lat),
            });
            this.map.add(marker);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 影院位置列排序
    sortByLocation(a, b) {
      let astr = a.city + a.district;
      let bstr = b.city + b.district;
      return astr > bstr;
    },
    loadAllCinemas() {
      //加载所有电影院数据
      this.$http.CinemaApi.list().then((res) => {
        console.log(" 加载所有电影院数据", res);
        if (res.data.code == 200) {
          this.tableData = res.data.data;
        }
      });
    },
  },
  mounted() {
    // 加载所有电影院数据
    this.loadAllCinemas();
    // 初始化地图
    this.initMap();
  },
};
</script>
