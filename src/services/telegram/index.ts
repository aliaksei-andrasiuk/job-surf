import { bot } from './client';
import * as commands from './commands';

export default () => {
    Object.keys(commands).forEach(name => {
        bot.command(name, commands[name]);
    })
    
    bot.launch();
}

