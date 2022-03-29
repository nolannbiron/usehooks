import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { useAsync } from "../hooks/utils";
import { waitForDebugger } from "inspector";

test("useAsync", async() => {

    const asyncFn = () => new Promise((resolve, reject) => {
        resolve("Hello");
    });

  const { result } = renderHook(() => useAsync(asyncFn));

  await waitForDebugger(() => {
    expect(result.current.value).toBe("Hello");
  })

  // act(() => {
  //   result.current[2]();
  // })

  // expect(result.current[0]).toBe(undefined);
});
