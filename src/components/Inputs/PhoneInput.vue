<template>
  <div class="input">
    <input type="text" class="invisible" @input="inputHandler">
    <input
      type="tel"
      :id="id"
      :class="{invalid: isInvalid}"
      v-model="value"
      @input="$emit('input', $event.target.value)"
    >
    <label :for="id" :class="{notEmpty: !!this.value}">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'PhoneInput',
  props: {
    id: {
      required: true,
      type: String
    },
    label: {
      type: String,
      default: 'Номер телефона'
    },
    isInvalid: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    value: '',
    prefix: '+7',
    number: ''
  }),
  computed: {
    phoneFormat() {
      if (this.value) {
        return this.prefix + this.value
      }
    }
  },
  methods: {
    inputHandler(event) {
      if (event.target.value.length < 11) {
        this.number = event.target.value
        this.value = this.prefix + this.number
        this.$emit('input', this.value)
      } else {
        event.target.value = this.number
      }
    }
  },
  mounted() {
    this.value = this.prefix + this.number
  }
}
</script>

<style lang="sass" scoped>
.invisible
  height: 100%
  width: 100%
  opacity: 0
  z-index: 90
  position: absolute

  &:focus ~ input
    border-bottom-color: $select-color

.input
  position: relative
  height: 50px
  display: flex
  align-items: flex-end

  & label
    margin-right: 1rem
    position: absolute
    left: 10px
    bottom: 5px
    transition: all .3s

    &.notEmpty
      font-size: 10px
      transform: translateY(-30px)

  & input
    border: none
    border-bottom: 1px solid black
    outline: none
    padding: 5px 1rem
    width: 100%
    line-height: 30px
    font-family: Avenir, Helvetica, Arial, sans-serif

    &:focus
      border-color: $select-color

      & ~ label
        font-size: 10px
        transform: translateY(-30px)
        color: $select-color

    &.invalid
      border-color: red

  & input[type="date"]
    font-size: 0
    transition: font-size .3s
    width: 100%

    &:focus
      font-size: 14px

    &.notEmpty
      font-size: 14px
</style>