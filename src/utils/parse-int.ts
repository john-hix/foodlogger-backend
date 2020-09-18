export function parseIntWithDefault(str: string | undefined, base: number, defaultNum: number) {
    if (str) {
      const parsed = parseInt(str, base);
      if (!isNaN(parsed)) {
        return parsed;
      }
    }
    return defaultNum;
  }
  