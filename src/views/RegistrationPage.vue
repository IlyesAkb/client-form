<template>
  <div>
    <div class="success" v-if="success">
      <h2>Пользовтель успешно создан</h2>
    </div>
    <registration-form v-else @success="success = true" />
  </div>
</template>

<script>
import RegistrationForm from '@/components/Forms/RegistrationForm'

export default {
  name: 'RegistrationPage',
  components: {
    'registration-form': RegistrationForm,
  },
  data: () => ({
    success: false,
  })
}
</script>

<style scoped lang="sass">
.success
  height: 100%
  text-align: center
</style>