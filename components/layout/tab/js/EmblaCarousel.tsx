import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from './dotbutton'
import { NextButton, PrevButton, usePrevNextButtons } from './arrowbutton'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

type PropType = {
    slides: any
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Autoplay({ delay: 3000, stopOnInteraction: false })
    ])

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <section className="embla ">

            <div className="embla__viewport w-[24rem]  sm:w-[50rem] h-[10rem] sm:h-[21rem] my-[10px]" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((index: any) => (
                        <div className="embla__slide" key={index.id}>
                            <div className="embla__slide__number">
                                <Image src={index.img} fill
                                    alt="Picture of the author"></Image></div>
                        </div>
                    ))}
                </div>
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} className='absolute left-0 embla__button top-[40%]' />
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} className='absolute right-0  embla__button top-[40%]' />

                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'embla__dot'.concat(
                                index === selectedIndex ? ' embla__dot--selected' : ''
                            )}
                        />
                    ))}
                </div>
            </div>


        </section>
    )
}

export default EmblaCarousel
