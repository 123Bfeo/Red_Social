/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { API_URL } from '../../../../variables';
import axios from 'axios';
import { UserDto } from 'src/modules/user/user-dto/user-dto';
@Injectable()
export class MailtrapService {
  /**send data post  */
  private apiUrl = API_URL;

  async sendUserData(data: any) {
    const {
      age,
      iduser,
      createdAt,
      updatedAt,
      deletedAt,
      password,
      ...result
    } = data;
    console.log('soy dta', data);
    try {
      const response = await axios.post(this.apiUrl, result);
      return response;
    } catch (error) {
      console.log('Error sending data info:', error);
      throw new Error('Error sending data info');
    }
  }
}
