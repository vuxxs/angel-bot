export function filterUserId(userId: string) {
  return userId.replace(/[<@!>]/g, "");
}
