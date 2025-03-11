<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const expandedTopics = ref<number[]>([]);
const expandedSubtopics = ref<number[]>([]);
const expandedItems = ref<number[]>([]);

const toggleTopic = (topicId: number) => {
  const index = expandedTopics.value.indexOf(topicId);
  if (index === -1) {
    expandedTopics.value.push(topicId);
  } else {
    expandedTopics.value.splice(index, 1);
  }
};

const toggleSubtopic = async (subtopicId: number) => {
  const index = expandedSubtopics.value.indexOf(subtopicId);
  if (index === -1) {
    expandedSubtopics.value.push(subtopicId);
    await store.dispatch('fetchTopicContent', subtopicId);
  } else {
    expandedSubtopics.value.splice(index, 1);
  }
};

const toggleItem = (itemId: number) => {
  const index = expandedItems.value.indexOf(itemId);
  if (index === -1) {
    expandedItems.value.push(itemId);
  } else {
    expandedItems.value.splice(index, 1);
  }
};

const isTopicExpanded = (topicId: number) => expandedTopics.value.includes(topicId);
const isSubtopicExpanded = (subtopicId: number) => expandedSubtopics.value.includes(subtopicId);
const isItemExpanded = (itemId: number) => expandedItems.value.includes(itemId);

const formatInfo = (info: string) => {
  const [count, time] = info.split('|').map(part => part.trim());
  return `<strong>${count}</strong> | <strong>${time}</strong>`;
};
</script>

