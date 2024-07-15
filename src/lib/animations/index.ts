import { Variants } from "framer-motion";

export const fadeIn = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

export const slideIn = (delay: number): Variants => ({
    hidden: { x: "-100vw" },
    visible: { x: 0, transition: { duration: 0.5, delay } },
});

export const bounce = (delay: number): Variants => ({
    hidden: { y: -30 },
    visible: {
        y: 0,
        transition: { duration: 0.5, delay, yoyo: Infinity, ease: "easeOut" },
    },
});

export const slideInFromLeft = (delay: number): Variants => ({
    hidden: { x: "-100vw" },
    visible: { x: 0, transition: { duration: 0.5, delay } },
});

export const slideInFromRight = (delay: number): Variants => ({
    hidden: { x: "100vw" },
    visible: { x: 0, transition: { duration: 0.5, delay } },
});

export const scaleUp = (delay: number): Variants => ({
    hidden: { scale: 0.8, opacity: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay } },
});

export const rotateIn = (delay: number): Variants => ({
    hidden: { rotate: -90, x: '-100vw' },
    visible: { x: 0, rotate: 0, transition: { duration: 0.5, delay } },
});
