export const BlessingConstants = {
  Type: {
    10: 'Light',
    20: 'Dark',
    30: 'War',
    40: 'Chaos',
    50: 'Harmony'
  },

  Rarity: {
    3: 'Rare',
    4: 'Epic',
    5: 'Legendary'
  },

  List: {
    1031: { Type: 10, Rarity: 3, Name: 'Indomitable Spirit' },
    1032: { Type: 10, Rarity: 3, Name: 'Miracle Heal' },
    1041: { Type: 10, Rarity: 4, Name: 'Iron Will' },
    1042: { Type: 10, Rarity: 4, Name: 'Heavencast' },
    1051: { Type: 10, Rarity: 5, Name: 'Intimidating Presence' },
    1052: { Type: 10, Rarity: 5, Name: 'Lightning Cage' },

    2031: { Type: 20, Rarity: 3, Name: 'Dark Resolve' },
    2032: { Type: 20, Rarity: 3, Name: 'Phantom Touch' },
    2041: { Type: 20, Rarity: 4, Name: 'Cruelty' },
    2042: { Type: 20, Rarity: 4, Name: 'Lethal Dose' },
    2051: { Type: 20, Rarity: 5, Name: 'Temporal Chains' },
    2052: { Type: 20, Rarity: 5, Name: 'Ward of the Fallen' },

    3031: { Type: 30, Rarity: 3, Name: "Hero Soul" },
    3032: { Type: 30, Rarity: 3, Name: 'Faultless Defense' },
    3041: { Type: 30, Rarity: 4, Name: 'Commanding Presence' },
    3042: { Type: 30, Rarity: 4, Name: 'Chainbreaker' },
    3051: { Type: 30, Rarity: 5, Name: 'Life Harvest' },
    3052: { Type: 30, Rarity: 5, Name: 'Soul Reap' },

    4031: { Type: 40, Rarity: 3, Name: 'Emergency Heal' },
    4032: { Type: 40, Rarity: 3, Name: 'Survival Insinct' },
    4041: { Type: 40, Rarity: 4, Name: 'Crushing Rend' },
    4042: { Type: 40, Rarity: 4, Name: 'Incinerate' },
    4051: { Type: 40, Rarity: 5, Name: 'Polymorph' },
    4052: { Type: 40, Rarity: 5, Name: 'Brimstone' },

    5031: { Type: 50, Rarity: 3, Name: 'Nourish' },
    5032: { Type: 50, Rarity: 3, Name: "Nature’s Bounty" },
    5041: { Type: 50, Rarity: 4, Name: 'Neutralize' },
    5042: { Type: 50, Rarity: 4, Name: "Nature’s Wrath" },
    5051: { Type: 50, Rarity: 5, Name: 'Cracking Roots' },
    5052: { Type: 50, Rarity: 5, Name: 'Harmonic Impulse' }
  }
} as const

export type ID = keyof typeof BlessingConstants.List
export type Type = (typeof BlessingConstants.Type)[keyof typeof BlessingConstants.Type]
export type Rarity = (typeof BlessingConstants.Rarity)[keyof typeof BlessingConstants.Rarity]

export type TBlessingInfo = {
  ID: ID
  Type: Type
  Rarity: Rarity
  Name: string
}
