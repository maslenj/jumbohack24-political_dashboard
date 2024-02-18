/* eslint-disable no-shadow */
import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const RADIAN = Math.PI / 180;
const data = [
    { name: 'negative', value: 10, color: '#DDD6FE' },
    { name: 'slightly-negative', value: 10, color: '#C1ACFF' },
    { name: 'neutral', value: 10, color: '#A78BFA' },
    { name: 'slightly-positive', value: 10, color: '#9259F4' },
    { name: 'positive', value: 10, color: '#7C3AED' },
];
const cx = 140;
const cy = 100;
const iR = 50;
const oR = 100;

const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
        total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
        <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
        <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
    ];
};

export default function VibeMeter({vibe}) {
    let value = 25;
    if (vibe === 'Positive') {
        value = 45;
    } else if (vibe === 'Slightly Positive') {
        value = 35;
    } else if (vibe === 'Neutral') {
        value = 25;
    } else if (vibe === 'Slightly Negative') {
        value = 15;
    } else {
        value = 5;
    }
    return (
        <>
            <PieChart width={300} height={130}>
                <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={data}
                    cx={cx}
                    cy={cy}
                    innerRadius={iR}
                    outerRadius={oR}
                    fill="#8884d8"
                    stroke="none"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                {needle(value, data, cx, cy, iR, oR, '#FEFEFF')}
            </PieChart>
            <p className='text-2xl text-center text-white'> Vibe Meter: {vibe} </p>
        </>
    );
}
