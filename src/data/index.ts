import type { IHydraStatisticsData } from './types'

export * as dataType from './types'

export const newRotation = {
  id: '18-03-2026_25-03-2026',
  data: [
    {
      name: 'Dreadnought UA',
      Normal: 0,
      Hard: 362290832,
      Brutal: 394518895,
      Nightmare: 481080440,
      keyUsed: 3
    },
    {
      name: 'NikR0man',
      Normal: 0,
      Hard: 290107165,
      Brutal: 208796609,
      Nightmare: 373829391,
      keyUsed: 3
    },
    {
      name: '(BiБр) Крегул',
      Normal: 0,
      Hard: 111526998,
      Brutal: 144736089,
      Nightmare: 166225272,
      keyUsed: 3
    },
    {
      name: 'Oleg77713',
      Normal: 0,
      Hard: 75200628,
      Brutal: 165077628,
      Nightmare: 82560724,
      keyUsed: 3
    },
    {
      name: '(BiБр) Бітанга',
      Normal: 0,
      Hard: 132123301,
      Brutal: 80429484,
      Nightmare: 121888448,
      keyUsed: 3
    },
    {
      name: 'BIБP_Pashatko1',
      Normal: 0,
      Hard: 248770158,
      Brutal: 114544648,
      Nightmare: 183367720,
      keyUsed: 3
    },
    {
      name: 'Radoran',
      Normal: 0,
      Hard: 215637685,
      Brutal: 231381597,
      Nightmare: 3549343698,
      keyUsed: 3
    },
    {
      name: 'BIБP-Eriddicus',
      Normal: 0,
      Hard: 171370246,
      Brutal: 257674030,
      Nightmare: 44854544,
      keyUsed: 3
    },
    {
      name: '[BiБр] mykola',
      Normal: 0,
      Hard: 450833366,
      Brutal: 460614391,
      Nightmare: 367952058,
      keyUsed: 3
    },
    {
      name: '(BiБр) Кіясік',
      Normal: 112221340,
      Hard: 95788002,
      Brutal: 257023985,
      Nightmare: 0,
      keyUsed: 3
    },
    {
      name: 'МирославUA',
      Normal: 0,
      Hard: 407050429,
      Brutal: 629572292,
      Nightmare: 907399013,
      keyUsed: 3
    },
    {
      name: 'BEDbMAK_777',
      Normal: 0,
      Hard: 0,
      Brutal: 538362351,
      Nightmare: 466546333,
      keyUsed: 2
    },
    {
      name: 'Акробат22',
      Normal: 0,
      Hard: 0,
      Brutal: 0,
      Nightmare: 0,
      keyUsed: 0
    },
    {
      name: '[BiБр] Belkins',
      Normal: 0,
      Hard: 315501349,
      Brutal: 505511889,
      Nightmare: 744048065,
      keyUsed: 3
    },
    {
      name: 'Crystal Castle',
      Normal: 0,
      Hard: 343383562,
      Brutal: 371777158,
      Nightmare: 394823574,
      keyUsed: 3
    },
    {
      name: 'Ksondr',
      Normal: 0,
      Hard: 49058684,
      Brutal: 139569437,
      Nightmare: 319293640,
      keyUsed: 3
    },
    {
      name: 'VLAD_XIII',
      Normal: 24470170,
      Hard: 71335898 - 24470170,
      Brutal: 0,
      Nightmare: 134887340,
      keyUsed: 3
    },
    {
      name: 'AZAZEL',
      Normal: 0,
      Hard: 212707826,
      Brutal: 483271069,
      Nightmare: 128823878,
      keyUsed: 3
    },
    {
      name: 'Ухххх!!!!',
      Normal: 0,
      Hard: 151472881,
      Brutal: 123111663,
      Nightmare: 276931330,
      keyUsed: 3
    },
    {
      name: 'Glear20',
      Normal: 0,
      Hard: 0,
      Brutal: 127342320,
      Nightmare: 280394723,
      keyUsed: 2
    },
    {
      name: 'Xopcuk',
      Normal: 0,
      Hard: 0,
      Brutal: 0,
      Nightmare: 0,
      keyUsed: 0
    },
    {
      name: 'Berserk [UA]',
      Normal: 94795640,
      Hard: 31530254,
      Brutal: 0,
      Nightmare: 0,
      keyUsed: 3
    },
    {
      name: 'bond7728',
      Normal: 0,
      Hard: 113634054,
      Brutal: 169021717,
      Nightmare: 389607422,
      keyUsed: 3
    },
    {
      name: 'Це_я',
      Normal: 0,
      Hard: 74916623,
      Brutal: 260892466,
      Nightmare: 98630328,
      keyUsed: 3
    },
    {
      name: 'Nightfear',
      Normal: 124679155,
      Hard: 57390354,
      Brutal: 0,
      Nightmare: 50937391,
      keyUsed: 3
    },
    {
      name: 'Kola22',
      Normal: 0,
      Hard: 89118105,
      Brutal: 49778523,
      Nightmare: 90007650,
      keyUsed: 3
    },
    {
      name: '17SCARPIONN',
      Normal: 89947054,
      Hard: 156550092,
      Brutal: 177860226,
      Nightmare: 0,
      keyUsed: 3
    },
    {
      name: '[АПОФІС]',
      Normal: 0,
      Hard: 53076381,
      Brutal: 37131545,
      Nightmare: 47424788,
      keyUsed: 3
    }
  ]
}

export const hydraStatisticsData: IHydraStatisticsData[] = [newRotation].sort((a, b) => {
  const parseDate = (id: string): number => {
    const [day, month, year] = id.split('_')[0].split('-').map(Number)
    return new Date(year, month - 1, day).getTime()
  }

  return parseDate(a.id) - parseDate(b.id)
})
