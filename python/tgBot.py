import asyncio
from functools import cache
from aiogram import Bot , Dispatcher, executor, types
from aiogram.utils.markdown import hbold, hunderline, hcode, hlink
from aiogram.dispatcher.filters import Text
from helpers import genCows,genOxen,generateGame
import schedule
import time


bot = Bot(token="", parse_mode=types.ParseMode.HTML)

dp = Dispatcher(bot)

@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    start_buttons = ["Rules","Play with PC", "Play with friend","Statistics"]
    keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True)
    keyboard.add(*start_buttons)
    await message.answer("Good day to oxes and cows")
    await message.answer("If you are new hit Rules")
    await message.answer("Otherwise let's go my good friend!", reply_markup=keyboard)

@dp.message_handler(Text(equals="Rules"))
async def start(message: types.Message):
    await message.answer("You can generate either 4 digits or 5 digits numbers, by entering 4 or 5")
    await message.answer("After the number has been generated, you have to give your quesses")
    await message.answer("If you give up, just write down: Finish")


@dp.message_handler(Text(equals="Finish"))
async def start(message: types.Message):
    await message.answer("Sad to hear that")


@dp.message_handler(Text(equals="Play with PC"))
async def start(message: types.Message):
    await message.answer("Sad to hear that")
