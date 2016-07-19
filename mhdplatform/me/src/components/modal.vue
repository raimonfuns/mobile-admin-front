<template>
	<div class="modal-mask" v-show="show" @click="close" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container" v-bind:style="{'width': width ? width + 'px' : '400px'}" @click.stop>

        <div class="modal-header">
          <slot name="header">
            default header
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            default body
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            default footer
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var vm;
export default {
  ready () {
    vm = this;
  },

	props: ['show', 'close', 'width']
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 99998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 10px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  border-radius: 10px;
}

.modal-header {
  padding: 0;
  color: #3BBA81;
  border-bottom: 1px solid #ddd;
}

.modal-body {
  padding: 0;
  margin: 10px 0;
}

.modal-footer {
  text-align: center;
}

.modal-footer button {
  /*margin-left: 5px;*/
}

/*
 * the following styles are auto-applied to elements with
 * v-transition="modal" when their visiblity is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
