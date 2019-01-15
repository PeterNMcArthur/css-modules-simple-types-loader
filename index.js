const {basename} = require("path");
const {readFile, writeFile} = require("fs");
const keyWords = require("./reserved_words");

const isValidTypeScriptVariable = (className) => /^[^-]+$/ig.test(className);

const exportString = (className) => `export const ${className}: string;`;

const makeExportStatement = (classNameList, className) => keyWords.includes(className) ? classNameList : classNameList.concat([exportString(className)]);

module.exports = function loader(webpackSource) {
	this.cacheable();

	const callback = this.async();

	function end(err) {
		return err ? callback(err) : callback(null, webpackSource);
	}

	const match = webpackSource.match(/exports\.locals.*=([^]*?);/);

	if (match) {
		const locals = [];

		match[1]
			.split('\n')
			.map(s => {
			const keyMatch = s.match(/"(.*?)": /);

			if (keyMatch) {
				locals.push(keyMatch[1]);
			}
		});

		if (locals.length) {
			const output = locals
				.filter(isValidTypeScriptVariable)
				.reduce(makeExportStatement, [])
				.join('\n');

			const filename = `${this.resource}.d.ts`;

			readFile(filename, (err, data) => {
				if (err || data != output) {
					writeFile(filename, output, end);
				} else {
					end();
				}
			});

		} else {
			end();
		}
	} else {
		end();
	}

}
