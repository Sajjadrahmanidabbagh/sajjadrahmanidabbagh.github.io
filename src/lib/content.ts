// True if a markdown body has real content (ignores HTML comments such as TODO notes).
export function hasBody(body?: string): boolean {
  return !!body && body.replace(/<!--[\s\S]*?-->/g, '').trim().length > 0;
}
