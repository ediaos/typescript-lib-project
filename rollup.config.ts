import resolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import rollupReplace from 'rollup-plugin-replace'
import license from 'rollup-plugin-license'
const pkg = require('./package.json')

process.env.VERSION = pkg.version
const isDev = process.env.NODE_ENV === 'development'

const libraryName = 'ts-lib-project'
const banner = `/*!
 * typescript-project v${process.env.VERSION}
 * © ${new Date().getFullYear()} EDiaos
 */`
// support muti output
let multiple = [
  {
    input: isDev ? 'src/demo/index.ts' : `src/index.ts`,
    output: [
      {
        file: isDev ? 'src/demo/dist/demo.umd.js' : pkg.main,
        name: camelCase(libraryName),
        format: 'umd',
        sourcemap: true
      }
    ]
  }
]

let defaultConfig = {
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps(),
    // add env for project
    rollupReplace({
      'process.env.NODE_ENV': JSON.stringify(
        isDev ? 'development' : 'production'
      ),
      'process.env.VERSION': JSON.stringify(pkg.version)
    }),
    // add license for dist
    license({
      banner
    })
  ].concat(
    isDev
      ? [
          serve({
            open: true,
            contentBase: 'src/demo',
            port: 8080
          }),
          livereload({
            watch: 'src/demo/dist'
          })
        ]
      : []
  )
}
const multipleList = multiple.map(config => {
  return Object.assign(config, defaultConfig)
})
export default multipleList
