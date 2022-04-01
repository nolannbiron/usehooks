import { UAParser } from "ua-parser-js";

const useUserAgent = (agent: string): boolean => {
  const parser = new UAParser(window.navigator.userAgent);
  const { type } = parser.getDevice();

  return type === agent;
};

export default useUserAgent;
