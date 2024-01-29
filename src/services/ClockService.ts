import { ClockOptions } from '../commands/slash-commands/clock/types.js'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc
} from 'firebase/firestore'
import ServerService from './ServerService.js'

async function saveClock({ discordGuildId, ...restOptions }: ClockOptions) {
  await addDoc(
    collection(
      (
        await ServerService.findOrSaveServer(discordGuildId)
      ).ref,
      'clocks'
    ),
    {
      ...restOptions,
      discordGuildId,
      progress: 0
    }
  )
}

async function getClocks(discordGuildId: string): Promise<ClockOptions[]> {
  const clocksRef = collection(
    (await ServerService.findOrSaveServer(discordGuildId)).ref,
    'clocks'
  )
  const q = query(clocksRef, where('active', '==', true))
  const querySnapshot = await getDocs(q)
  const clocks = querySnapshot.docs.map((doc) => doc.data()) || []
  return clocks as ClockOptions[]
}

async function updateClock({
  discordGuildId,
  ...restOptions
}: Pick<ClockOptions, 'name' | 'progress' | 'discordGuildId'> & {
  active?: boolean
}) {
  const clocksRef = collection(
    (await ServerService.findOrSaveServer(discordGuildId)).ref,
    'clocks'
  )
  const q = query(clocksRef, where('name', '==', restOptions.name))
  const querySnapshot = await getDocs(q)
  const clockRef = querySnapshot.docs[0].ref
  await updateDoc(clockRef, restOptions)
}

export default {
  updateClock,
  saveClock,
  getClocks
}
