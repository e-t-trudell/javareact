var path = require('path');

module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            }
        ]
    }
};

/* This webpack configuration file:
Defines the entry point as ./src/main/js/app.js. In essence, app.js (a module you will write shortly) is the proverbial public static void main() of our JavaScript application. webpack must know this in order to know what to launch when the final bundle is loaded by the browser.
Creates sourcemaps so that, when you are debugging JS code in the browser, you can link back to original source code.
Compile ALL of the JavaScript bits into ./src/main/resources/static/built/bundle.js, which is a JavaScript equivalent to a Spring Boot uber JAR. All your custom code AND the modules pulled in by the require() calls are stuffed into this file.
It hooks into the babel engine, using both es2015 and react presets, in order to compile ES6 React code into a format able to be run in any standard browser.
Want to see your JavaScript changes automatically? Run npm run-script watch to put webpack into watch mode. It will regenerate bundle.js as you edit the source.
*/