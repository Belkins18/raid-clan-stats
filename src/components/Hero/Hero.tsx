import { useMemo, type FC, type HTMLAttributes } from 'react'

import classNames from 'classnames'
import { Typography } from 'antd'

import { HeroTypes, type BlessingTypes, type IHero } from './types'
import { getHeroInfo, getBlessingInfo } from './types/utils'
import StarIcon from '@/assets/svg/star.svg?react'

const { Text } = Typography

interface IHeroProps {
	hero: IHero
}

const Hero: FC<IHeroProps> = ({ hero }) => {
	const { HeroID, BlessingID } = hero

	const rarityColor = {
		[HeroTypes.HeroConstants.Rarity[1]]: '#999999',
		[HeroTypes.HeroConstants.Rarity[2]]: '#52c41a',
		[HeroTypes.HeroConstants.Rarity[3]]: '#1677ff',
		[HeroTypes.HeroConstants.Rarity[4]]: '#e247c7',
		[HeroTypes.HeroConstants.Rarity[5]]: '#e5c137',
		[HeroTypes.HeroConstants.Rarity[6]]: '#ff0f10'
	}

	const heroInfo = useMemo(() => {
		return getHeroInfo(HeroID)
	}, [HeroID])
	const blessingInfo = useMemo(() => {
		if (!BlessingID) return
		return getBlessingInfo(BlessingID)
	}, [BlessingID])

	console.log('heroInfo: ', heroInfo)
	console.log('blessingInfo: ', blessingInfo)

	const HeroIcon = () => {
		const placeholder = new URL('/src/assets/images/Champions/Placeholder.png', import.meta.url)
			.href
		return (
			<img
				src={heroInfo.ImageURL}
				alt={heroInfo.Name}
				onError={(e) => {
					e.currentTarget.onerror = null
					e.currentTarget.src = placeholder
				}}
				className="w-full object-cover block aspect-140/182"
			/>
		)
	}

	const RarityIcon = () => {
		const rarityImg = new URL(`/src/assets/images/Rarity/${heroInfo.Rarity}.png`, import.meta.url)
			.href

		return (
			<img
				src={rarityImg}
				alt={heroInfo.Rarity}
				className="absolute top-0 w-full object-cover block aspect-140/182 "
			/>
		)
	}

	type IAffinityIconProps = HTMLAttributes<HTMLDivElement>
	const AffinityIcon: FC<IAffinityIconProps> = ({ className }) => {
		const affinityImg = new URL(
			`/src/assets/images/Affinity/${heroInfo.Affinity}.png`,
			import.meta.url
		).href

		return (
			<img
				src={affinityImg}
				alt={heroInfo.Affinity}
				className={classNames(className, 'absolute w-[30px]')}
			/>
		)
	}

	type IRangAndAwakenedProps = HTMLAttributes<HTMLDivElement>
	const RangAndAwakened: FC<IRangAndAwakenedProps> = ({ className }) => {
		const { Rank, Ascended, Awakened } = hero

		const stars = Array.from({ length: Rank }, (_, index) => {
			if (index < Awakened)
				return <StarIcon className="w-[16px] h-[16px]" style={{ color: '#ff0f10' }} />
			if (index < Ascended)
				return <StarIcon className="w-[16px] h-[16px]" style={{ color: '#e247c7' }} />
			return <StarIcon className="w-[16px] h-[16px]" style={{ color: '#e5c137' }} />
		})

		return (
			<div
				className={classNames(className, 'absolute inline-flex z-10 p-2')}
				style={{ marginInlineStart: '7px' }}
			>
				{stars.map((star, i) => {
					return (
						<span key={i} style={{ marginInlineStart: '-7px' }}>
							{star}
						</span>
					)
				})}
			</div>
		)
	}

	interface IBlessingProps extends HTMLAttributes<HTMLDivElement> {
		data: BlessingTypes.TBlessingInfo
	}
	const Blessing: FC<IBlessingProps> = ({ data, className }) => {
		const { Rarity, Name, Type } = data

		const blessingIcon = new URL(`/src/assets/images/Blessing/${Type}/${Rarity}/${Name}.png`, import.meta.url)
			.href

		return (
			<>
				<div className={className}>
					<div
						className={`
				bg-[#000]
				w-[26px] h-[36px]
        [clip-path:polygon(50%_0%,50%_0%,100%_20%,100%_80%,50%_100%,50%_100%,0_80%,0_20%)]
        flex items-center justify-center
				relative`}
					>
						<div
							className={`
        [clip-path:polygon(50%_0%,50%_0%,100%_20%,100%_80%,50%_100%,50%_100%,0_80%,0_20%)]
        flex items-center justify-center
      `}
							style={{
								width: 'calc(100% - 1px)',
								height: 'calc(100% - 1px)',
								backgroundColor: `${rarityColor[Rarity]}`
							}}
						>
							<div
								className={`
				
				bg-[#000000]
        [clip-path:polygon(50%_0%,50%_0%,100%_20%,100%_80%,50%_100%,50%_100%,0_80%,0_20%)]
      `}
								style={{
									width: 'calc(100% - 6px)',
									height: 'calc(100% - 6px)',
									boxShadow: '0px 0px 8px 1px rgba(255,255,255,0.65) inset'
								}}
							>
								<img
									src={blessingIcon}
									alt={Name}
									style={{
										top: '50%',
										left: '50%',
										transform: 'translateX(-50%)translateY(-50%)'
									}}
									className="absolute w-[60%]"
								/>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}

	interface IAuraIconProps extends HTMLAttributes<HTMLDivElement> {
		Auara: HeroTypes.Aura
	}
	const AuraIcon: FC<IAuraIconProps> = ({ Auara, className }) => {
		const auraImg = new URL(`/src/assets/images/Aura/${Auara}.png`, import.meta.url).href

		console.log(auraImg)

		return (
			<div
				className={classNames(
					'w-[28px] h-[35px]  overflow-hidden inline-flex justify-center items-center rounded-t-[3px]',
					className
				)}
			>
				<div
					className="
      w-full h-full bg-white 
      [clip-path:polygon(0%_0%,100%_0%,100%_79%,50%_100%,0%_79%)]
      overflow-hidden
      flex justify-center items-center
    "
				>
					<img
						src={auraImg}
						alt={Auara}
						className="w-full max-w-[24px] object-cover block aspect-127/160"
					/>
				</div>
			</div>
		)
	}

	const Level = () => {
		return <div className='absolute flex justify-center  bg-[#212121] w-[24px] right-[6px] bottom-[8px] font-bold'>
			<Text style={{ color: '#fff', fontSize: '16px' }}>
				{hero.Level}
			</Text>
		</div>
	}

	return (
		<>
			{/*  */}

			{/* 
			</div> */}
			<div className={'flex gap-1'}>
				{/* overflow-hidden */}
				<div className="relative w-[100px] shrink-0 ">
					<HeroIcon />
					<RarityIcon />
					<AffinityIcon className="bottom-[10px] left-[5px]" />
					<RangAndAwakened className="top-[7px] left-[6px]" />
					{blessingInfo && (
						<Blessing
							data={blessingInfo}
							className="flex justify-center w-full absolute bottom-2"
						/>
					)}
					{heroInfo.Aura && (
						<AuraIcon Auara={heroInfo.Aura} className="absolute top-[4px] right-[-2px]" />
					)}
					<Level />
				</div>
			</div>
		</>
	)
}

export default Hero