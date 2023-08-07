import { v4 } from 'node-uuid';

import { NarrowedContext, Context } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';
import { bot } from './client';
import { UsersModel } from '../../models'

type TCommandCallback = NarrowedContext<Context<Update>, {
    message: Update.New & Update.NonChannel & Message.TextMessage;
    update_id: number;
}>

export const start = async (ctx: TCommandCallback) => {
    try {
        const user = await UsersModel.findOne({ tgId: ctx.from.id });

        if (!!user) {
            bot.telegram.sendMessage(ctx.chat.id, 'You have already started');

            return
        }

        if (ctx.from.is_bot) {
            bot.telegram.sendMessage(ctx.chat.id, 'Sorry, it looks like you are bot. Please, become a human');

            return
        }

        const createUser = new UsersModel({
            tgId: ctx.from.id,
            userId: v4(),
        });

        await createUser.save()
    } catch (error) {
        bot.telegram.sendMessage(ctx.chat.id, 'Sorry, something went wrong with adding a new user to the bot');

        return
    }


    bot.telegram.sendMessage(ctx.chat.id, 'Hello there!')
}

export const quit = async (ctx: TCommandCallback) => {
    try {
        await UsersModel.deleteOne({ tgId: ctx.from.id });
    } catch (error) {
        bot.telegram.sendMessage(ctx.chat.id, 'Sorry, something went wrong');
        return
    }

    bot.telegram.sendMessage(ctx.chat.id, 'Bye!');
}

