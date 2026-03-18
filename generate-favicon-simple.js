const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// 创建一个简单的32x32的画布
const canvas = createCanvas(32, 32);
const ctx = canvas.getContext('2d');

// 绘制背景
ctx.beginPath();
ctx.arc(16, 16, 16, 0, Math.PI * 2);
ctx.fillStyle = '#6366f1';
ctx.fill();

// 绘制FT文字
ctx.font = 'bold 16px Arial';
ctx.fillStyle = 'white';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('FT', 16, 16);

// 保存为PNG
const pngPath = path.join(__dirname, 'public', 'favicon.png');
const out = fs.createWriteStream(pngPath);
const stream = canvas.createPNGStream();

stream.pipe(out);
out.on('finish', () => {
    console.log('PNG icon generated at:', pngPath);
    
    // 创建简单的ICO文件头
    const pngData = fs.readFileSync(pngPath);
    
    // ICO文件格式
    const icoHeader = Buffer.alloc(22);
    
    // ICO头
    icoHeader.writeUInt16LE(0, 0); // 保留字段
    icoHeader.writeUInt16LE(1, 2); // 类型：1 = ICO
    icoHeader.writeUInt16LE(1, 4); // 图像数量
    
    // 图像目录
    icoHeader.writeUInt8(32, 6);   // 宽度
    icoHeader.writeUInt8(32, 7);   // 高度
    icoHeader.writeUInt8(0, 8);    // 颜色数
    icoHeader.writeUInt8(0, 9);    // 保留
    icoHeader.writeUInt16LE(1, 10); // 颜色平面
    icoHeader.writeUInt16LE(32, 12); // 每像素位数
    icoHeader.writeUInt32LE(pngData.length, 14); // 图像数据大小
    icoHeader.writeUInt32LE(22, 18); // 图像数据偏移量
    
    // 合并ICO头和PNG数据
    const icoData = Buffer.concat([icoHeader, pngData]);
    
    // 保存ICO文件
    const icoPath = path.join(__dirname, 'public', 'favicon.ico');
    fs.writeFileSync(icoPath, icoData);
    console.log('ICO icon generated at:', icoPath);
    console.log('ICO file size:', icoData.length, 'bytes');
});