import supabase from '../supabase'
import { Clock, ClockCreateParams, ClockUpdateParams } from '../types'

async function create(clockParams: ClockCreateParams) {
  const { data, error } = await supabase
    .from('clocks')
    .insert(clockParams)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

async function getActiveClocks(campaign_id: string) {
  const { data, error } = await supabase
    .from('clocks')
    .select()
    .eq('campaign_id', campaign_id)
    .eq('active', true)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

async function getClock({
  campaign_id,
  name
}: Pick<Clock, 'name' | 'campaign_id'>) {

  const { data, error } = await supabase
    .from('clocks')
    .select()
    .eq('campaign_id', campaign_id)
    .eq('name', name)
    .limit(1)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

async function updateClock(options: ClockUpdateParams & Pick<Clock, 'name' | 'campaign_id'>) {
  const { data, error } = await supabase
    .from('clocks')
    .update(options)
    .eq('campaign_id', options.campaign_id)
    .eq('name', options.name)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export default {
  updateClock,
  getClock,
  create,
  getActiveClocks
}
