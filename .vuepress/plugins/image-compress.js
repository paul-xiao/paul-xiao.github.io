
//5n2NCSj2zzbwRxJQ316bSzbPFyKd8VfF
// 压缩并替换当前文件
const tinify = require('tinify');
const fs = require('fs');
const path = require('path');
const dest = '../test'
const ProgressBar = require('./ProgressBar');
const Bar = new ProgressBar();

// API Key
tinify.key = '5n2NCSj2zzbwRxJQ316bSzbPFyKd8VfF';

// 执行图片压缩任务，返回promise对象
const task = (path, index) => {
    const source = tinify.fromFile(path);
    source.toFile(path).then(() => {
      console.log('done')
      Bar.update(index)
    }).catch(() => {
      Bar.next();
    });
}


const compress = async() => {
  const files = fs.readdirSync(dest) // 返回文件名列表
  const pwd = fs.realpathSync(process.cwd());
  Bar.init(files.length)
  // 只考虑第一层 未第归
  for(const [index,file] of files.entries()){
    try {
      const filePath = `${path.resolve(pwd, dest)}/${file}`
      fs.accessSync(filePath);
      await task(filePath, index)
    } catch (err) {
       console.error(err.message);

    }
  }
}

compress()