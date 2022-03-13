import ts from 'rollup-plugin-typescript2';
import livereload from 'rollup-plugin-livereload';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import path from 'path'

export default {
    input: './src/index.ts',
    output: {
        file: path.resolve('dist/bundle.js'),
        format: 'umd',
        sourcemap:true,
        name:"dxamiter"

    },
    watch: {
        exclude: 'node_modules/**',
    },
    plugins: [
        nodeResolve({
            extensions:['.js','.ts']
        }),
        livereload(),
        ts({
            tsconfig:path.resolve(__dirname,'tsconfig.json')
        }),
        serve({
            open:true,
            openPage:'/public/index.html',
            port:3000,
            contentBase:''
        })
    ]
}