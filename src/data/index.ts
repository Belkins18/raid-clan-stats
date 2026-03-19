import type { IHydraStatisticsData } from './types'

export * as dataType from './types'

export const newRotation = {
  id: '11-03-2026_18-03-2026',
  data: [
    {
      name: 'Dreadnought UA',
      Normal: 0,
      Hard: 372655557,
      Brutal: 382089601,
      Nightmare: 534030583,
      keyUsed: 3
    },
    {
      name: 'NikR0man',
      Normal: 0,
      Hard: 150803002,
      Brutal: 247332057,
      Nightmare: 453926549,
      keyUsed: 3
    },
    {
      name: '(BiБр) Крегул',
      Normal: 0,
      Hard: 116700859,
      Brutal: 132019419,
      Nightmare: 176016065,
      keyUsed: 3
    },
    {
      name: 'Oleg77713',
      Normal: 0,
      Hard: 118737554,
      Brutal: 113127432,
      Nightmare: 99259470,
      keyUsed: 3
    },
    {
      name: '(BiБр) Бітанга',
      Normal: 0,
      Hard: 0,
      Brutal: 0,
      Nightmare: 0,
      keyUsed: 0
    },
    {
      name: 'BIБP_Pashatko1',
      Normal: 0,
      Hard: 0,
      Brutal: 0,
      Nightmare: 0,
      keyUsed: 0
    },
    {
      name: 'Radoran',
      Normal: 0,
      Hard: 127822857,
      Brutal: 240300510,
      Nightmare: 509845976,
      keyUsed: 3
    },
    {
      name: 'BIБP-Eriddicus',
      Normal: 0,
      Hard: 132753558,
      Brutal: 245671458,
      Nightmare: 58364037,
      keyUsed: 3
    },
    {
      name: '[BiБр] mykola',
      Normal: 0,
      Hard: 486684399,
      Brutal: 455515446,
      Nightmare: 359481424,
      keyUsed: 3
    },
    {
      name: '(BiБр) Кіясік',
      Normal: 0,
      Hard: 77598757,
      Brutal: 89567122,
      Nightmare: 218942395,
      keyUsed: 3
    },
    {
      name: 'МирославUA',
      Normal: 0,
      Hard: 405891536,
      Brutal: 810524054,
      Nightmare: 884544073,
      keyUsed: 3
    },
    {
      name: 'BEDbMAK_777',
      Normal: 0,
      Hard: 290405000,
      Brutal: 552217326,
      Nightmare: 431427114,
      keyUsed: 3
    },
    {
      name: 'Акробат22',
      Normal: 0,
      Hard: 220971268,
      Brutal: 209904134,
      Nightmare: 163016272,
      keyUsed: 3
    },
    {
      name: '[BiБр] Belkins',
      Normal: 0,
      Hard: 599085548,
      Brutal: 448593913,
      Nightmare: 563681748,
      keyUsed: 3
    },
    {
      name: 'Crystal Castle',
      Normal: 0,
      Hard: 322238799,
      Brutal: 305595426,
      Nightmare: 423372706,
      keyUsed: 3
    },
    {
      name: 'Ksondr',
      Normal: 0,
      Hard: 41915337,
      Brutal: 154202463,
      Nightmare: 545477553,
      keyUsed: 3
    },
    {
      name: 'VLAD_XIII',
      Normal: 37619937,
      Hard: 37873849,
      Brutal: 0,
      Nightmare: 121005142,
      keyUsed: 3
    },
    {
      name: 'AZAZEL',
      Normal: 0,
      Hard: 189137534,
      Brutal: 368786207,
      Nightmare: 149388252,
      keyUsed: 3
    },
    {
      name: 'Ухххх!!!!',
      Normal: 48656297,
      Hard: 0,
      Brutal: 183934283 - 48656297,
      Nightmare: 307537982,
      keyUsed: 2
    },

    {
      name: 'Glear20',
      Normal: 0,
      Hard: 91878301,
      Brutal: 129801698,
      Nightmare: 324783492,
      keyUsed: 3
    },
    {
      name: 'Xopcuk',
      Normal: 47842965,
      Hard: 89955991,
      Brutal: 93331673,
      Nightmare: 0,
      keyUsed: 3
    },
    {
      name: 'Berserk [UA]',
      Normal: 36780082 + 33536451,
      Hard: 24177484,
      Brutal: 0,
      Nightmare: 0,
      keyUsed: 3
    },

    {
      name: 'bond7728',
      Normal: 0,
      Hard: 87399958,
      Brutal: 174612615,
      Nightmare: 438777144,
      keyUsed: 3
    },
    {
      name: 'Це_я',
      Normal: 0,
      Hard: 61581761,
      Brutal: 210893799,
      Nightmare: 88130174,
      keyUsed: 3
    },
    {
      name: 'Nigthfear',
      Normal: 236849675,
      Hard: 97654598,
      Brutal: 0,
      Nightmare: 41001054,
      keyUsed: 3
    },
    {
      name: 'Kola22',
      Normal: 0,
      Hard: 117152034,
      Brutal: 70253887,
      Nightmare: 81983168,
      keyUsed: 3
    },
    {
      name: '17SCARPIONN',
      Normal: 62651092,
      Hard: 166356784,
      Brutal: 154648785,
      Nightmare: 0,
      keyUsed: 3
    },
    {
      name: '[АПОФІС]',
      Normal: 54835298,
      Hard: 33548086,
      Brutal: 88762009,
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
