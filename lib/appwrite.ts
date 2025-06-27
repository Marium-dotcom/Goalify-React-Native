import {Account, Client, Databases, Storage} from 'react-native-appwrite';

export const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('685c731e002b173fc09d')
  .setPlatform('come.mariums.habittracker')
  
  export const account = new Account(client);
