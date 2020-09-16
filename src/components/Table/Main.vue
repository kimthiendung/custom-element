<template>
  <div>
    <table>
      <tbody>
        <tr>
          <cell><app-element myprop="ddd"></app-element></cell>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AppElement from "../../App"
import Cell from "./Cell"
export default {
  name: "io-table",
  components: { Cell, AppElement },
  props: ["data"]
}
</script>
