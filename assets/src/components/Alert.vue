<template>
<div class="alert alert-primary" role="alert">{{ msg }}</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
    props: {
    msg: String
  }
})
export default class Alert extends Vue {
    msg!: string
}

</script>