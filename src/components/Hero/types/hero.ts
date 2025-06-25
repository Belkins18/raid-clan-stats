export const HeroConstants = {
  Rarity: {
    1: 'Common',
    2: 'Uncommon',
    3: 'Rare',
    4: 'Epic',
    5: 'Legendary',
    6: 'Mythical'
  },

  Role: {
    1: 'Attack',
    2: 'Defense',
    3: 'Health',
    4: 'Support'
  },

  Affinity: {
    1: 'Magic',
    2: 'Force',
    3: 'Spirit',
    4: 'Void'
  },

  Faction: {
    // Telerian League
    1: 'Banner Lords',
    2: 'High Elves',
    3: 'Sacred Order',
    4: 'Barbarians',
    // Gaellen Pact
    5: 'Ogryn Tribes',
    6: 'Lizardmen',
    7: 'Skinwalkers',
    8: 'Orcs',
    // The Currupted
    9: 'Demonspawn',
    10: 'Undead Hordes',
    11: 'Dark Elves',
    12: 'Knight Revenant',
    // Nyresan Union
    13: 'Dwarves',
    14: 'Shadowkin',
    15: 'Sylvan Watchers'
    // 16: 'Hidden'
  },

  Aura: {
    1: 'HP',
    2: 'Attack',
    3: 'Defence',
    4: 'Speed',
    5: 'Crit Rate',
    6: 'Resistance',
    7: 'Accuracy'
  },

  List: {
    'Nekmo Thaar': {
      Name: 'Nekmo Thaar',
      Rarity: 5, // Legendary
      Role: 4, // Support
      Affinity: 3, // Spirit
      Faction: 11, // Lizardmen
      Aura: 4, // Speed
      ImageURL: new URL(
        '/src/assets/images/Champions/Faction/Lizardmen/Legendary/NekmoThaar.png',
        import.meta.url
      ).href
    },
    'Lydia the Deathsiren': {
      Name: 'Lydia the Deathsiren',
      Rarity: 5, // Legendary
      Role: 4, // Support
      Affinity: 4, // Void
      Faction: 11, // Dark Elves
      Aura: 6, // Resistance
      ImageURL: new URL(
        '/src/assets/images/Champions/Faction/Dark Elves/Legendary/LydiatheDeathsiren.png',
        import.meta.url
      ).href
    },
    'Grand Oak Padraig': {
      Name: 'Grand Oak Padraig',
      Rarity: 5, // Legendary
      Role: 4, // Support
      Affinity: 3, // Spirit
      Faction: 15, // Sylvan Watchers
      Aura: 4, // Speed
      ImageURL: new URL(
        '/src/assets/images/Champions/Faction/Sylvan Watchers/Legendary/Padraig.png',
        import.meta.url
      ).href
    },
    'Trunda Giltmallet': {
      Name: 'Trunda Giltmallet',
      Rarity: 5, // Legendary
      Role: 4, // Support
      Affinity: 3, // Spirit
      Faction: 15, // Sylvan Watchers
      Aura: 4, // Speed
      ImageURL: new URL(
        '/src/assets/images/Champions/Faction/Sylvan Watchers/Legendary/Padraig.png',
        import.meta.url
      ).href
    },
    7920: {
      Name: 'Graazur',
      Rarity: 5, // Legendary
      Role: 2, // Defense
      Affinity: 4, // Void
      Faction: 5, // Ogryn Tribes
      Aura: 3, // Defence
      ImageURL: new URL(
        '/src/assets/images/Champions/Faction/Ogryn Tribes/Legendary/GraazurIrongut.png',
        import.meta.url
      ).href
    },
    9170: {
      Name: 'Thor',
      Rarity: 5, // Legendary
      Role: 1, // Attack
      Affinity: 1, // Magic
      Faction: 4, // Barbarians
      Aura: 2, // Attack
      ImageURL: new URL(
        '/src/assets/images/Champions/Faction/Barbarians/Legendary/ThorFaehammer.png',
        import.meta.url
      ).href
    }
  }
} as const

export type ID = keyof typeof HeroConstants.List
export type Rarity = (typeof HeroConstants.Rarity)[keyof typeof HeroConstants.Rarity]
export type Role = (typeof HeroConstants.Role)[keyof typeof HeroConstants.Role]
export type Affinity = (typeof HeroConstants.Affinity)[keyof typeof HeroConstants.Affinity]
export type Faction = (typeof HeroConstants.Faction)[keyof typeof HeroConstants.Faction]
export type Aura = (typeof HeroConstants.Aura)[keyof typeof HeroConstants.Aura]

export type THeroInfo = {
  ID: ID
  Name: string
  Rarity: Rarity
  Role: Role
  Affinity: Affinity
  Faction: Faction
  Aura?: Aura
  ImageURL: string
}
