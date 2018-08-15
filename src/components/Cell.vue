<template lang="pug">
  td.cell
    button.btn(@click="strike" :class="getClasses")

</template>

<script>
export default {
  props: ['name'],
  data () {
    return {
      frozen: false,
      mark: ''
    }
  },
  methods: {
    strike(){
      if(!this.frozen){
        this.mark = this.$parent.activePlayer;
        this.frozen = true;
        Event.$emit('strike', this.name)
      }
    }
  },
  computed:{
    getClasses(){
      return {
        'not-active': this.mark != '',
        x: this.mark == 'X',
        o: this.mark == 'O',
      }
    }
  },
  created(){
    Event.$on('gameEnd', () => this.frozen = true)
    Event.$on('restart', () => {
      this.frozen = false;
      this.mark = '';
    })
  }
}
</script>

<style lang="scss">
  .cell {
    width: 33.33%;
  }

  .btn {
    width: 100%;
    height: 100%;

    border: 1px solid #000;
    cursor: pointer;
    transition: background-color 0.4s;

    &:hover {
      background-color: #34495e;
    }

    &.not-active {
      background-color: #ecf0f1;
      cursor: not-allowed;
      animation: pulse 1s;
    }

    &.x {
      position: relative;

      &:before{
        content: "";
        position: absolute;
        width: 75%;
        height: 20%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotateZ(45deg);
        background: #000;
      }
      &:after{
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotateZ(45deg);
        width: 20%;
        height: 75%;
        background-color: #000;
      }
    }
    &.o {
      position: relative;

      &:before{
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        width: 75%;
        height: 75%;
        background: #1abc9c;
      }

      &:after{
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        width: 50%;
        height: 50%;
        background-color: #ecf0f1;
      }
    }
  }

@keyframes pulse {
    from {
      transform: scale3d(1, 1, 1);
    }

    50% {
      transform: scale3d(1.1, 1.1, 1.1);
    }

    to {
      transform: scale3d(1, 1, 1);
    }
}

</style>
