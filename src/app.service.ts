import { Injectable } from '@nestjs/common';
import { Whatsapp } from 'venom-bot';
import * as venom from 'venom-bot';

function createVenomClient(): Promise<Whatsapp> {
  return new Promise(async (resolve, reject) => {
    const client = await venom.create('whatsapp_presence');
    await start(client);
    resolve(client);
  });
}

async function start(client: Whatsapp) {  
  client.onMessage((message) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });

  await client.waitForLogin();
}



@Injectable()
export class AppService {
  client: Whatsapp;

  constructor() {    
    createVenomClient().then(client => {
      this.client = client});
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getState() {
    return await this.client.getNumberProfile('79135292926@c.us');
  }
}
