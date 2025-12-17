import type { IHydraStatisticsData } from './types'

export * as dataType from './types'

export const newRotation = {
  id: '10-12-2025_17-12-2025',
  data: [
    {
      name: 'NikR0man',
      Normal: 0,
      Hard: 199049373,
      Brutal: 312519715,
      Nightmare: 873964871,
      keyUsed: 3
    },
    {
      name: 'Dreadnought UA',
      Normal: 0,
      Hard: 312222978,
      Brutal: 356681243,
      Nightmare: 498105952,
      keyUsed: 3
    },
    {
      name: '(BiБр) Крегул',
      Normal: 148207520,
      Hard: 0,
      Brutal: 120959312,
      Nightmare: 117586992,
      keyUsed: 3
    },
    {
      name: 'Oleg77713',
      Normal: 146170421,
      Hard: 191307007,
      Brutal: 156963055,
      Nightmare: 0,
      keyUsed: 3
    },
    {
      name: '(BiБр) Бітанга',
      Normal: 0,
      Hard: 0,
      Brutal: 0,
      Nightmare: 0,
      KeyUsed: 0,
      keyUsed: 0
    },
    {
      name: 'BIБP_Pashatko1',
      Normal: 0,
      Hard: 223257302,
      Brutal: 192520929,
      Nightmare: 228062054,
      keyUsed: 3
    },
    {
      name: 'Radoran',
      Normal: 0,
      Hard: 213261142,
      Brutal: 205652643,
      Nightmare: 109499303,
      keyUsed: 3
    },
    {
      name: 'BIБP-Eriddicus',
      Normal: 0,
      Hard: 138225646,
      Brutal: 50863958,
      Nightmare: 117409332,
      keyUsed: 3
    },
    {
      name: '[BiБр] mykola',
      Normal: 0,
      Hard: 291767371,
      Brutal: 364697197,
      Nightmare: 337940907,
      keyUsed: 3
    },
    {
      name: '(BiБр) Кіясік',
      Normal: 137563215,
      Hard: 0,
      Brutal: 146013741,
      Nightmare: 0,
      keyUsed: 2
    },
    {
      name: 'МирославUA',
      Normal: 0,
      Hard: 319802595,
      Brutal: 538605939,
      Nightmare: 940547924,
      keyUsed: 3
    },
    {
      name: 'BEDbMAK_777',
      Normal: 0,
      Hard: 0,
      Brutal: 419732506,
      Nightmare: 431875129,
      keyUsed: 2
    },
    {
      name: 'Акробат22',
      Normal: 0,
      Hard: 189081784,
      Brutal: 174956533,
      Nightmare: 190259211,
      keyUsed: 3
    },
    {
      name: '[BiБр] Belkins',
      Normal: 0,
      Hard: 395363204,
      Brutal: 414759561,
      Nightmare: 649105371,
      keyUsed: 3
    },
    {
      name: 'Crystal Castle',
      Normal: 0,
      Hard: 308032661,
      Brutal: 495964910,
      Nightmare: 436185948,
      keyUsed: 3
    },
    {
      name: 'Ksondr',
      Normal: 0,
      Hard: 33188603,
      Brutal: 78634727,
      Nightmare: 86791560,
      keyUsed: 3
    },
    {
      name: 'VLAD_XIII',
      Normal: 0,
      Hard: 39819714,
      Brutal: 0,
      Nightmare: 47572898,
      keyUsed: 2
    },
    {
      name: 'Ухххх!!!!',
      Normal: 0,
      Hard: 216279898,
      Brutal: 69833529,
      Nightmare: 121079256,
      keyUsed: 3
    },
    {
      name: 'AZAZEL',
      Normal: 0,
      Hard: 248222948,
      Brutal: 435554311,
      Nightmare: 150017273,
      keyUsed: 3
    },
    {
      name: 'Glear20',
      Normal: 0,
      Hard: 134450051,
      Brutal: 73441154,
      Nightmare: 244191156,
      keyUsed: 3
    },
    {
      name: 'kill softly',
      Normal: 0,
      Hard: 31803052,
      Brutal: 122158743,
      Nightmare: 362073997,
      keyUsed: 3
    },
    {
      name: 'Berserk [UA]',
      Normal: 38254806,
      Hard: 27685072,
      Brutal: 2823233,
      Nightmare: 0,
      keyUsed: 3
    },
    {
      name: 'Xopcuk',
      Normal: 83842860,
      Hard: 70419295,
      Brutal: 0,
      Nightmare: 0,
      keyUsed: 3
    },
    {
      name: 'bond7728',
      Normal: 0,
      Hard: 58305301,
      Brutal: 121976246,
      Nightmare: 435654264,
      keyUsed: 3
    },
    {
      name: 'Це_я',
      Normal: 0,
      Hard: 0,
      Brutal: 0,
      Nightmare: 0,
      keyUsed: 0
    },
    {
      name: 'Nigthfear',
      Normal: 194531835,
      Hard: 96268713,
      Brutal: 69744885,
      Nightmare: 0,
      keyUsed: 3
    },
    {
      name: 'Kola22',
      Normal: 0,
      Hard: 76640517,
      Brutal: 70125502,
      Nightmare: 82645328,
      keyUsed: 3
    },
    {
      name: '17SCARPIONN',
      Normal: 68729439,
      Hard: 146803506,
      Brutal: 83190788,
      Nightmare: 0,
      keyUsed: 3
    },
    {
      name: '[АПОФІС]',
      Normal: 6956788,
      Hard: 15742193,
      Brutal: 25024843,
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

console.log('hydraStatisticsData: ', hydraStatisticsData)
