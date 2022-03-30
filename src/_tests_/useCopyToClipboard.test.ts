import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { useSessionStorage } from "../hooks/storage";
import { useCopyToClipboard } from "../hooks/utils";

test("should increment counter", () => {
  const { result } = renderHook(() => useCopyToClipboard());

  act(() => {
    result.current[1]("John");
  });

  expect(result.current[0]).toBe("John");
  expect(navigator.clipboard.readText()).toBe("John");
});
