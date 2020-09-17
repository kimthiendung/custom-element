<template>
  <div>
    <div class="table-fix-tbody-wrap">
      <div
        class="table-wrap"
        @scroll="tableScroll"
        ref="table"
        :style="{ height: height + 'px' }"
      >
        <table class="table-style table-t" ref="tableTrue">
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
                  {{ rowData[col.key] }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
        vm.checkFix();
        vm.calcTableFixHeight();
        vm.calcHeightRows();
      });
    },
    columns: function() {
      this.$nextTick(function() {
        this.checkFix();
        this.calcTableFixHeight();
      });
    }
  },
  mounted: function() {
    let vm = this;
    vm.checkFix();
    vm.calcTableFixHeight();

    //Listen for window change events
    window.addEventListener("resize", function() {
      vm.checkFix();
      vm.calcTableFixHeight();
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
      this.$refs.tableTop &&
        (this.$refs.tableTop.scrollLeft = this.$refs.table.scrollLeft);
      //Scroll left
      this.$refs.tableLeft &&
        (this.$refs.tableLeft.scrollTop = this.$refs.table.scrollTop);
      //Scroll right
      this.$refs.tableRight &&
        (this.$refs.tableRight.scrollTop = this.$refs.table.scrollTop);
    },
    checkFix: function() {
      let vm = this;
      let ths = vm.$refs.tableTrue.querySelectorAll("th");
      for (let i = 0; i < vm.columns.length; i++) {
        //Set the width of each column
        let allCol = vm.columnsFix.allCol[i];
        vm.$set(allCol, "width", allCol.width || ths.item(i).clientWidth);
      }
    },
    calcHeightRows: function() {
      let vm = this;
      try {
        const tr = vm.$refs.tableTrue.querySelectorAll("tbody > tr");
        let arr = [];
        for (var i = 0; i < tr.length; i++) {
          let _l = vm.$refs.tableLeft.querySelectorAll("tbody > tr")[i]
            .offsetHeight;
          let _m = vm.$refs.tableTrue.querySelectorAll("tbody > tr")[i]
            .offsetHeight;
          let _r = vm.$refs.tableRight.querySelectorAll("tbody > tr")[i]
            .offsetHeight;
          console.log(_m);
          let _max = Math.ceil(Math.max(_l, _m, _r));
          arr.push(_max + "px");
        }
        vm.heightRows = arr;
      } catch (err) {
        console.log(err);
      }
    },
    //Calculate table height
    calcTableFixHeight: function() {
      if (this.$refs.tableTrue.clientHeight <= this.height) {
        //When the table data is not enough to fill the total height
        this.noLeftScroll = true;
        this.tableFixHeight = this.$refs.tableTrue.clientHeight + "px";
      } else {
        this.noLeftScroll = false;
        this.tableFixHeight = this.height - 10 + "px";
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
