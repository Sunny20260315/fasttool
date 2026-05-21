import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';

const app = express();
const upload = multer({ dest: 'temp/uploads/' });
const execAsync = promisify(exec);

// 确保临时目录存在
async function ensureTempDirs() {
  await fs.mkdir('temp/uploads', { recursive: true });
  await fs.mkdir('temp/outputs', { recursive: true });
}

// Markdown转PDF API
app.post('/api/markdown-to-pdf', upload.single('markdownFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const inputPath = req.file.path;
    const outputPath = path.join('temp/outputs', `${path.basename(inputPath, path.extname(inputPath))}.pdf`);
    
    // 使用Pandoc + XeLaTeX转换
    const command = `pandoc "${inputPath}" -o "${outputPath}" --pdf-engine=xelatex`;
    
    await execAsync(command);
    
    // 读取生成的PDF文件
    const pdfBuffer = await fs.readFile(outputPath);
    
    // 清理临时文件
    await Promise.all([
      fs.unlink(inputPath),
      fs.unlink(outputPath)
    ]);
    
    // 返回PDF文件
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${path.basename(outputPath)}"`);
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error('Markdown to PDF conversion error:', error);
    
    // 清理临时文件（如果存在）
    if (req.file?.path) {
      try {
        await fs.unlink(req.file.path);
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }
    }
    
    res.status(500).json({ 
      error: 'Conversion failed', 
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// 批量转换API
app.post('/api/markdown-to-pdf/batch', upload.array('markdownFiles'), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const files = req.files as Express.Multer.File[];
    const results = [];

    for (const file of files) {
      try {
        const inputPath = file.path;
        const outputPath = path.join('temp/outputs', `${path.basename(inputPath, path.extname(inputPath))}.pdf`);
        
        const command = `pandoc "${inputPath}" -o "${outputPath}" --pdf-engine=xelatex`;
        await execAsync(command);
        
        const pdfBuffer = await fs.readFile(outputPath);
        await fs.unlink(outputPath);
        
        results.push({
          filename: `${path.basename(inputPath, path.extname(inputPath))}.pdf`,
          success: true,
          size: pdfBuffer.length
        });
        
      } catch (fileError) {
        results.push({
          filename: file.originalname,
          success: false,
          error: fileError instanceof Error ? fileError.message : 'Unknown error'
        });
      } finally {
        // 清理输入文件
        try {
          await fs.unlink(file.path);
        } catch (cleanupError) {
          console.error('Cleanup error:', cleanupError);
        }
      }
    }
    
    res.json({ results });
    
  } catch (error) {
    console.error('Batch conversion error:', error);
    res.status(500).json({ 
      error: 'Batch conversion failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 启动服务器
async function startServer() {
  await ensureTempDirs();
  
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Markdown to PDF service running on port ${PORT}`);
  });
}

// 只在直接运行此文件时启动服务器
if (require.main === module) {
  startServer();
}

export default app;