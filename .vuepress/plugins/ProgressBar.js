const chalk = require("chalk");
const readline = require('readline');
const { bullet, tick, cross, pointerSmall, radioOff } = require('figures');
module.exports = class ProgressBar {
	constructor() {
		this.total;
		this.current;
		this.cursor;
		this.title;
		this.bar_length;
		this.cursorPos;
		this.barStartPos;
		this.barEndPos;
		this.percentage;
		this.dur;
	}

	init(total) {
		this.total = total;
		this.current = 0;
		this.cursor = 1;
		this.title = `Compressing`;
		this.bar_length = 25
		this.cursorPos = this.title.length + this.cursor
		this.barStartPos = this.title.length + 2 
		this.barEndPos = this.barStartPos + this.bar_length
		this.percentage = ` ${this.current}/${this.total} `
		this.dur = 0
    
		process.stdout.write(chalk.blue.bold(this.title))
		readline.cursorTo(process.stdout, this.title.length + 2)
		for (let i = 0; i < this.bar_length; i++) {
				process.stdout.write(chalk.bgWhiteBright('_'))
		}
		process.stdout.write(this.percentage)
		const loading = setInterval(() => {
			readline.cursorTo(process.stdout, this.barEndPos + 9)
			process.stdout.write(`${++this.dur}s`)
			if(this.current > this.total || this.current === this.total) {
				clearInterval(loading)
			}
		}, 50 );
	  }

	update(current) {
		const progress = (this.bar_length/this.total).toFixed(0)
		let char = '_'

		this.current = current
		this.cursor = this.current* progress
		this.cursorPos = this.title.length + this.cursor
		this.barStartPos = this.title.length + 2 
		this.barEndPos = this.barStartPos + this.bar_length
		this.percentage = ` ${this.current}/${this.total} `

		readline.cursorTo(process.stdout, this.cursorPos + 1 ) // readline.cursorTo(stream, x[, y][, callback])

		process.stdout.write(chalk.bgGreenBright(char.repeat(progress)));
		readline.cursorTo(process.stdout, this.barEndPos)
		process.stdout.write(this.percentage)
		if(this.current > this.total || this.current === this.total) {
			readline.clearLine()
			process.stdout.write('\n');
			process.stdout.write(chalk.blackBright(` ${chalk.blueBright.bold(tick)} Comporessed successfully in ${this.dur}s`));
			process.stdout.write('\n');
			process.exit();
		}
	}

	done() {
		this.cursor = this.bar_length + 1
		this.update(this.total)
	}
	next() {
		this.update(this.current ++ )
	}
};