const path = require('path');
const CracoAlias = require('craco-alias');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                aliases: {
                    '@': 'src'
                }
            }
        }
    ],
    jest: {
        configure: {
            moduleNameMapper: {
                '^@/(.*)$': '<rootDir>/src/$1'
            }
        }
    }
};
