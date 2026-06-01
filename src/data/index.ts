import type { IHydraStatisticsData } from './types'

export * as dataType from './types'

export const newRotation = {
  id: '20-05-2026_27-05-2026',
  data: [
    {
      name: 'Berserk [UA]',
      Normal: 12194051,
      Hard: 53465511,
      Brutal: 22836156,
      Nightmare: 0,
      keyUsed: 3
    },
    {
      name: '(BiБр) Бітанга',
      Normal: 0,
      Hard: 149423442,
      Brutal: 89266703,
      Nightmare: 126986146,
      keyUsed: 3
    },
    {
      name: '(BiБр) Крегул',
      Normal: 0,
      Hard: 99616466,
      Brutal: 35224193,
      Nightmare: 223806691,
      keyUsed: 3
    },
    {
      name: 'Це_я',
      Normal: 0,
      Hard: 0,
      Brutal: 236683951,
      Nightmare: 120020658,
      keyUsed: 2
    },
    {
      name: 'Glear20',
      Normal: 0,
      Hard: 82520960,
      Brutal: 116152788,
      Nightmare: 218302596,
      keyUsed: 3
    },
    {
      name: 'BIБP-Eriddicus',
      Normal: 0,
      Hard: 107907575,
      Brutal: 259666968,
      Nightmare: 34634758,
      keyUsed: 3
    },
    {
      name: 'Oleg77713',
      Normal: 0,
      Hard: 115874788,
      Brutal: 111828318,
      Nightmare: 223575099,
      keyUsed: 3
    },
    {
      name: '17SCARPIONN',
      Normal: 0,
      Hard: 16374232,
      Brutal: 45178462,
      Nightmare: 267061663,
      keyUsed: 3
    },
    { name: 'Xopcuk', Normal: 0, Hard: 0, Brutal: 0, Nightmare: 0, keyUsed: 0 },
    {
      name: 'Акробат22',
      Normal: 0,
      Hard: 0,
      Brutal: 0,
      Nightmare: 0,
      keyUsed: 0
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
      Hard: 109825401,
      Brutal: 43853840,
      Nightmare: 65863143,
      keyUsed: 3
    },
    {
      name: 'VLAD_XIII',
      Normal: 0,
      Hard: 0,
      Brutal: 0,
      Nightmare: 147297588,
      keyUsed: 1
    },
    {
      name: '[АПОФІС]',
      Normal: 0,
      Hard: 56757995,
      Brutal: 40524232,
      Nightmare: 48907070,
      keyUsed: 3
    },
    {
      name: 'NikR0man',
      Normal: 0,
      Hard: 275316210,
      Brutal: 294442412,
      Nightmare: 879297345,
      keyUsed: 3
    },
    {
      name: 'BEDbMAK_777',
      Normal: 0,
      Hard: 339439012,
      Brutal: 600654831,
      Nightmare: 446446626,
      keyUsed: 3
    },
    {
      name: '[BiБр] mykola',
      Normal: 0,
      Hard: 502437934,
      Brutal: 379235841,
      Nightmare: 417565310,
      keyUsed: 3
    },
    {
      name: '[BiБр] Belkins',
      Normal: 0,
      Hard: 697103385,
      Brutal: 506513942,
      Nightmare: 759061112,
      keyUsed: 3
    },
    {
      name: 'Radoran',
      Normal: 0,
      Hard: 260616823,
      Brutal: 452463370,
      Nightmare: 10736275426,
      keyUsed: 3
    },
    {
      name: 'Dreadnought UA',
      Normal: 0,
      Hard: 265483666,
      Brutal: 636957454,
      Nightmare: 1684434890,
      keyUsed: 3
    },
    {
      name: 'МирославUA',
      Normal: 0,
      Hard: 443871889,
      Brutal: 615589341,
      Nightmare: 1056863630,
      keyUsed: 3
    },
    {
      name: 'Ухххх!!!!',
      Normal: 0,
      Hard: 50047202,
      Brutal: 208415712,
      Nightmare: 374264205,
      keyUsed: 3
    },
    {
      name: 'Ksondr',
      Normal: 0,
      Hard: 44079496,
      Brutal: 74430218,
      Nightmare: 393454931,
      keyUsed: 3
    },
    {
      name: '(BiБр) Кіясік',
      Normal: 0,
      Hard: 114247430,
      Brutal: 93653359,
      Nightmare: 243822271,
      keyUsed: 3
    },
    {
      name: 'bond7728',
      Normal: 0,
      Hard: 68167474,
      Brutal: 289197655,
      Nightmare: 417200187,
      keyUsed: 3
    },
    {
      name: 'Crystal Castle',
      Normal: 0,
      Hard: 379092249,
      Brutal: 420234861,
      Nightmare: 460223931,
      keyUsed: 3
    },
    {
      name: 'AZAZEL',
      Normal: 0,
      Hard: 263074513,
      Brutal: 513352570,
      Nightmare: 237931943,
      keyUsed: 3
    },
    {
      name: 'BIБP_Pashatko1',
      Normal: 0,
      Hard: 283010249,
      Brutal: 235350430,
      Nightmare: 259065279,
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
