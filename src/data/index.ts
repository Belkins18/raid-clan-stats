import type { IHydraStatisticsData } from './types'

export * as dataType from './types'

export const newRotation = {
  id: '04-03-2026_11-03-2026',
  data: [
    {
      name: 'Dreadnought UA',
      Normal: 0,
      Hard: 351207040,
      Brutal: 365064078,
      Nightmare: 443734967,
      keyUsed: 3
    },
    {
      name: 'NikR0man',
      Normal: 0,
      Hard: 287751161,
      Brutal: 259419812,
      Nightmare: 423326373,
      keyUsed: 3
    },
    {
      name: '(BiБр) Крегул',
      Normal: 0,
      Hard: 119854102,
      Brutal: 157098631,
      Nightmare: 173914063,
      keyUsed: 3
    },
    {
      name: 'Oleg77713',
      Normal: 93642912,
      Hard: 263261920,
      Brutal: 112198160,
      Nightmare: 0,
      keyUsed: 3
    },
    {
      name: '(BiБр) Бітанга',
      Normal: 0,
      Hard: 181011090,
      Brutal: 79895472,
      Nightmare: 94815091,
      keyUsed: 3
    },
    {
      name: 'BIБP_Pashatko1',
      Normal: 0,
      Hard: 281906229,
      Brutal: 142364467,
      Nightmare: 234611438,
      keyUsed: 3
    },
    {
      name: 'Radoran',
      Normal: 0,
      Hard: 0,
      Brutal: 254605089,
      Nightmare: 493586888,
      keyUsed: 2
    },
    {
      name: 'BIБP-Eriddicus',
      Normal: 0,
      Hard: 144997193,
      Brutal: 209124464,
      Nightmare: 46887515,
      keyUsed: 3
    },
    {
      name: '[BiБр] mykola',
      Normal: 0,
      Hard: 470980368,
      Brutal: 380619486,
      Nightmare: 388945530,
      keyUsed: 3
    },
    {
      name: '(BiБр) Кіясік',
      Normal: 102602813,
      Hard: 104889448,
      Brutal: 0,
      Nightmare: 240033998,
      keyUsed: 3
    },
    {
      name: 'МирославUA',
      Normal: 0,
      Hard: 457474964,
      Brutal: 606967336,
      Nightmare: 886403906,
      keyUsed: 3
    },
    {
      name: 'BEDbMAK_777',
      Normal: 0,
      Hard: 299681266,
      Brutal: 555448654,
      Nightmare: 442612316,
      keyUsed: 3
    },
    {
      name: 'Акробат22',
      Normal: 0,
      Hard: 196027505,
      Brutal: 242505052,
      Nightmare: 156947404,
      keyUsed: 3
    },
    {
      name: '[BiБр] Belkins',
      Normal: 0,
      Hard: 501517646,
      Brutal: 459977986,
      Nightmare: 469852061,
      keyUsed: 3
    },
    {
      name: 'Crystal Castle',
      Normal: 0,
      Hard: 323476825,
      Brutal: 252284993,
      Nightmare: 447269984,
      keyUsed: 3
    },
    {
      name: 'Ksondr',
      Normal: 0,
      Hard: 52591079,
      Brutal: 76298324,
      Nightmare: 300890424,
      keyUsed: 3
    },
    {
      name: 'VLAD_XIII',
      Normal: 40979623,
      Hard: 42156120,
      Brutal: 0,
      Nightmare: 135774188,
      keyUsed: 3
    },
    {
      name: 'AZAZEL',
      Normal: 0,
      Hard: 270617300,
      Brutal: 272961462,
      Nightmare: 151526621,
      keyUsed: 3
    },
    {
      name: 'Ухххх!!!!',
      Normal: 0,
      Hard: 151567024,
      Brutal: 93061872,
      Nightmare: 258033445,
      keyUsed: 3
    },

    {
      name: 'Glear20',
      Normal: 0,
      Hard: 163509538,
      Brutal: 48805022,
      Nightmare: 354904911,
      keyUsed: 3
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
      Normal: 14043611 + 75088759,
      Hard: 23751498,
      Brutal: 0,
      Nightmare: 0,
      keyUsed: 3
    },

    {
      name: 'bond7728',
      Normal: 0,
      Hard: 103077980,
      Brutal: 164962733,
      Nightmare: 378431610,
      keyUsed: 3
    },
    {
      name: 'Це_я',
      Normal: 0,
      Hard: 54336935,
      Brutal: 184293348,
      Nightmare: 72268810,
      keyUsed: 3
    },
    {
      name: 'Nigthfear',
      Normal: 205589727,
      Hard: 69613854,
      Brutal: 0,
      Nightmare: 47256989,
      keyUsed: 3
    },
    {
      name: 'Kola22',
      Normal: 0,
      Hard: 85441585,
      Brutal: 87871846,
      Nightmare: 79991749,
      keyUsed: 3
    },
    {
      name: '17SCARPIONN',
      Normal: 42766365,
      Hard: 147060567,
      Brutal: 151515024,
      Nightmare: 0,
      keyUsed: 3
    },
    {
      name: '[АПОФІС]',
      Normal: 75845373,
      Hard: 92947562,
      Brutal: 54238520,
      Nightmare: 0,
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
