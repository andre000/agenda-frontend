import { shallowMount, createLocalVue } from '@vue/test-utils'
import AgTask from './AgTask.vue'

const mockTask = {
  id: 1,
  name: 'Teste 3',
  place: 'Botucatu',
  datetime: '1990-09-15 10:10:00',
}

const localVue = createLocalVue()

describe('AgTask component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AgTask, {
      localVue,
      propsData: {
        task: mockTask,
      },
    })
  })

  it('should show the day of given date', () => {
    expect(wrapper.find('.task__date').text()).toBe('15')
  })
})
