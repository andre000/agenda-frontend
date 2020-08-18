import { shallowMount, createLocalVue } from '@vue/test-utils'
import AgNewTask from './AgNewTask.vue'

const localVue = createLocalVue()

describe('AgTask component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AgNewTask, {
      localVue,
      propsData: {
        isOpen: false,
      },
      mocks: ['PlusCircleIcon'],
    })
  })

  it('should show an plus icon when closed', () => {
    expect(wrapper.find('plus-circle-icon-stub').exists()).toBe(true)
  })

  it('should show input for a new task when new task is open', async () => {
    wrapper.setProps({
      isOpen: true,
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('input[type="date"]').exists()).toBe(true)
  })
})
