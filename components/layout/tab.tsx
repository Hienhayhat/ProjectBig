'use client'
import { EmblaOptionsType } from 'embla-carousel'
import './tab/css/base.css'
import './tab/css/embla.css'
import './tab/css/sandbox.css'
import EmblaCarousel from './tab/js/EmblaCarousel'

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Carousel = () => {
    return (
        <>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />

        </>
    )
}


export default Carousel