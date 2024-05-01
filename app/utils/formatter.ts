function toLowerKebabCase(text: string) {
  return text.replaceAll(' ', '-').toLowerCase();
}

function idGenerator() {
  return Math.random().toString(36).substring(2, 8);
}

export { toLowerKebabCase, idGenerator };
