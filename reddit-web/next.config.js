const path = require('path')
// module.exports = withSass({
//     /* bydefault config  option Read For More Optios
//     here https://github.com/vercel/next-plugins/tree/master/packages/next-sass
//     */
//     cssModules: true
// })
module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        });
        return config;
    }
};