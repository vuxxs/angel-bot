export function filterUserId(userId: String) {
  return userId.replace(/[<@!>]/g, "");
}
