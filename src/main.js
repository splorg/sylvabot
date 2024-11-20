const dotenv = require('dotenv');
const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal');

const { isSylva, getSylvaKeyPhrase, isOtter } = require('./utils');

dotenv.config()

const client = new Client({
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  authStrategy: new LocalAuth(),
});

client.once('ready', () => {
  console.log('WhatsApp Web connected!')
})

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true })
})

client.on('authenticated', () => {
  console.log('WhatsApp Web authenticated!')
})

client.on('message_create', message => {
  if (isSylva(message)) {
    if (isOtter(message)) {
      const keyPhrase = getSylvaKeyPhrase(message)
  
      if (keyPhrase) {
        client.sendMessage(message.from, keyPhrase)
      }
    }
  }
})

client.initialize()