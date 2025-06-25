import type { BlessingTypes, HeroTypes } from '..'
import { BlessingConstants } from '../blessing'
import { HeroConstants } from '../hero'

export type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export const getHeroInfo = (id: HeroTypes.ID): HeroTypes.THeroInfo => {
  const b = HeroConstants.List[id]

  console.log(b)

  return {
    ID: id,
    Name: b.Name,
    Rarity: HeroConstants.Rarity[b.Rarity],
    Role: HeroConstants.Role[b.Role],
    Affinity: HeroConstants.Affinity[b.Affinity],
    Faction: HeroConstants.Faction[b.Faction],
    Aura: HeroConstants.Aura[b.Aura],
    ImageURL: b.ImageURL
  }
}

export const getBlessingInfo = (id: BlessingTypes.ID): BlessingTypes.TBlessingInfo => {
  const b = BlessingConstants.List[id]
  return {
    ID: id,
    Type: BlessingConstants.Type[b.Type],
    Rarity: BlessingConstants.Rarity[b.Rarity],
    Name: b.Name
  }
}
