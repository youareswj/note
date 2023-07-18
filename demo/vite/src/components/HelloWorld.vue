<script setup lang="ts">
import { ref,getCurrentInstance } from 'vue'
import { ComponentInternalInstance,Ref} from '@vue/runtime-core'

defineProps<{
  msg: string
}>()

const ctx:ComponentInternalInstance | null = getCurrentInstance();
console.log(ctx)

let count = ref(0)
const btnClick: Function = (n:number):void =>{
  n++
  // count.value++
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="btnClick(count)">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
