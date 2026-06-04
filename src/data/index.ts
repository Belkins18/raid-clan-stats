import type { IHydraStatisticsData } from './types'

export * as dataType from './types'

export const newRotation = {
  id: '27-05-2026_03-06-2026',
  data: [
    {
      name: 'Dreadnought UA',
      Normal: 0,
      Hard: 388420649,
      Brutal: 576047106,
      Nightmare: 2095146146,
      keyUsed: 3
    },
    {
      name: 'NikR0man',
      Normal: 0,
      Hard: 245631163,
      Brutal: 286665229,
      Nightmare: 449527881,
      keyUsed: 3
    },
    {
      name: '(BiБр) Крегул',
      Normal: 0,
      Hard: 0,
      Brutal: 0,
      Nightmare: 169659292,
      keyUsed: 1
    },
    {
      name: 'Oleg77713',
      Normal: 0,
      Hard: 50077495,
      Brutal: 221444148,
      Nightmare: 171527198,
      keyUsed: 3
    },
    {
      name: 'Radoran',
      Normal: 0,
      Hard: 170670327,
      Brutal: 439407883,
      Nightmare: 18351286282,
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
      Hard: 270110758,
      Brutal: 221147447,
      Nightmare: 210555328,
      keyUsed: 3
    },
    {
      name: 'BIБP-Eriddicus',
      Normal: 0,
      Hard: 161287732,
      Brutal: 323476159,
      Nightmare: 47516104,
      keyUsed: 3
    },
    {
      name: '[BiБр] mykola',
      Normal: 0,
      Hard: 450860119,
      Brutal: 428660463,
      Nightmare: 429379911,
      keyUsed: 3
    },
    {
      name: '(BiБр) Кіясік',
      Normal: 0,
      Hard: 93084737,
      Brutal: 74023270,
      Nightmare: 225245463,
      keyUsed: 3
    },
    {
      name: 'МирославUA',
      Normal: 0,
      Hard: 456447641,
      Brutal: 596151585,
      Nightmare: 1126012950,
      keyUsed: 3
    },
    {
      name: 'BEDbMAK_777',
      Normal: 0,
      Hard: 0,
      Brutal: 542620175,
      Nightmare: 474562368,
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
      Normal: 306484134,
      Hard: 0,
      Brutal: 451657398,
      Nightmare: 750520777,
      keyUsed: 3
    },
    {
      name: 'Crystal Castle',
      Normal: 0,
      Hard: 324285893,
      Brutal: 435351437,
      Nightmare: 491217273,
      keyUsed: 3
    },
    {
      name: 'Ksondr',
      Normal: 0,
      Hard: 68591404,
      Brutal: 57411854,
      Nightmare: 266598514,
      keyUsed: 3
    },
    {
      name: 'VLAD_XIII',
      Normal: 0,
      Hard: 48613800,
      Brutal: 0,
      Nightmare: 137910395,
      keyUsed: 2
    },
    {
      name: 'Ухххх!!!!',
      Normal: 0,
      Hard: 226964637,
      Brutal: 83886139,
      Nightmare: 576818296,
      keyUsed: 3
    },
    {
      name: 'AZAZEL',
      Normal: 0,
      Hard: 282186088,
      Brutal: 436889505,
      Nightmare: 270669278,
      keyUsed: 3
    },
    {
      name: 'Glear20',
      Normal: 59082484,
      Hard: 0,
      Brutal: 165782188,
      Nightmare: 211612044,
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
      name: 'Berserk [UA]',
      Normal: 0,
      Hard: 0,
      Brutal: 0,
      Nightmare: 0,
      keyUsed: 0
    },
    { name: 'Xopcuk', Normal: 0, Hard: 0, Brutal: 0, Nightmare: 0, keyUsed: 0 },
    {
      name: 'bond7728',
      Normal: 0,
      Hard: 78318620,
      Brutal: 251648380,
      Nightmare: 427663958,
      keyUsed: 3
    },
    {
      name: 'Це_я',
      Normal: 0,
      Hard: 58929461,
      Brutal: 272151347,
      Nightmare: 115791935,
      keyUsed: 3
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
      Hard: 79724165,
      Brutal: 58357063,
      Nightmare: 72886792,
      keyUsed: 3
    },
    {
      name: '17SCARPIONN',
      Normal: 0,
      Hard: 94479273,
      Brutal: 71547463,
      Nightmare: 245974975,
      keyUsed: 3
    },
    {
      name: '[АПОФІС]',
      Normal: 0,
      Hard: 56623044,
      Brutal: 53844642,
      Nightmare: 62513055,
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
