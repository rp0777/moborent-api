// src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const defaultStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    const defaultMessage = 'Internal server error';

    let status = defaultStatus;
    let message = defaultMessage;
    let errorType = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const r = res as Record<string, any>;
        message = typeof r.message === 'string' ? r.message : defaultMessage;
        errorType = typeof r.error === 'string' ? r.error : exception.name;
      }
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      error: errorType,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
