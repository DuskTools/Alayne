import { doc, getDoc, setDoc } from 'firebase/firestore'
import { store } from '../firebase/index.js'

async function findOrCreate(discordGuildId: string) {
  const serverDocRef = doc(store, 'servers', discordGuildId)
  const serverDoc = await getDoc(serverDocRef)
  if (serverDoc.exists()) {
    return serverDoc
  }

  await setDoc(serverDocRef, {
    discordGuildId
  })

  const newServerDoc = await getDoc(serverDocRef)
  return newServerDoc
}

export default { findOrCreate }
