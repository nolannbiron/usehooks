import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks'
import useSessionStorage from './useSessionStorage';

test('should increment counter', () => {
  const {result} = renderHook(() => useSessionStorage('name', 'John'));

  act(() => {
    result.current[1]('Jane');
  })

  expect(JSON.parse(sessionStorage.getItem('name') as string)).toBe('Jane');
})