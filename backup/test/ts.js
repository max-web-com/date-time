#!/usr/local/bin/node


const compile = require('google-closure-compiler-js').compile;

const flags = {
	jsCode: [{
		src: 'class Friend{ testFunc(){return "hi man";}}'
	}],
	compilationLevel: "ADVANCED"
};
const out = compile(flags);
console.info(out.compiledCode); // will print 'var x = 3;\n'

// var tss = require('typescript-simple');

// var js = tss('class Friend{private test: String = "hi";}', {
// 	target: 'es6'
// });
// console.log(js); // 'var n = 1;'
// var js = tss('var n: number = 1;');
// console.log(js); // 'var n = 1;'

// js = tss('var n: number = 2;');
// console.log(js); // 'var n = 1;'


// const ts = require("typescript");
// // import * as ts from "typescript";

// const source = "let x: string  = 'string'";

// let result = ts.transpileModule(source, {
// 	compilerOptions: {
// 		module: ts.ModuleKind.CommonJS
// 	}
// });

// console.log(JSON.stringify(result));