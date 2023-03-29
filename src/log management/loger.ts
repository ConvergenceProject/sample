import { createLogger, transports, format } from "winston";

const Logger = createLogger({
  transports: [
    new transports.File({
      dirname: "logs",
      filename: "winston_example.log",
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message, service }) => {
      return `[${timestamp}] ${service} ${level}: ${message}`;
    })
  ),
  defaultMeta: {
    service: "WinstonExample",
  },
});

export default Logger;