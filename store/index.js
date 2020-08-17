import api from '@/services/api'

export const state = () => ({
  agenda: [],
})

export const mutations = {
  UPDATE_AGENDA(state, agenda) {
    state.agenda = agenda
  },
  ADD_TASK(state, task) {
    state.agenda.push(task)
  },
  EDIT_TASK(state, task) {
    const index = state.agenda.findIndex((f) => f.id === task.id)
    state.agenda.splice(index, 1, task)
  },
  DELETE_TASK(state, taskId) {
    const index = state.agenda.findIndex((f) => f.id === taskId)
    state.agenda.splice(index, 1)
  },
}

export const actions = {
  async loadAgenda({ commit }) {
    const { data: agenda } = await api.get('agenda')
    commit('UPDATE_AGENDA', agenda || [])
  },

  async createTask({ commit }, task) {
    const { data: newTask } = await api.post('agenda', task)
    commit('ADD_TASK', newTask)
  },

  async editTask({ commit }, task) {
    const { data: editedTask } = await api.put(`agenda/${task.id}`, {
      name: task.name,
      place: task.place,
      datetime: task.datetime,
    })
    commit('EDIT_TASK', { ...editedTask })
  },

  async deleteTask({ commit }, task) {
    await api.delete(`agenda/${task.id}`)
    commit('DELETE_TASK', task.id)
  },
}
