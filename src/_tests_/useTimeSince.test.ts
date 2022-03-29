import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { useTimeSince } from "../hooks/utils";

test("useTimeSince", () => {
  const { result } = renderHook(() =>
    useTimeSince(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), true)
  );
  expect(result.current).toBe("1d");
});
