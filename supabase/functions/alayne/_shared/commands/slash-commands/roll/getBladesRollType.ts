import { RollResult } from "npm:randsum"
import { BladesRollType } from "./constants.ts"

export const getBladesRollType = (
  result: RollResult<number>,
  quantity: number,
): BladesRollType => {
  if (result.total === 6) {
    const isCritical = result.initialRolls.filter((roll) =>
      roll === 6
    ).length >= 2
    if (isCritical && quantity > 0) {
      return "critical"
    }
    return "success"
  }
  if (result.total === 4 || result.total === 5) {
    return "partial"
  }
  return "failure"
}
