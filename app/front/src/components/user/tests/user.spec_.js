import { shallowMount } from '@vue/test-utils'
import User from '../User'

describe('User', () => {
 
  test('User é uma instancia Vue', () => {
      const wrapper = shallowMount(User)
      expect(wrapper.isVueInstance()).toBeTruthy()
  })

})