<template>
  <!--
    :snap  是否开启元素对齐
    :draggable 是否可以拖动
    :resizable  是否可以设置大小
    :scaleRatio  缩放比例
    :drag-handle  定义应该用于拖动组件的选择器
    :parent="false"  限制不能拖出父元素 
    :grid="[10,10]"  水平和垂直移动 每次分别能够走多少像素
    :isConflictCheck  定义组件是否开启冲突检测
    :classNameHandle  handle的class名称
    :snapTolerance 当调用对齐时，用来设置组件与组件之间的对齐距离，以像素为单位
  -->
  <vdr-tem
    ref="vdrTem"
    :snap="true"
    :debug="false"
    :grid="[10,10]"
    :scaleRatio="1"
    :parent="false"
    :snapTolerance="1"
    :x="vdrData.x || 0"
    :y="vdrData.y || 0"
    :handles="handleList"
    :drag-handle="'.drag'"
    :isConflictCheck="true"
    :min-width="vdrData.minW"
    :min-height="vdrData.minH"
    :w="dataItem.width || 450"
    :h="dataItem.height || 300"
    :resizable="dataItem.resizable"
    :draggable="dataItem.canDraggable"
    :classNameHandle="classNameHandle"
    @dragstop="onDragstop"
    @resizestop="onResizstop"
    @refLineParams="getRefLineParams"
    @activated="onActivated(dataItem, dataIndex)"
  >
    <slot></slot>
  </vdr-tem>
</template>
<script>
import vdr from './src';
export default {
  name: 'vdrTem',
  components: {
    'vdr-tem': vdr
  },
  props: {
    dataItem: Object,
    dataIndex: Number,
    classNameHandle: {
      type: String,
      default: 'handle'
    },
  },
  data() {
    return {
      vdrData: {
        x: 0, y: 0, minW: 100, minH: 100,
      },
      handleList: [ 'br' ]
    }
  },
  mounted() {
    this.setXYWH();
  },
  methods: {
    // 第一次点击触发
    onActivated(item, index) {
      this.$emit('onActivated', {
        index,
        dataItem: item,
      })
    },
    // 尺寸变更完触发
    onResizstop(left, top, width, height) {
      this.$emit('onResizstop',{
        left,
        top,
        width,
        height
      })
    },
    // 拖拽完成触发
    onDragstop(left, top) {
      this.$emit('onDragstop',{
        top,
        left
      })
    },
    setXYWH() {
      try {
        const items = this.dataItem;
        if(items){
          const x = items.x;
          if(this.vdrData.x !== x) {
            this.vdrData.x = x
          }
          const y = items.y;
          if(this.vdrData.y !== y) {
            this.vdrData.y = y
          }
          if(this.vdrData.minW !== items.minWidth) {
            this.vdrData.minW = items.minWidth;
          }
          if(this.vdrData.minH !== items.minHeight) {
            this.vdrData.minH = items.minHeight;
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    setParentSize() {
      this.$refs.vdrTem.checkParentSize()
    },
    getRefLineParams(params) {
      this.$emit('getRefLineParams', params)
    }
  }
}
</script>
<style lang="css" scoped>
@import './style/vue-draggable-resizable.css';
</style>