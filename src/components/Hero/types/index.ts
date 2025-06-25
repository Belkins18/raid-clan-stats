import * as BlessingTypes from './blessing'
import * as HeroTypes from './hero'
import * as HeroUtils from './utils'

export type Rank = HeroUtils.Range<1, 7>
export type Level = HeroUtils.Range<1, 61>
export type Ascended = HeroUtils.Range<0, 7>
export type Awakened = HeroUtils.Range<0, 7>

export interface IHero {
  ID: string | number
  HeroID: HeroTypes.ID
  BlessingID?: BlessingTypes.ID
  Rank: Rank
  Level: Level
  Ascended: Ascended // Покраска
  Awakened: Awakened // Пробуждение
}

export { HeroTypes, BlessingTypes, HeroUtils }