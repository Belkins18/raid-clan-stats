import type { IHydraStatisticsData } from './types'

export * as dataType from './types'

export const newRotation = {
  id: '03-06-2026_10-06-2026',
  data: [
    {
      name: 'Dreadnought UA',
      Normal: 0,
      Hard: 285749864,
      Brutal: 635626488,
      Nightmare: 1495970977,
      keyUsed: 3
    },
    {
      name: 'NikR0man',
      Normal: 0,
      Hard: 296978518,
      Brutal: 219263592,
      Nightmare: 908011494,
      keyUsed: 3
    },
    {
      name: '(BiБр) Крегул',
      Normal: 0,
      Hard: 101660477,
      Brutal: 30149617,
      Nightmare: 174970075,
      keyUsed: 3
    },
    {
      name: 'Oleg77713',
      Normal: 0,
      Hard: 110387977,
      Brutal: 134591613,
      Nightmare: 182254319,
      keyUsed: 3
    },
    {
      name: '(BiБр) Бітанга',
      Normal: 0,
      Hard: 158828788,
      Brutal: 82284530,
      Nightmare: 134210901,
      keyUsed: 3
    },
    {
      name: 'BIБP_Pashatko1',
      Normal: 0,
      Hard: 291907897,
      Brutal: 300784326,
      Nightmare: 257020089,
      keyUsed: 3
    },
    {
      name: 'Radoran',
      Normal: 0,
      Hard: 259908887,
      Brutal: 400678370,
      Nightmare: 11684758382,
      keyUsed: 3
    },
    {
      name: 'BIБP-Eriddicus',
      Normal: 0,
      Hard: 137323639,
      Brutal: 277821713,
      Nightmare: 29098248,
      keyUsed: 3
    },
    {
      name: '[BiБр] mykola',
      Normal: 0,
      Hard: 485152777,
      Brutal: 436218927,
      Nightmare: 427151465,
      keyUsed: 3
    },
    {
      name: '(BiБр) Кіясік',
      Normal: 167823109,
      Hard: 98029946,
      Brutal: 0,
      Nightmare: 90229618,
      keyUsed: 3
    },
    {
      name: 'МирославUA',
      Normal: 0,
      Hard: 471752850,
      Brutal: 634263252,
      Nightmare: 1015970244,
      keyUsed: 3
    },
    {
      name: 'BEDbMAK_777',
      Normal: 0,
      Hard: 324724516,
      Brutal: 612688759,
      Nightmare: 491466149,
      keyUsed: 3
    },
    {
      name: 'Акробат22',
      Normal: 0,
      Hard: 170172078,
      Brutal: 270149797,
      Nightmare: 146177870,
      keyUsed: 3
    },
    {
      name: '[BiБр] Belkins',
      Normal: 0,
      Hard: 662508091,
      Brutal: 729012560,
      Nightmare: 712095693,
      keyUsed: 3
    },
    {
      name: 'Crystal Castle',
      Normal: 0,
      Hard: 405763671,
      Brutal: 459388176,
      Nightmare: 467258954,
      keyUsed: 3
    },
    {
      name: 'Ksondr',
      Normal: 0,
      Hard: 31879369,
      Brutal: 126957479,
      Nightmare: 287071467,
      keyUsed: 3
    },
    {
      name: 'VLAD_XIII',
      Normal: 0,
      Hard: 0,
      Brutal: 0,
      Nightmare: 124216320,
      keyUsed: 1
    },
    {
      name: 'AZAZEL',
      Normal: 0,
      Hard: 222666910,
      Brutal: 153992340,
      Nightmare: 275990740,
      keyUsed: 3
    },
    {
      name: 'Ухххх!!!!',
      Normal: 0,
      Hard: 218519560,
      Brutal: 162169790,
      Nightmare: 553353784,
      keyUsed: 3
    },
    {
      name: 'Glear20',
      Normal: 0,
      Hard: 85086429,
      Brutal: 171012649,
      Nightmare: 257069318,
      keyUsed: 3
    },
    {
      name: 'gud lack',
      Normal: 0,
      Hard: 0,
      Brutal: 0,
      Nightmare: 0,
      keyUsed: 0
    },
    {
      name: 'Xopcuk',
      Normal: 0,
      Hard: 0,
      Brutal: 137151805,
      Nightmare: 0,
      keyUsed: 1
    },
    {
      name: 'Berserk [UA]',
      Normal: 32842412,
      Hard: 42036583,
      Brutal: 0,
      Nightmare: 0,
      keyUsed: 2
    },
    {
      name: 'bond7728',
      Normal: 0,
      Hard: 82975777,
      Brutal: 200938659,
      Nightmare: 427208019,
      keyUsed: 3
    },
    {
      name: 'Це_я',
      Normal: 0,
      Hard: 0,
      Brutal: 145780777,
      Nightmare: 80291767,
      keyUsed: 2
    },
    {
      name: 'Nigthfear',
      Normal: 0,
      Hard: 0,
      Brutal: 0,
      Nightmare: 0,
      keyUsed: 0
    },
    {
      name: 'senay',
      Normal: 0,
      Hard: 0,
      Brutal: 441639490,
      Nightmare: 0,
      keyUsed: 1
    },
    {
      name: '17SCARPIONN',
      Normal: 0,
      Hard: 32875070,
      Brutal: 45818214,
      Nightmare: 315351492,
      keyUsed: 3
    },
    {
      name: '[АПОФІС]',
      Normal: 49139463,
      Hard: 43033116,
      Brutal: 0,
      Nightmare: 69419421,
      keyUsed: 3
    }
  ]
}

export const hydraStatisticsData: IHydraStatisticsData[] = [newRotation].sort(
  (a, b) => {
    const parseDate = (id: string): number => {
      const [day, month, year] = id.split('_')[0].split('-').map(Number)
      return new Date(year, month - 1, day).getTime()
    }
    return parseDate(a.id) - parseDate(b.id)
  }
)
