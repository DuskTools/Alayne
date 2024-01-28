import { RollResult } from 'randsum'
import { BladesRollType } from './constants.js'

export const parseRolls = (
  result: RollResult<number>,
  bladesSuccess: BladesRollType
): string => {
  return result.initialRolls
    .map((roll, index, array) => {
      const isCritical = bladesSuccess === 'critical'
      const firstInstaceOfRoll = array.indexOf(roll) === index
      return roll === result.total && (isCritical || firstInstaceOfRoll)
        ? `**${roll}**`
        : `~~${roll}~~`
    })
    .join(', ')
}
