<template>
  <p><img alt="Vue logo" src="@/assets/logo.png"><br/> prop value: {{myprop}}</p>
</template>

<script>
export default {
  name: 'tag-demo',
  props: ['myprop']
}
</script>