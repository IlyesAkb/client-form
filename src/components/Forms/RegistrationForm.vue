<template>
  <form class="form" @submit.prevent="submit">

    <h1 class="form__title">Регистрация</h1>

    <div class="form__control">
      <text-input
        label="Имя*"
        id="firstName"
        v-model="$v.firstName.$model"
        :is-invalid="$v.firstName.$invalid && $v.firstName.$dirty"
      />
      <div class="form__error" v-if="!$v.firstName.required && $v.firstName.$dirty">
        {{ errors.required }}
      </div>
    </div>

    <div class="form__control">
      <text-input
        label="Фамилия*"
        id="lastName"
        v-model="$v.lastName.$model"
        :is-invalid="$v.lastName.$invalid && $v.lastName.$dirty"
      />
      <div class="form__error" v-if="!$v.lastName.required && $v.lastName.$dirty">
        {{ errors.required }}
      </div>
    </div>

    <div class="form__control">
      <text-input label="Отчество" id="secondName" v-model="secondName"/>
    </div>

    <div class="form__control">
      <date-input
        label="Дата рождения*"
        :is-invalid="$v.birthDate.$invalid && $v.birthDate.$dirty"
        v-model="$v.birthDate.$model"
        id="birthDate"
      />
      <div class="form__error" v-if="!$v.birthDate.maxValue">
        {{ errors.wrongDate }}
      </div>
      <div class="form__error" v-else-if="!$v.birthDate.required && $v.birthDate.$dirty">
        Это поле обязательно для заполенния
      </div>
    </div>

    <div class="form__control">
      <phone-input
        id="phone"
        label="Номер телефона*"
        :is-invalid="$v.phone.$invalid && $v.phone.$dirty"
        v-model="$v.phone.$model"
      />
      <div class="form__error" v-if="$v.phone.$invalid && $v.phone.$dirty">
        {{ errors.required }}
      </div>
    </div>

    <div class="form__control">
      <custom-select
        :options="options.sex"
        label="Пол"
        v-model="sex"
      />
    </div>

    <div class="form__control">
      <custom-select
        :options="options.clientType"
        label="Группа клиентов*"
        multiple
        v-model="$v.clientGroup.$model"
        :is-invalid="$v.clientGroup.$invalid && $v.clientGroup.$dirty"
      />
      <div class="form__error" v-show="$v.clientGroup.$invalid && $v.clientGroup.$dirty">
        {{ errors.required }}
      </div>
    </div>

    <div class="form__control">
      <custom-select
        :options="options.doctor"
        label="Лечаший врач"
        v-model="doctor"
      />
    </div>

    <div class="form__control">
      <input type="checkbox" id="sms" v-model="sms">
      <label for="sms">Не отпарвлять СМС</label>
    </div>

    <h3>Адрес</h3>

    <div class="form__control">
      <text-input id="index" label="Индекс" v-model="address.index"/>
    </div>

    <div class="form__control">
      <text-input id="country" label="Страна" v-model="address.country"/>
    </div>

    <div class="form__control">
      <text-input id="state" label="Область" v-model="address.state"/>
    </div>

    <div class="form__control">
      <text-input
        id="city"
        label="Город*"
        v-model="$v.address.city.$model"
        :is-invalid="$v.address.city.$invalid && $v.address.city.$dirty"
      />
      <div class="form__error" v-show="$v.address.city.$invalid && $v.address.city.$dirty">
        Это поле обязательно для заполнения
      </div>
    </div>

    <div class="form__control">
      <text-input id="street" label="Улица" v-model="address.street"/>
    </div>

    <div class="form__control">
      <text-input id="Home" label="Дом" v-model="address.home"/>
    </div>

    <h3>Паспорт</h3>

    <div class="form__control">
      <custom-select
        :options="options.document"
        :is-invalid="$v.passport.documentType.$invalid && $v.passport.documentType.$dirty"
        label="Тип документа*"
        v-model="$v.passport.documentType.$model"
      />
      <div
          class="form__error"
          v-show="$v.passport.documentType.$invalid && $v.passport.documentType.$dirty"
      >
        {{ errors.required }}
      </div>
    </div>

    <div class="form__control">
      <text-input id="series" label="Серия" v-model="passport.series"/>
    </div>

    <div class="form__control">
      <text-input id="number" label="Номер" v-model="passport.number"/>
    </div>

    <div class="form__control">
      <text-input id="passportOrganization" label="Кем выдан" v-model="passport.organization"/>
    </div>

    <div class="form__control">
      <date-input
        id="dateOfIssue"
        label="Дата выдачи*"
        :is-invalid="$v.passport.dateOfIssue.$invalid && $v.passport.dateOfIssue.$dirty"
        v-model="$v.passport.dateOfIssue.$model"
      />
      <div class="form__error" v-if="!$v.passport.dateOfIssue.maxValue">
        {{ errors.wrongDate }}
      </div>
      <div
        v-else-if="!$v.passport.dateOfIssue.required && $v.passport.dateOfIssue.$dirty"
        class="form__error"
      >
        {{ errors.required }}
      </div>
    </div>

    <button type="submit" class="form__btn">Зарегестрироваться</button>
    <div class="form__error" v-show="isInvalid">{{ errors.invalidForm }}</div>
  </form>
