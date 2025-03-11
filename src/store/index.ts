import { createStore } from 'vuex';
import { Topic } from '../types';

interface State {
  topics: Topic[];
  loading: boolean;
}

export default createStore<State>({
  state: {
    topics: [
      {
        id: 1,
        title: '1. Interpretação de Textos',
        info: {
          aulas: '1193 | 10h 22m',
          exercicios: '181 | 79h 12m',
          materiais: '53 | 84h 03m'
        },
        subtopics: [
          {
            id: 11,
            title: 'Competência 01: Palavras, Imagem e Vida Social',
            info: {
              aulas: '523 | 48h 55m',
              exercicios: '62 | 28h 30m',
              materiais: '12 | 34h 55m'
            },
            content: [{ id: 111, title: '1.1 Vazio',}]
          },
          {
            id: 12,
            title: 'Competência de Texto - Contexto e Função',
            info: {
              aulas: '510 | 42h 34m',
              exercicios: '98 | 35h 54m',
              materiais: '29 | 29h 55m'
            },
            content: [{ id: 121, title: '1.2 Vazio',}]
          },
          {
            id: 13,
            title: 'Competência 07: Opiniões e Pontos de Vista',
            info: {
              aulas: '43 | 20h 34m',
              exercicios: '10 | 14h 12m',
              materiais: '05 | 34h 54m'
            },
            content: [
              { id: 131, title: '1.1 Linguagem Verbal e Não Verbal', info: { aulas: '62 | 05h 18m', exercicios: '55 | 08h 48m', materiais: '05 | 51h 55m' } },
              { id: 132, title: '1.2 Estratégias Empregadas na Construção do Texto', info: { aulas: '67 | 04h 48m', exercicios: '10 | 04h 12m', materiais: '05 | 04h 42m' } },
              { id: 133, title: '1.3 Voz Autoral, Crítica e Perspectiva do Eu Lírico', info: { aulas: '43 | 20h 34m', exercicios: '10 | 14h 12m', materiais: '05 | 34h 54m' } }
            ]
          },
          {
            id: 14,
            title: 'Competência 08: Diversidade Linguística',
            info: {
              aulas: '29 | 07h 15m',
              exercicios: '16 | 42h 27m',
              materiais: '03 | 52h 18m'
            },
            content: [[{ id: 141, title: '1.4 Vazio',}]]
          }
        ]
      },
      {
        id: 2,
        title: '2. Gramática',
        info: {
          aulas: '56 | 48h 41m',
          exercicios: '27 | 10h 45m',
          materiais: '10 | 10h 00m'
        },
        subtopics: [
          {
            id: 21,
            title: '2.1 Fonologia',
            info: {
              aulas: '67 | 01h 55m',
              exercicios: '04 | 51h 38m',
              materiais: '02 | 51h 34m'
            },
            content: [[{ id: 211, title: '2.1 Vazio',}]]
          },
          {
            id: 22,
            title: '2.2 Morfologia',
            info: {
              aulas: '54 | 20h 55m',
              exercicios: '06 | 52h 45m',
              materiais: '01 | 00h 48m'
            },
            content: [
              { 
                id: 221, 
                title: 'A. Estrutura e Formação das Palavras',
                content: [
                  { id: 2211, title: 'Estrutura e Formação das Palavras I', duration: '00:14:39' },
                  { id: 2212, title: 'Estrutura e Formação das Palavras II', duration: '00:14:00' },
                  { id: 2213, title: 'Estrutura e Formação das Palavras III', duration: '00:13:14' },
                  { id: 2214, title: 'Estrutura e Formação das Palavras IV: Um Passeio na Caminha', duration: '00:11:56' }
                ]
              },
              { id: 222, title: 'B. Classes de Palavras', info: { aulas: '27 | 04h 41m', exercicios: '01 | 40h 21m', materiais: '01 | 52h 55m' } }
            ]
          },
          {
            id: 23,
            title: '2.3 Sintaxe',
            info: {
              aulas: '48 | 07h 34m',
              exercicios: '16 | 04h 55m',
              materiais: '03 | 55h 27m'
            },
            content: [[{ id: 231, title: '2.3 Vazio',}]]
          }
        ]
      }
    ],
    loading: false
  },
  mutations: {
    setLoading(state, value: boolean) {
      state.loading = value;
    }
  },
  actions: {
    async fetchTopicContent({ commit }, topicId: number) {
      commit('setLoading', true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      commit('setLoading', false);
    }
  }
});