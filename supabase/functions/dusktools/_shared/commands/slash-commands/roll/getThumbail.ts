import { BladesRollType } from "./constants.ts"

export const getThumbnail = (total: number, type: BladesRollType): string => {
  const root =
    "https://raw.githubusercontent.com/DuskTools/DuskFunctions/main/supabase/functions/_shared/assets/d6/"
  switch (total) {
    case 1:
      return `${root}one.png`
    case 2:
      return `${root}two.png`
    case 3:
      return `${root}three.png`
    case 4:
      return `${root}four.png`
    case 5:
      return `${root}five.png`
    case 6:
      if (type === "critical") {
        return `${root}double6.png`
      }
      return `${root}six.png`
  }
  throw new Error("Invalid total")
}
