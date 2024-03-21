import { Test, TestingModule } from '@nestjs/testing';
import { ZohosignController } from './zohosign.controller';
import { ZohosignService } from './zohosign.service';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { testResponse } from '../../../test/testdata-response';

describe('ZohosignController', () => {
  let zohoController: ZohosignController;
  let zohoService: ZohosignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZohosignController],
      providers: [ZohosignService, ConfigService],
    }).compile();

    zohoController = module.get<ZohosignController>(ZohosignController);
    zohoService = module.get<ZohosignService>(ZohosignService);
  });

  describe('uploadFile', () => {
    it('should upload file successfully', async () => {
      const file = {
        fieldname: 'file',
        originalname: 'Trushna_resume.pdf',
        encoding: 'utf-8',
        mimetype: 'application/pdf',
        size: 436385,
        buffer: Buffer.from(__dirname + '/uploads/Trushna_resume.pdf', 'utf8'),
        path:'uploads/Trushna_resume.pdf'
      } as Express.Multer.File;
      const body = { recipients: '[{"name": "John", "email": "john@yopmail.com"},{"name": "Herry", "email": "herry@yopmail.com"}]', requestName: 'Demo1', oauthToken: '1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d' };
      const result = testResponse.uploadFileRes
      const responseMock = {
        status: jest.fn(() => ({
          json: jest.fn(() => result)
        }))
      } as any;
      jest.spyOn(zohoService, 'uploadFileForSignature').mockResolvedValue(result);

      const response = await zohoController.uploadFile(file, body, responseMock);
      expect(response).toEqual(result);
    });

    it('should throw NotFoundException if file is not provided', async () => {
      const body = { recipients: '[{"name": "John", "email": "john@yopmail.com"},{"name": "Herry", "email": "herry@yopmail.com"}]', requestName: 'Demo1', oauthToken: '1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d' };
      const responseMock = {
        status: jest.fn(() => ({
          json: jest.fn()
        }))
      } as any;

      // Call the controller method with undefined file
      await expect(zohoController.uploadFile(undefined, body, responseMock)).rejects.toThrow(NotFoundException);
    });
   
  });

  describe('addEsignTag', () => {
    it('should esign tag add successfully', async () => {
      const body = {
        "actions": [
           {
                "action_id": "60206000000034057",
                "recipient_name": "John",
                "recipient_email": "john@yopmail.com"
            },
            {
                "action_id": "60206000000034060",
                "recipient_name": "Herry",
                "recipient_email": "herry@yopmail.com"
            }
        ],
        "oauthToken": "1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d",
        "requestName": "Demo1",
        "requestId": "60206000000034040",
        "documentId": "60206000000034041"
    }
      const result = testResponse.addSignTagRes
      const responseMock = {
        status: jest.fn(() => ({
          json: jest.fn(() => result)
        }))
      } as any;
      jest.spyOn(zohoService, 'AddEsignTagInDocument').mockResolvedValue(result);

      const response = await zohoController.addEsignTag(body, responseMock);

      expect(response).toEqual(result);
    });
   
  });

  describe('submitDocument', () => {
    it('should document submit successfully', async () => {
      const body = {requestId: '60206000000034040',
       actions: [
        {
          "action_id": "60206000000034057"
      },
      {
          "action_id": "60206000000034060"
      }
    ], oauthToken: '1000.d8170f90a345dcd5a58931b201716c65.d2960fe1508b69899549e9775b2730c9' };
      const result = testResponse.submitDocumentRes
      const responseMock = {
        status: jest.fn(() => ({
          json: jest.fn(() => result)
        }))
      } as any;
      jest.spyOn(zohoService, 'SubmitDocumentForSign').mockResolvedValue(result);

      const response = await zohoController.submitDocument(body, responseMock);
      expect(response).toEqual(result);
    });
  });

  describe('viewDocument', () => {
    it('preview document successfully', async () => {
      const body = {requestId: '60206000000034040', oauthToken: '1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d' };
      const result =testResponse.viewDocumentRes
      const responseMock = {
        status: jest.fn(() => ({
          json: jest.fn(() => result)
        }))
      } as any;
      jest.spyOn(zohoService, 'ViewParticularPdf').mockResolvedValue(result);

      const response = await zohoController.viewDocument(body, responseMock);
      expect(response).toEqual(result);
    });
  });
  
});
