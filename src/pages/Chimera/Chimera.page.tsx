import { Hero } from '@/components'
// import { HeroUtils, type IHero } from '@/components/Hero/types'
import { dataType } from '@/data'
import { v4 } from 'uuid'

// export const Hero_Padraig_info: IHero = {
//   ID: v4(),
//   HeroID: 8740,
//   Name: 'Padraig',
//   Rank: 6,
//   Level: 60,
//   Ascended: 6,
//   Awakened: 3,
//   Rarity: 'Legendary',
//   Role: 'Support',
//   Affinity: 'Spirit',
//   Faction: 'Sylvan Watchers',
//   Auara: 'Speed',
//   Blessing: 2052
// }
// 9170 - Thor
// 7920 - Grazur
// 7850 - кролик
// 7350 - мичинаки
// 7370- эльва
// 8800 - отарион
// 8530 - фирол
// 7110 - некмотар
// 7860 - Artak
// 8780 - Estrid
// 4710 - Lidia
// 4540 - shamael
// 4720 - Akritsia
// 4520 - Molly
// 4260 Trunda
// 7980 - makaka
// 21030 - mashaled
const {HeroUtils } = Hero.Types
const NekmoThaar: Hero.Types.IHero = {
  ID: v4(),
  HeroID: 'Nekmo Thaar',
  BlessingID: 4052,
  Rank: 6,
  Level: 60,
  Ascended: 6, // Покраска
  Awakened: 4 // Пробуждение
}
const LydiaTheDeathsiren: Hero.Types.IHero = {
  ID: v4(),
  HeroID: 'Lydia the Deathsiren',
  BlessingID: 1051,
  Rank: 6,
  Level: 60,
  Ascended: 6, // Покраска
  Awakened: 3 // Пробуждение
}
const GrandOakPadraig: Hero.Types.IHero = {
  ID: v4(),
  HeroID: 'Grand Oak Padraig',
  BlessingID: 2052,
  Rank: 6,
  Level: 60,
  Ascended: 6, // Покраска
  Awakened: 3 // Пробуждение
}

interface IHeroStats 
  {
    level: dataType.THydraLevel;
    heroes: {
        hero: Hero.Types.IHero;
        stats: {
            damage: number | string;
            heal: number | string;
        };
    }[];
}

const teams = [
  {
    level: dataType.EHydraLevel.brutal,
    heroes: [
      {
        hero: {
          ...NekmoThaar
        },
        stats: {
          damage: 14509713,
          heal: '1 510 894'
        }
      },
      {
        hero: {
          ...LydiaTheDeathsiren
        },
        stats: {
          damage: 3508277,
          heal: 432923
        }
      },
       {
        hero: {
          ...GrandOakPadraig
        },
        stats: {
          damage: 1974729,
          heal: 4546673
        }
      }
    ]
  }
] as IHeroStats[]



export const ChimeraPage = () => {
  return (
    <>
      <Hero.RenderComponent hero={NekmoThaar} />
      {
        teams.find(item => item.level === 'Brutal')?.heroes.map((item, index) => {
          console.log(HeroUtils.getHeroInfo(item.hero.HeroID))
          return (
            <>``
              <Hero.RenderComponent hero={item.hero} key={index} />
              {/* <Text>{item.hero.HeroID}</Text> */}
              <pre>
                {JSON.stringify(item.stats, null, 2)}
              </pre>
            </>
          )
        })
      }
    </>
  )
}
