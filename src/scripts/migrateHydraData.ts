import { hydraStatisticsData } from '../data'
import supabase from '../lib/supabaseClient'

// bun run src/scripts/migrateHydraData.ts

async function migrateHydraData() {
  console.log('🚀 Starting migration...')

  for (const rotation of hydraStatisticsData) {
    // 1. Проверяем, есть ли такая ротация уже в базе
    const { data: existingRotation, error: fetchError } = await supabase
      .from('hydra_statistics')
      .select('id')
      .eq('id', rotation.id)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 = no rows found
      console.error(`❌ Error checking rotation ${rotation.id}:`, fetchError)
      continue
    }

    if (!existingRotation) {
      // Если нет — вставляем
      const { error: statError } = await supabase.from('hydra_statistics').insert([{ id: rotation.id }])

      if (statError) {
        console.error(`❌ Error inserting rotation ${rotation.id}:`, statError)
        continue
      }

      console.log(`📦 Created rotation ${rotation.id}`)
    } else {
      console.log(`↩ Rotation ${rotation.id} already exists, skipping creation`)
    }

    // 2. Удаляем старые данные пользователей для этой ротации
    const { error: deleteError } = await supabase.from('hydra_user_statistics').delete().eq('hydra_id', rotation.id)

    if (deleteError) {
      console.error(`❌ Error deleting old users for ${rotation.id}:`, deleteError)
      continue
    }

    // 3. Вставляем свежие данные пользователей
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
