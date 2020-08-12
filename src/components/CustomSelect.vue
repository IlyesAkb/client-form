<template>
  <div
    :class="{active: isActive, invalid: isInvalid}"
    class="select"
  >
    <div
      :value="value"
      @click="isActive = !isActive"
      class="select__value"
    >
      {{ current }}
      <div
        :class="{active: isActive || !isEmpty}"
        class="select__value-label"
      >
        {{ label }}
      </div>
    </div>
    <div class="select__dropdown" v-show="isActive" >
      <ul class="select__dropdown-body">
        <li
          v-for="item in options"
          @click="current = item"
          :class="{selected: isSelected(item.value)}"
          class="select__dropdown-body-item"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
    <div class="select__backdrop" v-show="isActive" @click="isActive = false"></div>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: 'Выберете значение'
    },
    isInvalid: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: this.$props.multiple ? [] : null,
      isActive: false,
    }
  },
  computed: {
    current: {
      get() {
        if (Array.isArray(this.value)) {
          const current = this.value.map(v => {
            const option = this.$props.options.find(o => o.value === v)
            return option.text
          })
          return current.join(', ')
        } else {
          const current = this.$props.options.find(option => option.value === this.value)
          return current ? current.text : ''
        }
      },
      set(option) {
        if (Array.isArray(this.value)) {
          if (this.value.includes(option.value)) {
            this.value = this.value.filter(v => v !== option.value)
          } else {
            this.value.push(option.value)
          }
        } else {
          if (this.value === option.value) {
            this.value = null
          } else {
            this.value = option.value
          }
          this.isActive = false
        }
        this.$emit('input', this.value)
      }
    },
    isEmpty() {
      if (Array.isArray(this.value) && !this.value.length) {
        return true
      } else {
        return !this.value
      }
    }
  },
  methods: {
    isSelected(value) {
      if (Array.isArray(this.value)) {
        return this.value.includes(value)
      } else {
        return this.value === value
      }
    }
  },
}
</script>

<style lang="sass" scoped>
.select
  height: $input-height
  width: 100%
  border-bottom: 1px solid black
  cursor: pointer
  user-select: none

  &.invalid
    border-bottom-color: red

  &:hover, &.active
    border-bottom-color: $select-color

    & .select__value, .select__value-label
      color: $select-color

  &__backdrop
    position: fixed
    top: 0
    left: 0
    height: 100%
    width: 100%
    opacity: 1
    z-index: 95

  &__value
    height: 100%
    line-height: $input-height
    padding: 0 1rem
    position: relative

    &-label
      position: absolute
      left: 10px
      transition: all .3s
      line-height: 16px
      bottom: 1rem

      &.active
        transform: translateY(-20px)
        font-size: 10px

  &__dropdown
    position: relative
    width: 100%

    &-body
      position: absolute
      left: 0
      right: 0
      background: white
      z-index: 99
      -webkit-box-shadow: 0 2px 19px -2px rgba(0,0,0,0.75)
      -moz-box-shadow: 0 2px 19px -2px rgba(0,0,0,0.75)
      box-shadow: 0 2px 19px -2px rgba(0,0,0,0.75)
      max-height: 200px
      overflow: scroll

      &-item
        padding: 10px 1rem
        cursor: pointer

        &:hover, &.selected
          background-color: lightgray
</style>