import type { IHydraStatisticsData } from './types'

export * as dataType from './types'

export const newRotation = {
  id: '15-04-2026_22-04-2026',
  data: [
    {
      name: 'Dreadnought UA',
      Normal: 0,
      Hard: 269464224,
      Brutal: 350437940,
      Nightmare: 455148184,
      keyUsed: 3
    },
    {
      name: 'NikR0man',
      Normal: 0,
      Hard: 233684902,
      Brutal: 245432682,
      Nightmare: 174063706,
      keyUsed: 3
    },
    {
      name: '(BiБр) Крегул',
      Normal: 0,
      Hard: 86294505,
      Brutal: 132575017,
      Nightmare: 212524358,
      keyUsed: 3
    },
    {
      name: 'Oleg77713',
      Normal: 0,
      Hard: 55736919,
      Brutal: 182965952,
      Nightmare: 137540400,
      keyUsed: 3
    },
    {
      name: '(BiБр) Бітанга',
      Normal: 0,
      Hard: 119531541,
      Brutal: 125639447,
      Nightmare: 111014700,
      keyUsed: 3
    },
    {
      name: 'BIБP_Pashatko1',
      Normal: 0,
      Hard: 331013900,
      Brutal: 298319483,
      Nightmare: 238457580,
      keyUsed: 3
    },
    {
      name: 'Radoran',
      Normal: 0,
      Hard: 201410240,
      Brutal: 360557852,
      Nightmare: 12242130717,
      keyUsed: 3
    },
    {
      name: 'BIБP-Eriddicus',
      Normal: 0,
      Hard: 132847061,
      Brutal: 242949682,
      Nightmare: 56486785,
      keyUsed: 3
    },
    {
      name: '[BiБр] mykola',
      Normal: 0,
      Hard: 430713655,
      Brutal: 382776272,
      Nightmare: 363013947,
      keyUsed: 3
    },
    {
      name: '(BiБр) Кіясік',
      Normal: 0,
      Hard: 127530117,
      Brutal: 61803333,
      Nightmare: 214619372,
      keyUsed: 3
    },
    {
      name: 'МирославUA',
      Normal: 0,
      Hard: 436609310,
      Brutal: 699937447,
      Nightmare: 821325197,
      keyUsed: 3
    },
    {
      name: 'BEDbMAK_777',
      Normal: 0,
      Hard: 0,
      Brutal: 560973650,
      Nightmare: 452557066,
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
      Hard: 549198371,
      Brutal: 392014156,
      Nightmare: 685148575,
      keyUsed: 3
    },
    {
      name: 'Crystal Castle',
      Normal: 0,
      Hard: 408189521,
      Brutal: 432984143,
      Nightmare: 524092504,
      keyUsed: 3
    },
    {
      name: 'Ksondr',
      Normal: 0,
      Hard: 29559279,
      Brutal: 95167127,
      Nightmare: 273480568,
      keyUsed: 3
    },
    {
      name: 'VLAD_XIII',
      Normal: 0,
      Hard: 0,
      Brutal: 20598361,
      Nightmare: 116758947,
      keyUsed: 2
    },
    {
      name: 'AZAZEL',
      Normal: 0,
      Hard: 261193607,
      Brutal: 385127283,
      Nightmare: 224338719,
      keyUsed: 3
    },
    {
      name: 'Ухххх!!!!',
      Normal: 0,
      Hard: 113841632,
      Brutal: 144960398,
      Nightmare: 331580761,
      keyUsed: 3
    },
    {
      name: 'Glear20',
      Normal: 0,
      Hard: 105595076,
      Brutal: 142475495,
      Nightmare: 247922814,
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
      Normal: 40768012,
      Hard: 28697948,
      Brutal: 22161040,
      Nightmare: 0,
      keyUsed: 3
    },
    {
      name: 'bond7728',
      Normal: 0,
      Hard: 68800062,
      Brutal: 302893037,
      Nightmare: 416159892,
      keyUsed: 3
    },
    {
      name: 'Це_я',
      Normal: 0,
      Hard: 75836402,
      Brutal: 221507456,
      Nightmare: 125487443,
      keyUsed: 3
    },
    {
      name: 'Nigthfear',
      Normal: 213992812,
      Hard: 101567783,
      Brutal: 60398487,
      Nightmare: 0,
      keyUsed: 3
    },
    {
      name: 'Kola22',
      Normal: 0,
      Hard: 42730374,
      Brutal: 24340994,
      Nightmare: 181443087,
      keyUsed: 3
    },
    {
      name: '17SCARPIONN',
      Normal: 89606915,
      Hard: 139816161,
      Brutal: 171549242,
      Nightmare: 0,
      keyUsed: 3
    },
    {
      name: '[АПОФІС]',
      Normal: 0,
      Hard: 29415311,
      Brutal: 52531169,
      Nightmare: 43878452,
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
