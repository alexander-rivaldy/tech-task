export default {
    server: {
        protocol: 'https',
        port: 8080,
        domain: 'localhost',
    },
    logger: {
        transports: [
            {
                type: 'ConsoleLoggerTransport',
                options: {
                    level: 'debug',
                    timestamp: true,
                },
            }
        ],
    },
    templateEngine: {
        defaultTemplate: 'index.hbs',
        layout: 'views/layout',
        partialsDir: '/views/partials',
        extension: '.hbs'
    },
    staticPath: 'public/'
};
