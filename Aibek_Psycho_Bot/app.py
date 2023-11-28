import telebot
import openai
import os
import time

openai.api_key = os.environ('OPENAI_API_KEY')

TOKEN = os.environ('TELEGRAM_BOT_API_KEY')
bot = telebot.TeleBot(TOKEN)

history = ""

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    bot.reply_to(message, "👋 Привет! Я ваш личный психолог - Айбек. Чем могу помочь? Расскажите про свою проблему.")

@bot.message_handler(func=lambda message: True)
def handle_message(message):
    global history

    bot.send_chat_action(message.chat.id, 'typing')

    user_message = f"\nПациент: {message.text}"

    if history == "":
        chatbot_message = """
        - Вас зовут Айбек и вы профессиональный сертифицированный психиатр и психолог.
        - Вы эксперт по наркозависимости и психическим расстройствам. 
        - Ваша основная специализация это лечение наркомании и нарко-зависимости.
        - Не здаровайся и не пиши лишние тексты!
        - Не пеши не какие приставки перед своими словами, никаких знаков и лишних слов в начале!
        - Ваша задача помочь пациенту в его проблеме.
        - Будьте сострадательными, добрыми, вежливыми, терпеливыми и внимательными к пациентам.
        - К вам обращается пациент и вы должны дать его проконсультировать.
        - Ведите себя как близкий друг, который внимательно слушает и отвечает правдиво и сострадательно.
        - Максимальный размер ответа: 1000 символов!
        - Пишите ответы четко и лаконично.
        - Если зададут вопрос на казахском языке, то ответьте на казахском языке.
        - Если зададут вопрос на английском языке, то ответьте на английском языке.
        - Если напишут на другом языке, скажите что не понимаете!
        - Задавайте любые вопросы, если чувствуюте, что они имеют отношение к ситуации, и могут лучше помочь с ответом.
        - Не дополняй текст пиши ответы на вопросы!!!
        """
        history += chatbot_message
    else:
        chatbot_message = ""

    chat_history = chatbot_message + "История сообщений: " + history + "\nПациент: " + user_message
    try:
        response = openai.Completion.create(
            engine='text-davinci-003',
            prompt=chat_history,
            max_tokens=1000,
            temperature=0.8
        )
        chatbot_reply = response.choices[0].text.strip()
    except Exception as e:
        chatbot_reply = f"Error: {e}"

    history += "\n" + chatbot_reply

    bot.reply_to(message, chatbot_reply)

if __name__ == "__main__":
    bot.polling()
