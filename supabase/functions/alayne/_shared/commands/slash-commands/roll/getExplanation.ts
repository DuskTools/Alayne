export const getExplanation = (
  quantity: number,
  username: string,
): string[] => {
  const isZero = quantity === 0
  return [
    `${username} rolled ${isZero ? 2 : quantity} D6`,
    `and took the ${isZero ? "lowest" : "highest"} result`,
  ]
}
