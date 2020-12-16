import { Injectable } from '@nestjs/common';
import { Whatsapp } from 'venom-bot';
import * as venom from 'venom-bot';
import { IStateObject } from './types';

function createVenomClient(): Promise<Whatsapp> {
  return new Promise(async (resolve, reject) => {
    const client = await venom.create('whatsapp_presence');
    await start(client);
    resolve(client);
  });
}

async function start(client: Whatsapp) {
/*
  client.onMessage((message) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result); 
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
*/
  await client.waitForLogin();
}

@Injectable()
export class AppService {
  client: Whatsapp;

  constructor() {
    createVenomClient().then(client => {
      this.client = client});
  }

  async getState(number: string): Promise<IStateObject> {
    if (!this.client) {      
      throw new Error('service venom not ready');
    }
    const response = await this.client.getNumberProfile(`${number}@c.us`);
    // console.log('number', number, 'response', response);
    const data: IStateObject = {
      status: response.status ? response.status.toString() : '404',
      isBusiness: response.isBusiness ? response.isBusiness : false,
      canReceiveMessage: response.canReceiveMessage ? response.canReceiveMessage : false,
      numberExists: response.numberExists ? response.numberExists : false,
      number,
    }
    return data;
  }
}