</template>

<script>
import TextInput from '@/components/Inputs/TextInput'
import DateInput from '@/components/Inputs/DateInput'
import PhoneInput from '@/components/Inputs/PhoneInput'
import CustomSelect from '@/components/CustomSelect'
import { required } from 'vuelidate/lib/validators'
import RegistrationOptions from '@/mixins/Registration'

export default {
  name: 'RegistrationForm',
  components: {
    'text-input': TextInput,
    'date-input': DateInput,
    'phone-input': PhoneInput,
    'custom-select': CustomSelect
  },
  mixins: [RegistrationOptions],
  data: () => ({
    isInvalid: false,
    firstName: '',
    lastName: '',
    secondName: '',
    birthDate: '',
    phone: '',
    sex: null,
    clientGroup: [],
    doctor: null,
    sms: false,
    address: {
      index: '',
      country: '',
      state: '',
      city: '',
      street: '',
      home: '',
    },
    passport: {
      documentType: null,
      series: '',
      number: '',
      organization: '',
      dateOfIssue: ''
    }
  }),
  validations: {
    firstName: { required },
    lastName: { required },
    birthDate: {
      required,
      maxValue: value => value < new Date().toISOString()
    },
    phone: {
      required: value => !!value.slice(2).length,
      maxValue: value => value.slice(1).length === 11
    },
    address: {
      city: { required }
    },
    passport: {
      documentType: { required },
      dateOfIssue: {
        required,
        maxValue: value => value < new Date().toISOString()
      }
    },
    clientGroup: {
      required: value => !!value.length
    },
    success: false
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.isInvalid = true
      } else {
        this.$emit('success')
      }
    }
  }
}

</script>

<style lang="sass" scoped>

.form
  width: 50%
  margin: 0 auto
  display: flex
  flex-direction: column
  justify-content: center
  box-sizing: border-box
  padding: 2rem
  border: 1px solid #ccc
  border-radius: 5px
  -webkit-box-shadow: 2px 14px 24px -13px rgba(0, 0, 0, 0.75)
  -moz-box-shadow: 2px 14px 24px -13px rgba(0, 0, 0, 0.75)
  box-shadow: 2px 14px 24px -13px rgba(0, 0, 0, 0.75)

  &__title
    text-align: center
    margin: 0 0 2rem 0

  &__control
    margin-bottom: 1rem

  &__error
    color: red
    font-size: 10px
    margin-top: 5px

  &__btn
    border: 1px solid $select-color
    color: $select-color
    background-color: white
    text-transform: uppercase
    text-align: center
    width: 100%
    padding: 1rem 0
    margin-top: 1rem
    cursor: pointer
    font-weight: bold
    transition: .3s
    outline: none

    &:hover
      color: white
      background: $select-color

@media (max-width: 1200px)
  .form
    width: 70%

@media (max-width: 992px)
  .form
    width: 80%

@media (max-width: 768px)
  .form
    width: 100%
    border: none
    box-shadow: none


</style>