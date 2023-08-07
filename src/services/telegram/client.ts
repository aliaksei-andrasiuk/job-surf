import config from 'config';
import { Telegraf } from 'telegraf';

export const bot = new Telegraf(config.get('tgToken'));
