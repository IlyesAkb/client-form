<template>
  <div id="app">
    <registration-page />
  </div>
</template>

<script>
import RegistrationPage from '@/views/RegistrationPage'

export default {
  name: 'App',
  components: {
    'registration-page': RegistrationPage
  }
}
</script>

