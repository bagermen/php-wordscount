<template>
    <section class="container-md">
        Hello!
    </section>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";

import { computed } from 'vue'
import { useStore } from 'vuex'


@Options({
})
export default class Index extends Vue  {
    context = setup(() => {
        const store = useStore();
        return {
            loggedIn: computed(() => false),
        }
    })
}
</script>
