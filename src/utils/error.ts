export function errorStructure(status: number, message: string, name: string) {
  return {
    status,
    message,
    name,
  };
}
