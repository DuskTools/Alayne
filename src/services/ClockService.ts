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

async function create({ discordGuildId, ...restOptions }: ClockOptions) {
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

async function getClocks(discordGuildId: string) {
  const clocksRef = collection(
    (await ServerService.findOrSaveServer(discordGuildId)).ref,
    'clocks'
  )
  const q = query(clocksRef, where('active', '==', true))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs
}

async function getClock({
  discordGuildId,
  name
}: Pick<ClockOptions, 'name' | 'discordGuildId'>) {
  const clocksRef = collection(
    (await ServerService.findOrSaveServer(discordGuildId)).ref,
    'clocks'
  )
  const q = query(clocksRef, where('name', '==', name))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs[0]
}

async function updateClock({
  discordGuildId,
  ...restOptions
}: Pick<ClockOptions, 'name' | 'progress' | 'discordGuildId'> & {
  active?: boolean
}) {
  const clockRef = (await getClock({ discordGuildId, ...restOptions })).ref
  await updateDoc(clockRef, restOptions)
}

export default {
  updateClock,
  getClock,
  create,
  getClocks
}
