
//5n2NCSj2zzbwRxJQ316bSzbPFyKd8VfF

const tinify = require('tinify');
const fs = require('fs');
const path = require('path');
// API Key
tinify.key = '5n2NCSj2zzbwRxJQ316bSzbPFyKd8VfF';

// 执行图片压缩任务，返回promise对象
const task = file => {
    const source = tinify.fromFile(file.fromFile);
    source.toFile(file.toFile).catch(err => {
       // if not support , cp file
       err.message && console.log('file not supported')
       console.log('===> copy file...')
       fs.copyFile(file.fromFile,file.toFile,function(err){
        if(err) console.log('something wrong was happened')
        else console.log('copy file succeed');
      })
    });
    return source._url;
}
// 通过输入文件夹和输出文件夹，返回一个数组
const fromDir = (inDir, outDir, _files = []) => {
    const files = fs.readdirSync(inDir);
    for (let file of files) {
        const filePath = `${inDir}/${file}`;
        const toFilePath = `${outDir}/${file}`;
        if (fs.statSync(filePath).isDirectory()) {
            fromDir(filePath, toFilePath, _files)
        } else {
            try {
                fs.accessSync(toFilePath);
            } catch (err) {
                _files.push({
                    fromFile: filePath,
                    toFile: toFilePath,
                });
            }
        }
    }
    return _files;
}

const rootDir = fs.realpathSync(process.cwd());
const screenshotDir = path.resolve(rootDir, '../public');
const screenshotOutDir = path.resolve(rootDir, '../public/images');

const files = fromDir(screenshotDir, screenshotOutDir);
console.log(files)
// 遍历数组，顺序执行各任务
if (files.length === 0) {
    return;
}
let current = task(files[0]);
for (let i = 1; i < files.length; i++) {
    console.log('compressing' + files[i])
    current = current.then(task(files[i])).catch(err => console.log(err.message));
}