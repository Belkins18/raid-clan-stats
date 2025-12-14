import type { IHydraStatisticsData } from './types'

export * as dataType from './types'

export const newRotation = {
  id: '03-12-2025_10-12-2025',
  data: [
	{
		name: 'МирославUA',
		Normal: 0,
		Hard: 336160188,
		Brutal: 471422409,
		Nightmare: 923378456,
		keyUsed: 3,
	},
	{
		name: '[BiБр] Belkins',
		Normal: 0,
		Hard: 327263383,
		Brutal: 456266118,
		Nightmare: 665101380,
		keyUsed: 3,
	},
	{
		name: 'Crystal Castle',
		Normal: 0,
		Hard: 267750640,
		Brutal: 439346029,
		Nightmare: 423369215,
		keyUsed: 3,
	},
	{
		name: 'Dreadnought UA',
		Normal: 0,
		Hard: 359934073,
		Brutal: 309567639,
		Nightmare: 466511855,
		keyUsed: 3,
	},
	{
		name: 'BEDbMAK_777',
		Normal: 0,
		Hard: 231332871,
		Brutal: 452900367,
		Nightmare: 411389660,
		keyUsed: 3,
	},
	{
		name: 'NikR0man',
		Normal: 0,
		Hard: 229696790,
		Brutal: 276005729,
		Nightmare: 518341460,
		keyUsed: 3,
	},
	{
		name: '[BiБр] mykola',
		Normal: 0,
		Hard: 293114772,
		Brutal: 319252486,
		Nightmare: 367622844,
		keyUsed: 3,
	},
	{
		name: 'AZAZEL',
		Normal: 0,
		Hard: 249701927,
		Brutal: 394435069,
		Nightmare: 241657723,
		keyUsed: 3,
	},
	{
		name: 'BIБP_Pashatko1',
		Normal: 0,
		Hard: 256268621,
		Brutal: 270351772,
		Nightmare: 215220235,
		keyUsed: 3,
	},
	{
		name: 'bond7728',
		Normal: 0,
		Hard: 109115853,
		Brutal: 114230199,
		Nightmare: 385249226,
		keyUsed: 3,
	},
	{
		name: 'Radoran',
		Normal: 0,
		Hard: 261244545,
		Brutal: 287266890,
		Nightmare: 159025153,
		keyUsed: 3,
	},
	{
		name: 'kill softly',
		Normal: 0,
		Hard: 41120160,
		Brutal: 98564936,
		Nightmare: 408558559,
		keyUsed: 3,
	},
	{
		name: 'Акробат22',
		Normal: 0,
		Hard: 132546434,
		Brutal: 246151679,
		Nightmare: 189576026,
		keyUsed: 3,
	},
	{
		name: 'Glear20',
		Normal: 0,
		Hard: 125584795,
		Brutal: 61007613,
		Nightmare: 241329143,
		keyUsed: 3,
	},
	{
		name: '(BiБр) Крегул',
		Normal: 158971449,
		Hard: 0,
		Brutal: 63373346,
		Nightmare: 192010582,
		keyUsed: 3,
	},
	{
		name: 'Ksondr',
		Normal: 0,
		Hard: 22156103,
		Brutal: 43017870,
		Nightmare: 232041723,
		keyUsed: 3,
	},
	{
		name: '(BiБр) Кіясік',
		Normal: 0,
		Hard: 153675860,
		Brutal: 248983688,
		Nightmare: 0,
		keyUsed: 2,
	},
	{
		name: 'Ухххх!!!!',
		Normal: 0,
		Hard: 203343264,
		Brutal: 46504747,
		Nightmare: 124935443,
		keyUsed: 3,
	},
	{
		name: 'Oleg77713',
		Normal: 178819304,
		Hard: 169249634,
		Brutal: 113474378,
		Nightmare: 0,
		keyUsed: 3,
	},
	{
		name: 'Це_я',
		Normal: 0,
		Hard: 99325201,
		Brutal: 115578007,
		Nightmare: 60626002,
		keyUsed: 3,
	},
	{
		name: 'BIБP-Eriddicus',
		Normal: 0,
		Hard: 36593187,
		Brutal: 132149651,
		Nightmare: 57313018,
		keyUsed: 3,
	},
	{
		name: 'Kola22',
		Normal: 0,
		Hard: 80112595,
		Brutal: 87615213,
		Nightmare: 58025915,
		keyUsed: 3,
	},
	{
		name: 'Nigthfear',
		Normal: 180803744,
		Hard: 105089876,
		Brutal: 61451686,
		Nightmare: 0,
		keyUsed: 3,
	},
	{
		name: '17SCARPIONN',
		Normal: 19139134,
		Hard: 136552454,
		Brutal: 51927805,
		Nightmare: 0,
		keyUsed: 3,
	},
	{
		name: 'VLAD_XIII',
		Normal: 32116806,
		Hard: 28466111,
		Brutal: 54360971,
		Nightmare: 0,
		keyUsed: 3,
	},
	 {
      name: 'Xopcuk',
      Normal: 116972187,
      Hard: 66569199,
      Brutal: 0,
      Nightmare: 0,
      keyUsed: 3
    },

		 {
      name: '(BiБр) Бітанга',
      Normal: 0,
      Hard: 0,
      Brutal: 0,
      Nightmare: 47236965,
      keyUsed: 1
    },
		{
      name: '[АПОФІС]',
      Normal: 18205904,
      Hard: 8635772,
      Brutal: 20217095,
      Nightmare: 0,
      keyUsed: 3
    },
		 {
      name: 'Berserk [UA]',
      Normal: 21539230,
      Hard: 21882522,
      Brutal: 6557155,
      Nightmare: 0,
      keyUsed: 3
    },
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
