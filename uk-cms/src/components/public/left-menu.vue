<template>
  <ul class="left-menu-ul" id="my-menu-box" :key="thisKey">
    <li
      class="menu-items"
      v-for="(item,index) in menuList"
      :key="'rt'+index"
      :class="routename==item.name?'isactive-item':openMeunIndex == index?'isopen-item':''"
      @click.stop="tolinkPage(item,index)"
    >
      <!-- 头部title -->
      <div class="item-content-title" :class="isCollapse?'is-collapse':''">
        <i class="left-icon" :class="item.iconName"></i>
        <span v-show="!isCollapse">{{item.title}}</span>
        <!-- 菜单箭头切换 -->
        <i
          class="right-icon el-icon-arrow-up"
          v-show="!isCollapse && item.collapse"
          v-if="item.children"
        ></i>
        <i
          class="right-icon el-icon-arrow-down"
          v-show="!isCollapse && !item.collapse"
          v-if="item.children"
        ></i>
      </div>
      <!-- 二级菜单 -->
      <ul class="children-list" v-show="item.collapse" v-if="item.children && !isCollapse">
        <li
          class="list-item"
          v-for="(ct,i) in item.children"
          :key="'ct'+i"
          :class="routename==ct.name?'isactive-item':''"
          @click.stop="towpageLink(ct,index)"
        >
          <i class="left-icon" :class="ct.iconName"></i>
          <span v-show="!isCollapse">{{ct.title}}</span>
        </li>
      </ul>
      <div class="right-children-meun" v-if="item.children && isCollapse">
        <ul class="right-chidren-list">
          <li
            class="rc-item-li"
            v-for="(rc,ix) in item.children"
            :key="'rc'+ix"
            :class="routename==rc.name?'isactive-item':''"
            @click.stop="towpageLink(rc,index)"
          >
            <i class="left-icon" :class="rc.iconName"></i>
            <span>{{rc.title}}</span>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: "LeftMenu",
  props: {
    routerData: {
      type: Array,
      default: ()=> {
        return []
      }
    },
    // 控制展开和收缩
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menuList: [],
      thisKey: 1,
      openMeunIndex: null,
      routename: this.$route.name,
    };
  },
  watch: {
    routerData(newData) {
      if (newData) {
        this.setMenuState(newData)
      }
    },
    isCollapse(newData){
      if(newData === false){
        this.setMenuState(this.menuList);
      }
    },
    $route(to){
      this.routename = to.name;
      this.setMenuState(this.menuList)
    }
  },
  mounted(){
    this.setFlotMenu();
  },
  methods: {
    tolinkPage(item, index) {
      this.openMeunIndex = null;
      if (item.children) {
        this.$set(
          this.menuList[index],
          "collapse",
          !this.menuList[index].collapse
        );
      } else {
        if (item.name) {
          this.$router.push({ name: item.name });
          this.routename = item.name;
        }
      }
    },
    towpageLink(item, index) {
      if (item.name) {
        this.openMeunIndex = index;
        this.$router.push({ name: item.name });
        this.routename = item.name;
      }
    },
    setMenuState(newData) {
      var menuarr = newData.map((item, index) => {
        if (item.children) {
          item.collapse = false;
          item.children.map((ct) => {
            if (this.routename == ct.name) {
              item.collapse = true;
              this.openMeunIndex = index;
            }
          });
        }
        return item;
      });
      this.menuList = JSON.parse(JSON.stringify(menuarr));
    },
    setFlotMenu(){
      this.$nextTick(()=>{
        setTimeout(()=>{
          if(this.isCollapse){
            var widthNum = document.getElementById('my-menu-box').offsetWidth;
            var adom = document.getElementsByClassName('right-children-meun');
            for (var index = 0; index < adom.length; index++) {
              adom[index].style.left = widthNum+8+'px';
            }
          }
        });
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../less/left-menu.less");
</style>