export const getColor = (progress: number, segment: number) => {
  const ratio = progress / segment

  switch (true) {
    case ratio < 0.25:
      return 0x000000
    case ratio < 0.5:
      return 0x00ff00
    case ratio < 0.75:
      return 0xcaffca
    case ratio < 1:
      return 0xff0000
    default:
      return 0x000000
  }
}
