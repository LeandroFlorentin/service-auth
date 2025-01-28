export function responseStructure(status: number, message: string, data: any) {
  return {
    status,
    message,
    data,
  };
}
