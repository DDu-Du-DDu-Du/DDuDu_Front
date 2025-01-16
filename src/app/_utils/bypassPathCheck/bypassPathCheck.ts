const createRegexFromPattern = (pattern: string) => {
  const regexString = pattern.replace(/\*/g, ".*");
  return new RegExp(`^${regexString}$`);
};

const bypassPathCheck = (bypassPaths: string[], currentPath: string) => {
  return bypassPaths.some((path) => createRegexFromPattern(path).test(currentPath));
};

export default bypassPathCheck;
