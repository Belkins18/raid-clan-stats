import type { IHydraStatisticsData } from './types'

export * as dataType from './types'

export const newRotation = {
  id: '13-05-2026_20-05-2026',
  data: [
    { name: 'Dreadnought UA', Normal: 0, Hard: 267553993, Brutal: 576160514, Nightmare: 530276402, keyUsed: 3 },
    { name: 'NikR0man', Normal: 0, Hard: 312176117, Brutal: 285598301, Nightmare: 1118350970, keyUsed: 3 },
    { name: '(BiБр) Крегул', Normal: 0, Hard: 96600628, Brutal: 2589016, Nightmare: 155905308, keyUsed: 3 },
    { name: 'Oleg77713', Normal: 0, Hard: 53698389, Brutal: 126784556, Nightmare: 211248166, keyUsed: 3 },
    { name: '(BiБр) Бітанга', Normal: 0, Hard: 134243824, Brutal: 86143817, Nightmare: 109759964, keyUsed: 3 },
    { name: 'BIБP_Pashatko1', Normal: 0, Hard: 241865937, Brutal: 175376263, Nightmare: 262198865, keyUsed: 3 },
    { name: 'Radoran', Normal: 0, Hard: 191929837, Brutal: 441456007, Nightmare: 9807817827, keyUsed: 3 },
    { name: 'BIБP-Eriddicus', Normal: 0, Hard: 121660757, Brutal: 251824986, Nightmare: 29522027, keyUsed: 3 },
    { name: '[BiБр] mykola', Normal: 0, Hard: 519311181, Brutal: 460860628, Nightmare: 476173914, keyUsed: 3 },
    { name: '(BiБр) Кіясік', Normal: 0, Hard: 120384271, Brutal: 43153544, Nightmare: 312697318, keyUsed: 3 },
    { name: 'МирославUA', Normal: 0, Hard: 426056712, Brutal: 572659051, Nightmare: 1177455707, keyUsed: 3 },
    { name: 'BEDbMAK_777', Normal: 0, Hard: 288533322, Brutal: 590531508, Nightmare: 459776620, keyUsed: 3 },
    { name: 'Акробат22', Normal: 0, Hard: 0, Brutal: 0, Nightmare: 0, keyUsed: 0 },
    { name: '[BiБр] Belkins', Normal: 0, Hard: 1064676585, Brutal: 371014077, Nightmare: 662631781, keyUsed: 3 },
    { name: 'Crystal Castle', Normal: 0, Hard: 428898011, Brutal: 389364516, Nightmare: 489464065, keyUsed: 3 },
    { name: 'Ksondr', Normal: 0, Hard: 33506130, Brutal: 160200341, Nightmare: 388792000, keyUsed: 3 },
    { name: 'VLAD_XIII', Normal: 27104466, Hard: 51473797, Brutal: 0, Nightmare: 122859575, keyUsed: 3 },
    { name: 'AZAZEL', Normal: 0, Hard: 258918631, Brutal: 465598509, Nightmare: 208196067, keyUsed: 3 },
    { name: 'Ухххх!!!!', Normal: 0, Hard: 257053656, Brutal: 179071294, Nightmare: 548001564, keyUsed: 3 },
    { name: 'Glear20', Normal: 0, Hard: 89920052, Brutal: 195079550, Nightmare: 330979541, keyUsed: 3 },
    { name: 'Xopcuk', Normal: 0, Hard: 0, Brutal: 0, Nightmare: 0, keyUsed: 0 },
    { name: 'Berserk [UA]', Normal: 23356501, Hard: 35417434, Brutal: 6891242, Nightmare: 0, keyUsed: 3 },
    { name: 'bond7728', Normal: 0, Hard: 82361104, Brutal: 173762813, Nightmare: 441816758, keyUsed: 3 },
    { name: 'Це_я', Normal: 0, Hard: 0, Brutal: 219345666, Nightmare: 128911871, keyUsed: 2 },
    { name: 'Nigthfear', Normal: 0, Hard: 0, Brutal: 0, Nightmare: 0, keyUsed: 0 },
    { name: 'Kola22', Normal: 0, Hard: 88218625, Brutal: 41037391, Nightmare: 75372315, keyUsed: 3 },
    { name: '17SCARPIONN', Normal: 0, Hard: 149906882, Brutal: 126782853, Nightmare: 193747591, keyUsed: 3 },
    { name: '[АПОФІС]', Normal: 0, Hard: 49961510, Brutal: 38241123, Nightmare: 80984673, keyUsed: 3 }
  ]
}

export const hydraStatisticsData: IHydraStatisticsData[] = [newRotation].sort((a, b) => {
  const parseDate = (id: string): number => {
    const [day, month, year] = id.split('_')[0].split('-').map(Number)
    return new Date(year, month - 1, day).getTime()
  }
  return parseDate(a.id) - parseDate(b.id)
})
