<template>
  <div class="counter">
    <h1>buyRecord</h1>
    <a v-link="{ path: '/index' }">Go to Index</a>
  </div>
</template>

<script>
export default {
  data () {
    return { count: 0 }
  },

  ready () {
    this.handle = setInterval(() => {
      this.count++
    }, 1000)
  },

  destroyed () {
    clearInterval(this.handle)
  }
}
</script>
