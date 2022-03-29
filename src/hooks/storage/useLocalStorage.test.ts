import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import useLocalStorage from "./useLocalStorage";

test("should increment counter", () => {
  const { result } = renderHook(() => useLocalStorage("name", "John"));

  act(() => {
    result.current[1]("Jane");
  });

  expect(JSON.parse(localStorage.getItem("name") as string)).toBe("Jane");

  // act(() => {
  //   result.current[2]();
  // })

  // expect(result.current[0]).toBe(undefined);
});
