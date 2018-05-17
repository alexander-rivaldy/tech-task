import 'babel-polyfill';
import 'babel-register';
import express from 'express';
import exphbs from 'express-handlebars';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import path from 'path';
import config from './config/config';
import routes from './config/routes';
import middleware from './config/middleware';
import services from './config/services';
import Container from './lib/Container';
import ServiceContainer from './lib/ServiceContainer';
import RouteLoader from './lib/RouteLoader';
import MiddlewareLoader from './lib/MiddlewareLoader';
import ConsoleLoggerFactory from './lib/logger/ConsoleLoggerFactory';
import InvalidRouteRedirectMiddleware from './lib/middleware/InvalidRouteRedirectMiddleware';

// logger for server
const consoleLoggerFactory = new ConsoleLoggerFactory();
const invalidRouteRedirectMiddleware = new InvalidRouteRedirectMiddleware();
const logger = consoleLoggerFactory.createInstance();

const container = new Container(logger);
container.register('config', [], config);


const server = express();
const router = express.Router();
const routeLoader = new RouteLoader(container, router, logger);
const serviceContainer = new ServiceContainer(container, services, logger);
const middlewareLoader = new MiddlewareLoader(container, server, router, logger);

serviceContainer.setRootPath(__dirname);
serviceContainer.registerServices();

server.use(compression());

if (config.templateEngine) {
    server.engine(config.templateEngine.extension, exphbs({
        layoutsDir: `${__dirname}/${config.templateEngine.layout}`,
        defaultLayout: config.templateEngine.defaultTemplate,
        extname: config.templateEngine.extension,
        partialsDir: `${__dirname}/${config.templateEngine.partialsDir}`,
    }));
    server.set('view engine', config.templateEngine.extension);
    server.set('views', path.join(__dirname, '/modules/'));
}

logger.info('static path /public = ' +path.join(__dirname,config.staticPath));

if (config.staticPath) {
    server.use('/public', express.static(path.join(__dirname,config.staticPath)));
}

server.use(morgan('combined'));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

middlewareLoader.load(middleware.middlewareStack);
routeLoader.load(routes);

server.use(`/`, router);
server.use('*', (req, res) => {
    invalidRouteRedirectMiddleware.invoke(req, res);
});



server.listen(config.server.port, async () => {
    logger.info('*******************************************************************************************');
    logger.info(`* Server is running ${config.server.protocol}://${config.server.domain}:${config.server.port}`);
    logger.info(`* Environment ${process.env.NODE_ENV}                                                     `);
    logger.info('*******************************************************************************************');
});
