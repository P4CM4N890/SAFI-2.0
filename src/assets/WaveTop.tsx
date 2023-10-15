import React from 'react';
import { Svg, Path, Defs, Stop, LinearGradient } from 'react-native-svg';

export const WaveTop = () => {
    return (
        <Svg width="428" height="297" viewBox="0 0 428 297" fill="none" className='absolute'>
            <Path d="M-30 296.5C8.16667 295.667 108.6 279 205 219C301.4 159 420.167 164 467.5 174V-45L-40 -6L-30 296.5Z" fill="url(#paint0_linear_2_31)"/>
            <Defs>
                <LinearGradient id="paint0_linear_2_31" x1="213.75" y1="-45" x2="289.5" y2="285" gradientUnits="userSpaceOnUse">
                <Stop stopColor="#33BCD8"/>
                <Stop offset="1" stopColor="#FCFCFC" stop-opacity="0"/>
                </LinearGradient>
            </Defs>
        </Svg>

    );
}