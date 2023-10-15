import React from 'react';
import { Svg, Path, Defs, Stop, LinearGradient } from 'react-native-svg';

export const WaveBottom = () => {
    return (
        <Svg width="428" height="175" viewBox="0 0 428 175" fill="none" className='absolute bottom-0'>
            <Path d="M-43 0C0.166668 38 110.2 106.5 205 76.5C299.8 46.5 423.167 64 473 76.5V263.5H-43V0Z" fill="url(#paint0_linear_2_14)"/>
            <Defs>
            <LinearGradient id="paint0_linear_2_14" x1="232" y1="31" x2="215" y2="263.5" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FCFCFC"/>
            <Stop offset="1" stopColor="#33BCD8" stop-opacity="0"/>
            </LinearGradient>
            </Defs>
        </Svg>
    );
}