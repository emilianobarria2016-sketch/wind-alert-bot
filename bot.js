import TelegramBot from "node-telegram-bot-api";
import fetch from "node-fetch";

// Inserta tu token aquí
const BOT_TOKEN = process.env.BOT_TOKEN;
const WINDY_API = process.env.WINDY_API;

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/viento (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const location = match[1];

  try {
    bot.sendMessage(chatId, `🌬 Buscando viento en *${location}*...`, { parse_mode: "Markdown" });

    const url = `https://api.open-meteo.com/v1/forecast?timezone=auto&current_weather=true&wind_speed_unit=ms&latitude=-53.3&longitude=-70.3`;

    const res = await fetch(url);
    const data = await res.json();

    const viento = data.current_weather.windspeed;
    bot.sendMessage(chatId, `💨 Velocidad del viento: *${viento} m/s*`, { parse_mode: "Markdown" });

  } catch (e) {
    bot.sendMessage(chatId, "❌ Error al obtener el viento.");
  }
});
