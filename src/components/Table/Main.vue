<template>
  <div class="t-wrap-all" :style="{ height: height + 'px' }">
    <!--Fixed top header-->
    <div class="t-top-fixrow" ref="tTop">
      <table class="t-style">
        <thead>
          <tr>
            <th v-for="(col, key) in columnsFix.allCol" :key="key">
              <div :style="{ width: col.width + 'px' }">{{ col.title }}</div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <!--Fixed Left-->
    <template v-if="data.length > 0 && columnsFix.fixLeftCol.length > 0">
      <div class="t-left-fixcol-header">
        <table class="t-style">
          <thead>
            <tr>
              <th v-for="(th, key) in columnsFix.fixLeftCol" :key="key">
                <div :style="{ width: th.width + 'px' }">{{ th.title }}</div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div
        class="t-left-fixcol"
        ref="tLeft"
        :style="{ height: tableFixHeight }"
      >
        <table class="t-style">
          <thead>
            <tr>
              <th v-for="(th, key) in columnsFix.fixLeftCol" :key="key">
                <div :style="{ width: th.width + 'px' }">{{ th.title }}</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(rowData, index) in data"
              :class="{ 'tr-hover': nowHover == index }"
              :style="{ height: heightRows[index] }"
              @mouseover="trHover(index)"
              @mouseout="trOut"
              :key="index"
            >
              <td v-for="(th, key) in columnsFix.fixLeftCol" :key="key">
                <div :style="{ width: th.width + 'px' }">
                  {{ rowData[th.key] }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <!-- Table Main -->
    <div class="t-main-wrap">
      <div
        class="t-wrap"
        @scroll="tableScroll"
        ref="tWrap"
        :style="{ height: height + 'px' }"
      >
        <table class="t-style table-t" ref="tMain">
          <thead>
            <tr>
              <th
                v-for="(col, key) in columnsFix.allCol"
                style="min-width:120px"
                :key="key"
              >
                <div :style="{ width: col.width + 'px' }">
                  {{ col.title }}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="data.length == 0">
              <tr>
                <td
                  :colspan="columnsFix.allCol.length"
                  style="text-align:center"
                >
                  No data
                </td>
              </tr>
            </template>
            <tr
              v-for="(rowData, index) in data"
              @dblclick="dblclick(rowData, index)"
              :class="{ 'tr-hover': nowHover == index }"
              :style="{ height: heightRows[index] }"
              @mouseover="trHover(index)"
              @mouseout="trOut"
              :key="index"
            >
              <td v-for="(col, key) in columnsFix.allCol" :key="key">
                <div :style="{ width: col.width + 'px' }">
                  <slot :name="col.key" :item="rowData[col.key]">
                    {{ rowData[col.key] }}
                  </slot>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!--Fix Right -->
    <template v-if="data.length > 0 && columnsFix.fixRightCol.length > 0">
      <div
        class="t-right-fixcol-header"
        :class="{ 'no-left-scroll': noLeftScroll }"
      >
        <table class="t-style">
          <thead>
            <tr>
              <th v-for="(th, key) in columnsFix.fixRightCol" :key="key">
                <div :style="{ width: th.width + 'px' }">{{ th.title }}</div>
              </th>
            </tr>
          </thead>
        </table>
      </div>

      <div
        class="t-right-fixcol"
        ref="tRight"
        :style="{ height: tableFixHeight }"
        :class="{ 'no-left-scroll': noLeftScroll }"
      >
        <table class="t-style">
          <thead>
            <tr>
              <th v-for="(th, key) in columnsFix.fixRightCol" :key="key">
                <div :style="{ width: th.width + 'px' }">{{ th.title }}</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(rowData, index) in data"
              :class="{ 'tr-hover': nowHover == index }"
              :style="{ height: heightRows[index] }"
              @mouseover="trHover(index)"
              @mouseout="trOut"
              :key="index"
            >
              <td v-for="(th, key) in columnsFix.fixRightCol" :key="key">
                {{ rowData[th.key] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <!--end -->
  </div>
</template>

<script>
export default {
  name: "du-table",
  props: {
    height: Number,
    data: Array,
    columns: Array
  },
  data: function() {
    return {
      heightRows: [],
      noLeftScroll: "",
      tableFixHeight: "0px",
      nowHover: -1 //Currently passing line
    };
  },
  watch: {
    //The table data is updated and the table is fixed
    data: function() {
      let vm = this;
      vm.$nextTick(function() {
        vm.calcTableFix();
      });
    },
    columns: function() {
      let vm = this;
      vm.$nextTick(function() {
        vm.calcTableFix();
      });
    }
  },
  mounted: function() {
    let vm = this;
    vm.calcTableFix();

    //Listen for window change events
    window.addEventListener("resize", function() {
      vm.calcTableFix();
    });
  },
  computed: {
    //Fixed column data
    columnsFix: function() {
      let fixLeftCol = [];
      let fixRightCol = [];
      let unFixCol = [];
      console.log(this.columns);
      for (let i = 0; i < this.columns.length; i++) {
        let thisData = this.columns[i];
        if (thisData.fixed && thisData.fixed == "left") {
          fixLeftCol.push(thisData);
        } else if (thisData.fixed && thisData.fixed == "right") {
          fixRightCol.push(thisData);
        } else {
          unFixCol.push(thisData);
        }
      }
      unFixCol.unshift.apply(unFixCol, fixLeftCol);
      unFixCol.push.apply(unFixCol, fixRightCol);

      return {
        fixLeftCol: fixLeftCol, //Fixed on the left
        fixRightCol: fixRightCol, //Fixed on the right
        allCol: unFixCol //Fixed header
      };
    }
  },
  methods: {
    //Fixed left
    tableScroll: function() {
      requestAnimationFrame(this.tableScrollMethod);
      // this.tableScrollMethod();
    },
    tableScrollMethod: function() {
      //Head scrolling
      this.$refs.tTop &&
        (this.$refs.tTop.scrollLeft = this.$refs.tWrap.scrollLeft);
      //Scroll left
      this.$refs.tLeft &&
        (this.$refs.tLeft.scrollTop = this.$refs.tWrap.scrollTop);
      //Scroll right
      this.$refs.tRight &&
        (this.$refs.tRight.scrollTop = this.$refs.tWrap.scrollTop);
    },
    calcTableFix: function() {
      try {
        let vm = this;
        const tMain = vm.$refs.tMain;
        const tLeft = vm.$refs.tLeft;
        const tRight = vm.$refs.tRight;

        //Set the width of each column
        let ths = tMain.querySelectorAll("th");
        for (let i = 0; i < vm.columns.length; i++) {
          let allCol = vm.columnsFix.allCol[i];
          vm.$set(allCol, "width", allCol.width || ths.item(i).clientWidth);
        }

        //calcTableFixHeight
        if (tMain.clientHeight <= vm.height) {
          //When the table data is not enough to fill the total height
          vm.noLeftScroll = true;
          vm.tableFixHeight = tMain.clientHeight + "px";
        } else {
          vm.noLeftScroll = false;
          vm.tableFixHeight = vm.height - 10 + "px";
        }

        //calcHeightRows
        const trs = tMain.querySelectorAll("tbody > tr");
        let arr = [];
        for (var i = 0; i < trs.length; i++) {
          let _l = tLeft.querySelectorAll("tbody > tr")[i].offsetHeight;
          let _m = tMain.querySelectorAll("tbody > tr")[i].offsetHeight;
          let _r = tRight.querySelectorAll("tbody > tr")[i].offsetHeight;
          let _max = Math.ceil(Math.max(_l, _m, _r));
          arr.push(_max + "px");
        }
        vm.heightRows = arr;
      } catch (err) {
        console.log(err);
      }
    },
    //Double-click event
    dblclick: function(rowData, index) {
      this.$emit("t-dblclick", rowData, index);
    },
    //Hover change event
    trHover: function(index) {
      this.nowHover = index;
    },
    trOut: function() {
      this.nowHover = -1;
    }
  }
};
</script>
<style lang="scss" src="./style.scss"></style>
