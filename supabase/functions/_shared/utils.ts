
// Convert a HTTP HEADER into a valid JS Object Key
// Ex: 'x-real-ip' ==> xRealIp
export const httpHeader2ObjectKey = (header: string) =>
  header.replace(/-./g, (v) => v[1].toUpperCase());
