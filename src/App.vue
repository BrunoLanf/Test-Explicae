<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AccordionList from './components/AccordionList.vue'

const currentTime = ref('')
let timeInterval: number | null = null

const updateTime = () => {
  const now = new Date()
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }
  currentTime.value = new Intl.DateTimeFormat('pt-BR', options).format(now)
}

onMounted(() => {
  updateTime()
  timeInterval = window.setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<template>
  <div class="app">
    <header class="header">
      <div class="header__content">
        <div class="header__top">
          <img class="header__logo" src="\imgs\logo_explicae.png" ref="Logo Explicaê"/>
        </div>
        <div class="header__bottom">
          <span class="header__breadcrumb">
            Cadernos / <span class="header__subject">Língua Portuguesa</span>
          </span>
          <span class="header__time">{{ currentTime }}</span>
        </div>
      </div>
    </header>
    <main class="main">
      <AccordionList />
    </main>
  </div>
</template>

<style lang="scss">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f1f3f5;
  overflow-x: hidden;
}

.header {
  position: sticky;
  top: 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 100%;

  &__content {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-sizing: border-box;
  }

  &__top {
    display: flex;
    align-items: center;
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__logo {
    width: 150px;
  }

  &__breadcrumb {
    color: #495057;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }

  &__subject {
    border-bottom: 2px solid #9c36b5;
    padding-bottom: 2px;
    font-weight: 800;
  }

  &__time {
    color: #868e96;
    font-size: 14px;
    font-weight: 500;
  }
}

.main {
  flex: 1;
  padding: 24px 16px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px 12px;
  }
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: #f1f3f5;
  color: #495057;
}

* {
  box-sizing: border-box;
}

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Nunito:wght@700&display=swap');
</style>