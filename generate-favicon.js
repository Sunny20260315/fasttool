import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';
// 使用动态导入来处理ES模块
import pngToIco from 'png-to-ico';

// 创建一个64x64的画布
const canvas = createCanvas(64, 64);
const ctx = canvas.getContext('2d');

// 绘制背景
ctx.beginPath();
ctx.arc(32, 32, 32, 0, Math.PI * 2);
ctx.fillStyle = '#6366f1';
ctx.fill();

// 绘制FT文字
ctx.font = '32px Arial';
ctx.fillStyle = 'white';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('FT', 32, 32);

// 保存为PNG
const pngPath = path.join(__dirname, 'public', 'favicon.png');
const out = fs.createWriteStream(pngPath);
const stream = canvas.createPNGStream();

stream.pipe(out);
out.on('finish', async () => {
    console.log('PNG icon generated at:', pngPath);
    
    // 转换为ICO
    try {
        const icoBuffer = await pngToIco(pngPath);
        const icoPath = path.join(__dirname, 'public', 'favicon.ico');
        fs.writeFileSync(icoPath, icoBuffer);
        console.log('ICO icon generated at:', icoPath);
    } catch (error) {
        console.error('Error converting to ICO:', error);
    }
});