<template>
  <div class="accordion">
    <div v-for="topic in store.state.topics" :key="topic.id" class="accordion__topic">
      <div 
        class="accordion__header" 
        :class="{ 'accordion__header--expanded': isTopicExpanded(topic.id) }" 
        @click="toggleTopic(topic.id)"
      >
        <span class="accordion__icon">{{ isTopicExpanded(topic.id) ? '-' : '+' }}</span>
        <div class="accordion__content">
          <span class="accordion__title">{{ topic.title }}</span>
          <div class="accordion__info">
            <span class="accordion__stat">Aulas:  <span v-html="formatInfo(topic.info.aulas)"></span></span>
            <span class="accordion__stat">Exercícios:  <span v-html="formatInfo(topic.info.exercicios)"></span></span>
            <span class="accordion__stat">Materiais:  <span v-html="formatInfo(topic.info.materiais)"></span></span>
          </div>
        </div>
      </div>
      <div v-if="isTopicExpanded(topic.id)" class="accordion__subtopics">
        <div v-for="subtopic in topic.subtopics" :key="subtopic.id" class="accordion__subtopic">
          <div 
            class="accordion__header accordion__header--sub" 
            :class="{ 'accordion__header--expanded': isSubtopicExpanded(subtopic.id) }" 
            @click="toggleSubtopic(subtopic.id)"
          >
            <span class="accordion__icon">{{ isSubtopicExpanded(subtopic.id) ? '-' : '+' }}</span>
            <div class="accordion__content">
              <span class="accordion__title">{{ subtopic.title }}</span>
              <div class="accordion__info">
                <span class="accordion__stat">Aulas: <span v-html="formatInfo(subtopic.info.aulas)"></span></span>
                <span class="accordion__stat">Exercícios: <span v-html="formatInfo(subtopic.info.exercicios)"></span></span>
                <span class="accordion__stat">Materiais: <span v-html="formatInfo(subtopic.info.materiais)"></span></span>
              </div>
            </div>
          </div>
          <div v-if="isSubtopicExpanded(subtopic.id)" class="accordion__content-wrapper">
            <div v-if="store.state.loading" class="accordion__loading">Carregando...</div>
            <div v-else-if="subtopic.content.length > 0" class="accordion__items">
              <template v-for="item in subtopic.content" :key="item.id">
                <div 
                  v-if="item.content" 
                  class="accordion__group"
                >
                  <div 
                    class="accordion__group-header" 
                    @click="toggleItem(item.id)"
                    :class="{ 'accordion__group-header--expanded': isItemExpanded(item.id) }"
                  >
                    <span class="accordion__icon">{{ isItemExpanded(item.id) ? '-' : '+' }}</span>
                    {{ item.title }}
                  </div>
                  <div v-if="isItemExpanded(item.id)" class="accordion__group-content">
                    <div class="accordion__theory">
                      <div class="accordion__theory-header">TEORIA + QUESTÕES ORIENTADAS</div>
                      <div v-for="subItem in item.content" :key="subItem.id" class="accordion__theory-item">
                        <span class="accordion__checkbox"></span>
                        <span class="accordion__title">{{ subItem.title }}</span>
                        <span class="accordion__duration">{{ subItem.duration }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div 
                  v-else 
                  class="accordion__item"
                >
                  <div class="accordion__content">
                    <span class="accordion__title">{{ item.title }}</span>
                    <div v-if="item.info" class="accordion__info">
                      <span class="accordion__stat">Aulas: <span v-html="formatInfo(item.info.aulas)"></span></span>
                      <span class="accordion__stat">Exercícios: <span v-html="formatInfo(item.info.exercicios)"></span></span>
                      <span class="accordion__stat">Materiais: <span v-html="formatInfo(item.info.materiais)"></span></span>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.accordion {
  width: 100%;
  font-family: 'Inter', sans-serif;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &__topic {
    margin-bottom: 1px;
  }

  &__header {
    background-color: white;
    padding: 16px 20px;
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    transition: all 0.2s ease;
    border-bottom: 1px solid #e9ecef;

    &:hover {
      background-color: #f8f9fa;
    }

    &--expanded {
      background-color: #f3e5f5;
      color: #9c36b5;

      .accordion__title {
        color: #9c36b5;
      }
    }

    &--sub {
      &.accordion__header--expanded {
        background-color: #f3e5f5;
        
        .accordion__title {
          color: #9c36b5;
        }
      }
    }

    @media (max-width: 768px) {
      padding: 12px 16px;
    }
  }

  &__icon {
    margin-right: 16px;
    font-weight: 600;
    font-size: 18px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9c36b5;
    background-color: #f3e5f5;
    border-radius: 4px;
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__title {
    font-size: 15px;
    color: #495057;
    font-weight: 500;
    display: block;
    transition: color 0.2s ease;
  }

  &__info {
    display: flex;
    align-items: center;
    gap: 24px;
    font-size: 13px;
    color: #495057;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      gap: 12px;
      font-size: 11px;
    }
  }

  &__stat {
    display: flex;
    align-items: center;
    font-weight: 400;
    white-space: nowrap;
    
    :deep(strong) {
      font-weight: 600;
    }
  }

  &__subtopics {
    background-color: #f1f3f5;
    padding: 8px 0 8px 40px;

    @media (max-width: 768px) {
      padding: 8px 0 8px 20px;
    }
  }

  &__content-wrapper {
    background-color: white;
  }

  &__item {
    padding: 16px 20px;
    color: #495057;
    font-size: 14px;
    border-bottom: 1px solid #e9ecef;
    background-color: white;

    @media (max-width: 768px) {
      padding: 12px 16px;
    }
  }

  &__loading {
    padding: 16px 20px;
    color: #868e96;
    font-style: italic;
  }

  &__group {
    margin: 8px 20px;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #e9ecef;
    background-color: white;

    @media (max-width: 768px) {
      margin: 8px 12px;
    }
  }

  &__group-header {
    padding: 16px 20px;
    background-color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #495057;
    font-weight: 500;
    border-bottom: 1px solid #e9ecef;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f8f9fa;
    }

    &--expanded {
      background-color: #f3e5f5;
      color: #9c36b5;
    }

    @media (max-width: 768px) {
      padding: 12px 16px;
    }
  }

  &__theory {
    padding: 20px;
    background-color: #f8f9fa;

    @media (max-width: 768px) {
      padding: 16px;
    }
  }

  &__theory-header {
    font-size: 13px;
    font-weight: 600;
    color: #495057;
    margin-bottom: 16px;
    letter-spacing: 0.5px;
  }

  &__theory-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    font-size: 14px;
    color: #495057;
  }

  &__checkbox {
    width: 18px;
    height: 18px;
    border: 2px solid #9c36b5;
    border-radius: 4px;
    margin-right: 16px;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f3e5f5;
    }
  }

  &__duration {
    color: #868e96;
    font-size: 13px;
    font-weight: 500;
    margin-left: auto;
  }
}
</style>