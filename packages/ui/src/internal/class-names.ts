export function classNames(
  ...values: readonly (string | false | null | undefined)[]
): string {
  return values.filter((value) => typeof value === "string").join(" ");
}
