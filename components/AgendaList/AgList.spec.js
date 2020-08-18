import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as store from '@/store'
import AgNewTask from '@/components/AgendaNewTask/AgNewTask.vue'
import AgTask from '@/components/AgendaTask/AgTask.vue'
import AgList from './AgList.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AgTask component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AgList, {
      localVue,
      propsData: {
        isOpen: false,
      },
      store: new Vuex.Store(store),
      mocks: ['AgNewTask', 'AgTask'],
      components: {
        AgNewTask,
        AgTask,
      },
    })
  })

  it('should be empty when agenda is empty', () => {
    expect(wrapper.find('.list__container__wrap').html()).toMatch(/ag-new-task/)
  })
})
