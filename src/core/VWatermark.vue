<template>
  <div style="position:relative;" ref="wrapper">
    <slot></slot>
    <div
      v-for="(_, row_key) in new Array(rowInt)"
      :key="row_key"
    >
      <div
        v-for="(_, column_key) in new Array(columnInt)"
        :key="column_key"
        :style="{
          top: yStart + yTotal * row_key + 'px',
          left:  xStart + xTotal * column_key + 'px',
          width: itemWidth + 'px',
          height: itemHeight + 'px',
          'line-height': itemHeight + 'px',
          fontSize: fontSize,
          fontFamily: font,
          color: color,
          opacity: alpha,
          transform: 'rotate(' + angle + 'deg)'
        }"
        style="
          position:absolute;
          z-index:999;
          display:inline-block;
          overflow:hidden;
          text-align:center;
          pointer-events:none;
        "
      >
        {{text}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "v-watermark",
    props: {
      target: {
        type: String,
        default: ""
      },
      width: {
        type: Number,
        default: 960
      },
      height: {
        type: Number,
        default: 540
      },
      row: {
        type: Number,
        default: 0
      },
      column: {
        type: Number,
        default: 0
      },
      itemWidth: {
        type: Number,
        default: 120
      },
      itemHeight: {
        type: Number,
        default: 80
      },
      text: {
        type: String,
        default: "data"
      },
      angle: {
        type: Number,
        default: -15
      },
      xStart: {
        type: Number,
        default: 0
      },
      yStart: {
        type: Number,
        default: 0
      },
      xSpace: {
        type: Number,
        default: 0,
        validator: value => value >= 0
      },
      ySpace: {
        type: Number,
        default: 0,
        validator: value => value >= 0
      },
      fontSize: {
        type: String,
        default: "20px"
      },
      font: {
        type: String,
        default: "微软雅黑"
      },
      color: {
        type: String,
        default: "#000000",
        validator: value => /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value)
      },
      alpha: {
        type: Number,
        default: 0.3,
        validator: value => value >= 0 && value <= 1
      },
    },
    computed: {
      _row: function () {
        return this.row
          ? this.row
          : this.contentHeight - this.yStart
            ? (this.contentHeight - this.yStart) / this.yTotal
            : 1
      },
      _column: function () {
        return this.column
          ? this.column
          : this.contentWidth - this.xStart
            ? (this.contentWidth - this.xStart) / this.xTotal
            : 1
      },
      rowInt: function () {
        return this._row >= 1 ? Math.floor(Number(this._row)) : 1
      },
      columnInt: function () {
        return this._column >= 1 ? Math.floor(Number(this._column)) : 1
      },
      xTotal: function () {
        return this.xSpace + this.itemWidth
      },
      yTotal: function () {
        return this.ySpace + this.itemHeight
      },
      contentWidth: function () {
        const wrapper = this.$refs["wrapper"]
        return this.width
        // return wrapper.width || wrapper.scrollWidth || wrapper.clientWidth;
      },
      contentHeight: function () {

        return this.height
        // return wrapper.height || wrapper.scrollHeight || wrapper.clientHeight;
      }
    },
    mounted() {
      const wrapper = this.$refs["wrapper"]
    }
  }
</script>

<style scoped>
</style>
