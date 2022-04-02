import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { useSessionStorage } from "../hooks/storage";
import { useCopyToClipboard } from "../hooks/utils";

test("should increment counter", () => {
  const { result } = renderHook(() => useCopyToClipboard());

  Object.assign(window.navigator, {
    clipboard: {
      writeText: jest.fn().mockImplementation(() => Promise.resolve()),
    },
  });

  act(() => {
    result.current[1]("John");
  });

  expect(result.current[0]).toBe(false);
  expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith("John");
});
