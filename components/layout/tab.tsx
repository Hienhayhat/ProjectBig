'use client'
import { EmblaOptionsType } from 'embla-carousel'

import './tab/css/embla.css'
import './tab/css/sandbox.css'
import EmblaCarousel from './tab/js/EmblaCarousel'


const OPTIONS: EmblaOptionsType = { loop: true }

const SLIDES = [
    {
        img: '/images/1328396.png',
        id: 1
    },
    {
        img: '/images/1328396.png',
        id: 2
    },
    {
        img: '/images/1328396.png',
        id: 3
    },
    {
        img: '/images/1328396.png',
        id: 4
    }
]

const Carousel = () => {
    return (
        <>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />

        </>
    )
}


export default Carousel