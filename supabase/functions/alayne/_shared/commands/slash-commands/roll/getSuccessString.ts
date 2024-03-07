import { BladesRollType } from "./constants.ts"

export const getSuccessString = (type: BladesRollType): string[] => {
  const responseArray = []
  switch (type) {
    case "critical":
      responseArray.push("__**Critical Success**__")
      responseArray.push("*Things go better than expected*")
      break
    case "success":
      responseArray.push("__**Success**__")
      responseArray.push("*Things go well*")
      break
    case "partial":
      responseArray.push("__**Partial Success**__")
      responseArray.push("*Things go well, but not perfectly*")
      break
    case "failure":
      responseArray.push("__**Failure**__")
      responseArray.push("*Things go poorly*")
      break
  }

  return responseArray
}
