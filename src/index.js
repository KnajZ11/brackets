module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openBrackets = new Map(bracketsConfig);
  const closeBrackets = new Map(
    bracketsConfig.map(([open, close]) => [close, open])
  );
  const sameBrackets = new Set(
    bracketsConfig
      .filter(([open, close]) => open === close)
      .map(([open]) => open)
  );

  const strArray = str.split('');

  const isInvalid = strArray.some((char) => {
    // Handle identical brackets
    if (sameBrackets.has(char)) {
      if (stack.length > 0 && stack[stack.length - 1] === char) {
        stack.pop();
        return false;
      }
      stack.push(char);
      return false;
    }

    // Handle standard opening brackets
    if (openBrackets.has(char)) {
      stack.push(char);
      return false;
    }

    // Handle standard closing brackets
    if (closeBrackets.has(char)) {
      const lastOpen = stack.pop();
      return openBrackets.get(lastOpen) !== char;
    }

    return false;
  });

  return !isInvalid && stack.length === 0;
};
