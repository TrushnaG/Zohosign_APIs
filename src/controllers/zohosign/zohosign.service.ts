import { ForbiddenException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as FormData from 'form-data';
import fetch from 'node-fetch';
import { ConfigService } from '@nestjs/config';
import { messages } from '../message';

@Injectable()
export class ZohosignService {
  constructor(private readonly configService: ConfigService) { }

  async uploadFileForSignature(
    file: string,
    recipients: { name: string, email: string }[],
    requestName: string,
    oauthToken: string) {
    try {
      if (!recipients || recipients.length == 0 || !requestName || requestName == "" || !oauthToken || oauthToken == "") {
        throw new HttpException({ success: false, message: messages.REQUIRED_FIELD }, HttpStatus.NOT_FOUND);
      }
      const actions = recipients.map((recipient, index) => ({
        recipient_name: recipient.name,
        recipient_email: recipient.email,
        action_type: 'SIGN',
        private_notes: 'Please get back to us for further queries',
        signing_order: index,
        verify_recipient: false,
      }));

      let documentJson = {};
      documentJson['request_name'] = requestName;
      documentJson['description'] = 'Details of document';
      documentJson['expiration_days'] = 10;
      documentJson['is_sequential'] = true;
      documentJson['email_reminders'] = true;
      documentJson['reminder_period'] = 8;
      documentJson['actions'] = actions

      let data = {};
      data['requests'] = documentJson;

      const payload = new FormData();
      let value = fs.createReadStream(file);
      payload.append('file', value);
      payload.append('data', JSON.stringify(data));
      const HEADERS = {};
      HEADERS['Authorization'] = `Zoho-oauthtoken ${oauthToken}`;
      const url = this.configService.get<string>("zoho_api_url")
      const URL = `${url}requests`;
      const method = 'POST';
      const requestOptions = {
        method: method,
        headers: HEADERS,
        body: payload
      };

      const response = await fetch(URL, requestOptions)
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async AddEsignTagInDocument(
    requestId: string,
    documentId: string,
    actionsArr: { action_id: string, recipient_name: string, recipient_email: string }[],
    requestName: string,
    oauthToken: string) {
    try {
      if (!requestId || requestId == "" || !documentId || documentId == "" || !actionsArr || actionsArr.length == 0 || !requestName || requestName == "" || !oauthToken || oauthToken == "") {
        throw new HttpException({ success: false, message: messages.REQUIRED_FIELD }, HttpStatus.NOT_FOUND);
      }
      let x_cord = 500
      let y_code = 700
      let padding = 20
      let abs_height = 24
      let abc_width = 200

      const actionsJson = actionsArr.map((action, index) => {
        let fieldJson = {};
        fieldJson['document_id'] = documentId;
        fieldJson['field_name'] = 'Signature';
        fieldJson['field_type_name'] = 'Signature';
        fieldJson['field_label'] = 'Signature';
        fieldJson['field_category'] = 'Signature';
        fieldJson['is_mandatory'] = true;
        fieldJson['page_no'] = 0;
        fieldJson['is_resizable'] = true,
        fieldJson['is_draggable'] = true,
        fieldJson['description_tooltip'] = 'Add your signature'
        fieldJson['x_coord'] = x_cord;
        fieldJson['y_coord'] = y_code;
        fieldJson['abs_width'] = abc_width;
        fieldJson['abs_height'] = abs_height;
        y_code += fieldJson['abs_height'] + padding;

        return {
          action_id: action.action_id,
          recipient_name: action.recipient_name,
          recipient_email: action.recipient_email,
          action_type: 'SIGN',
          fields: new Array(fieldJson)
        }
      });

      let documentJson = {};
      documentJson['request_name'] = requestName;
      documentJson['actions'] = actionsJson

      let data = {};
      data['requests'] = documentJson;

      const payload = new FormData();

      payload.append('data', JSON.stringify(data));
      const HEADERS = {};
      HEADERS['Authorization'] = `Zoho-oauthtoken ${oauthToken}`;
      const url = this.configService.get<string>("zoho_api_url")
      const URL = `${url}requests/${requestId}`;
      const method = 'PUT';
      const requestOptions = {
        method: method,
        headers: HEADERS,
        body: payload
      };

      const response = await fetch(URL, requestOptions)
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async SubmitDocumentForSign(
    requestId: string,
    actionsArr: { action_id: string }[],
    oauthToken: string) {
    try {
      if (!requestId || requestId == "" || !actionsArr || actionsArr.length == 0 || !oauthToken || oauthToken == "") {
        throw new HttpException({ success: false, message: messages.REQUIRED_FIELD }, HttpStatus.NOT_FOUND);
      }
      const actionsJson = actionsArr.map((action, index) => ({
        verify_recipient: false,
        action_id: action.action_id,
        action_type: 'SIGN',
        private_notes: "Lorem ipsum",
        signing_order: index
      }));

      let requestJson = {};
      requestJson['actions'] = actionsJson

      let data = {};
      data['requests'] = requestJson;

      const payload = new FormData();

      payload.append('data', JSON.stringify(data));
      const HEADERS = {};
      HEADERS['Authorization'] = `Zoho-oauthtoken ${oauthToken}`;
      const url = this.configService.get<string>("zoho_api_url")
      const URL = `${url}requests/${requestId}/submit`;
      const method = 'POST';
      const requestOptions = {
        method: method,
        headers: HEADERS,
        body: payload
      };

      const response = await fetch(URL, requestOptions)
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async ViewParticularPdf(
    requestId: string,
    oauthToken: string) {
    try {
      if (!requestId || requestId == "" || !oauthToken || oauthToken == "") {
        throw new HttpException({ success: false, message: messages.REQUIRED_FIELD }, HttpStatus.NOT_FOUND);
      }
      const HEADERS = {};
      HEADERS['Authorization'] = `Zoho-oauthtoken ${oauthToken}`;
      const url = this.configService.get<string>("zoho_api_url")
      const URL = `${url}requests/${requestId}`;
      const method = 'GET';
      const requestOptions = {
        method: method,
        headers: HEADERS,
      };

      const response = await fetch(URL, requestOptions)
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

