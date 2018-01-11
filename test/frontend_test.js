import App from '../client/src/app';
import React from 'react';
import { mount } from 'enzyme';

test('TodoComponent renders the text inside it', () => {
  const todo = { id: 1, done: false, name: 'Buy Milk' };
  const wrapper = mount(
    <Todo todo={todo} />
  );
  const p = wrapper.find('.toggle-todo');
  expect(p.text()).toBe('Buy Milk');
});
