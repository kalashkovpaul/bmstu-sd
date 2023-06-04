import { time } from 'console';
import {createLogger, transports, format } from 'winston';
import { logConfig } from './configs/log.config';
import 'winston-daily-rotate-file';

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.printf(({timestamp, level, message}) => {
            return `[${timestamp}] ${level}: ${message}`
        })
    ),
    transports: [
        new transports.File({filename: logConfig.errorPath, level: "warn"}),
        new transports.File({filename: logConfig.infoPath}),
        new transports.DailyRotateFile({
            filename: logConfig.errorPath,
            level: "warn",
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m'
        }),
        new transports.DailyRotateFile({
            filename: logConfig.infoPath,
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m'
        }),
    ],
});

export default logger;