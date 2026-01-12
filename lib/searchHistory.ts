let previousPath: string | null = null;

export function setSearchOrigin(path: string) {
  if (!previousPath) {
    previousPath = path;
  }
}

export function consumeSearchOrigin() {
  const path = previousPath;
  previousPath = null;
  return path;
}
