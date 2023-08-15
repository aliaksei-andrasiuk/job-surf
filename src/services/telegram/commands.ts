import { v4 } from 'node-uuid';
import config from 'config';

import { NarrowedContext, Context } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';
import { UsersModel, SearchConfigsModel } from '../../models'

type TCommandCallback = NarrowedContext<Context<Update>, {
    message: Update.New & Update.NonChannel & Message.TextMessage;
    update_id: number;
}>

export const start = async (ctx: TCommandCallback) => {
    let user;

    try {
        if (ctx.from.is_bot) {
            ctx.reply('Sorry, it looks like you are bot. Please, become a human');

            return
        }

        user = await UsersModel.findOne({ tgId: ctx.from.id });

        if (!user) {
            user = new UsersModel({
                tgId: ctx.from.id,
                id: v4(),
            });
    
            await user.save();
        }

        const searchConfigFormUrl = `${config.get('searchConfigFormUrl')}?userId=${user.id}`

        ctx.reply(
            'Let\'s get started 👨‍💻\n\nPlease open the app to set up surf config',
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ web_app: { url: searchConfigFormUrl }, text: 'Open job surf app',  }],
                    ]
                
                }
            }
        )

    } catch (error) {
        ctx.reply('Sorry, something went wrong with adding a new user to the bot');
    }
}

export const stop = async (ctx: TCommandCallback) => {
    try {
        const existingUser = await UsersModel.findOne({ tgId: ctx.from.id });

        if (!existingUser) {
            ctx.reply('User not found');

            return
        }

        const existingConfig = await SearchConfigsModel.findOne({ tgId: existingUser.id });

        if (!existingConfig) {
            ctx.reply('Search config not found');

            return
        }

        await existingConfig.deleteOne();

        ctx.reply('Search config has been removed');
    } catch (error) {
        ctx.reply('Sorry, something went wrong');
    }
}



export const quit = async (ctx: TCommandCallback) => {
    try {
        const existingUser = await UsersModel.findOne({ tgId: ctx.from.id });

        if (!existingUser) {
            ctx.reply('User not found');

            return
        }

        await existingUser.deleteOne();
        await SearchConfigsModel.deleteOne({ userId: existingUser.id });

        ctx.reply('Bye!\nHope I helped you');
    } catch (error) {
        ctx.reply('Sorry, something went wrong');
    }
}

