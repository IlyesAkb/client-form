<template>
  <div class="input">
    <input
        :id="id"
        type="text"
        v-model="value"
        @input="$emit('input', $event.target.value)"
        :class="{invalid: isInvalid, notEmpty: !!value}"
    />
    <label :for="id" :class="{notEmpty: !!value}">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    label: String,
    isInvalid: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    value: '',
  })
}
</script>

<style lang="sass" scoped>
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
