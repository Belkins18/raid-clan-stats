import { hydraStatisticsData } from '../data'
import supabase from '../lib/supabaseClient'

async function migrateHydraData() {
  console.log('🚀 Starting migration...')

  for (const rotation of hydraStatisticsData) {
    const { error: statError } = await supabase.from('hydra_statistics').insert([{ id: rotation.id }])

    if (statError && statError.code !== '23505') {
      console.error(`❌ Error inserting period ${rotation.id}:`, statError)
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
      console.error(`❌ Error inserting users for ${rotation.id}:`, usersError)
    } else {
      console.log(`✅ Added ${rows.length} users for period ${rotation.id}`)
    }
  }

  console.log('🎉 Migration complete!')
}

migrateHydraData()

// bun run src/scripts/migrateHydraData.ts
