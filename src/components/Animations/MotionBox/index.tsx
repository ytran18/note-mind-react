import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, ReactNode } from "react";
import { useInView } from "react-intersection-observer";

interface MotionBoxProps {
    children: ReactNode;
    animation: Variants;
    className?: string;
}

const MotionBox: React.FC<MotionBoxProps> = ({
    children,
    animation,
    className = "",
}) => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [inView, controls]);

    return (
        <div ref={ref} className={`${className}`}>
            <motion.div
                initial="hidden"
                animate={controls}
                exit="hidden"
                variants={animation}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default MotionBox;
