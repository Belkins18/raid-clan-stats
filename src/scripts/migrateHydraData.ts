import { createClient } from '@supabase/supabase-js'

import { hydraStatisticsData } from '../data'

// bun run src/scripts/migrateHydraData.ts

const supabaseUrl = process.env.VITE_SUPABASE_URL?.trim()
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL in environment')
}

if (!serviceRoleKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY in environment')
}

validateServiceRoleKey(serviceRoleKey)

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
})

async function migrateHydraData() {
  console.log('Starting migration...')
  let hasErrors = false

  for (const rotation of hydraStatisticsData) {
    const { data: existingRotation, error: fetchError } = await supabase
      .from('hydra_statistics')
      .select('id')
      .eq('id', rotation.id)
      .maybeSingle()

    if (fetchError) {
      hasErrors = true
      console.error(`Error checking rotation ${rotation.id}:`, fetchError)
      continue
    }

    if (!existingRotation) {
      const { error: statError } = await supabase.from('hydra_statistics').insert([{ id: rotation.id }])

      if (statError) {
        hasErrors = true
        console.error(`Error inserting rotation ${rotation.id}:`, statError)
        continue
      }

      console.log(`Created rotation ${rotation.id}`)
    } else {
      console.log(`Rotation ${rotation.id} already exists, skipping creation`)
    }

    const { error: deleteError } = await supabase.from('hydra_user_statistics').delete().eq('hydra_id', rotation.id)

    if (deleteError) {
      hasErrors = true
      console.error(`Error deleting old users for ${rotation.id}:`, deleteError)
      continue
    }

    const rows = rotation.data.map((user) => ({
      hydra_id: rotation.id,
      name: user.name,
      normal: user.Normal,
      hard: user.Hard,
      brutal: user.Brutal,
      nightmare: user.Nightmare,
      key_used: user.keyUsed
    }))

    const { error: usersError } = await supabase.from('hydra_user_statistics').insert(rows)

    if (usersError) {
      hasErrors = true
      console.error(`Error inserting users for ${rotation.id}:`, usersError)
    } else {
      console.log(`Added ${rows.length} users for period ${rotation.id}`)
    }
  }

  if (hasErrors) {
    throw new Error('Migration finished with errors')
  }

  console.log('Migration complete!')
}

migrateHydraData()

function validateServiceRoleKey(key: string) {
  const parts = key.split('.')

  if (parts.length !== 3) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY must be the legacy service_role JWT key from Supabase Project Settings > API')
  }

  const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8')) as { role?: string }

  if (payload.role !== 'service_role') {
    throw new Error(`SUPABASE_SERVICE_ROLE_KEY must have role=service_role, received role=${payload.role ?? 'missing'}`)
  }
}
