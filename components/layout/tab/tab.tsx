'use client'
import { EmblaOptionsType } from 'embla-carousel'
import './css/embla.css'
import EmblaCarousel from './js/EmblaCarousel'



const OPTIONS: EmblaOptionsType = { loop: true }

const SLIDES = [
    {
        img: '/images/1328396.png',
        id: 1
    },
    {
        img: '/images/Screenshot 2024-08-24 233347.png',
        id: 2
    },
    {
        img: '/images/Screenshot 2024-08-28 220238.png',
        id: 3
    },
    {
        img: '/images/Screenshot 2024-10-25 153009.png',
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