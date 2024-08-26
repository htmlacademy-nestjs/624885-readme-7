import { resolve } from 'node:path';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

export function getMailerAsyncOptions(optionSpace: string): MailerAsyncOptions {
  const options = {
    useFactory: async (configService: ConfigService) => {
      return {
        transport: {
          host: configService.get<string>(`${optionSpace}.host`),
          port: configService.get<number>(`${optionSpace}.port`),
          secure: false
        },
        defaults: {
          from: configService.get<string>('mail.from')
        },
        template: {
          dir: resolve(__dirname, 'assets'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }
    },
    inject: [ConfigService]
  }
  return options;
}
