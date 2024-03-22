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
        path: 'uploads/Trushna_resume.pdf'
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
      const body = {
        requestId: '60206000000034040',
        actions: [
          {
            "action_id": "60206000000034057"
          },
          {
            "action_id": "60206000000034060"
          }
        ], oauthToken: '1000.d8170f90a345dcd5a58931b201716c65.d2960fe1508b69899549e9775b2730c9'
      };
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
      const body = { requestId: '60206000000034040', oauthToken: '1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d' };
      const result = testResponse.viewDocumentRes
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


  // ------------------------------------- template ---------------------------------------------------

  describe('createtemplate', () => {
    it('should template create successfully', async () => {
      const file = {
        fieldname: 'file',
        originalname: 'Trushna_resume.pdf',
        encoding: 'utf-8',
        mimetype: 'application/pdf',
        size: 436385,
        buffer: Buffer.from(__dirname + '/uploads/Trushna_resume.pdf', 'utf8'),
        path: 'uploads/Trushna_resume.pdf'
      } as Express.Multer.File;
      const body = { template_name: 'Demo Template', oauthToken: '1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d' };
      const result = testResponse.createTemplateRes
      const responseMock = {
        status: jest.fn(() => ({
          json: jest.fn(() => result)
        }))
      } as any;
      jest.spyOn(zohoService, 'createNewTemplate').mockResolvedValue(result);

      const response = await zohoController.createTemplate(file, body, responseMock);
      expect(response).toEqual(result);
    });

    it('should throw NotFoundException if file is not provided', async () => {
      const body = { template_name: 'Demo Template', oauthToken: '1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d' };
      const responseMock = {
        status: jest.fn(() => ({
          json: jest.fn()
        }))
      } as any;

      // Call the controller method with undefined file
      await expect(zohoController.uploadFile(undefined, body, responseMock)).rejects.toThrow(NotFoundException);
    });

  });

  describe('addtag', () => {
    it('should esign tag add in template successfully', async () => {
      const body = {
        "template_id": "60206000000035059",
        "documentId": "60206000000035060",
        "oauthToken": "1000.6d1e1bd61d00cfe6a72bbf7256d20e3f.0331f1b891a32ba8842915d3c24f971b",
        "actions": [
          {
            "action_id": "60206000000035076"
          }
        ]
      }
      const result = testResponse.addTagInTemplateRes
      const responseMock = {
        status: jest.fn(() => ({
          json: jest.fn(() => result)
        }))
      } as any;
      jest.spyOn(zohoService, 'AddEsignTagInTemplate').mockResolvedValue(result);

      const response = await zohoController.addSignTagInTemplate(body, responseMock);

      expect(response).toEqual(result);
    });

  });

  describe('submitusingtemplate', () => {
    it('should document for sign using template sent successfully', async () => {
      const body = {
        "template_id": "60206000000035059",
        "oauthToken": "1000.6d1e1bd61d00cfe6a72bbf7256d20e3f.0331f1b891a32ba8842915d3c24f971b",
        "actions": [
          {
            "action_id": "60206000000035076",
            "recipient_name": "john",
            "recipient_email": "john@yopmail.com"
          }
        ]
      };
      const result = testResponse.submitDocUsingTemplate
      const responseMock = {
        status: jest.fn(() => ({
          json: jest.fn(() => result)
        }))
      } as any;
      jest.spyOn(zohoService, 'SubmitDocForSignUsingTemplate').mockResolvedValue(result);

      const response = await zohoController.submitUsingTemplate(body, responseMock);
      expect(response).toEqual(result);
    });
  });

  describe('viewSignedDocument', () => {
    it('preview signed document successfully', async () => {
      const body = {
        "template_id": "60206000000035059",
        "oauthToken": "1000.9a2aa078afe4efde632b6d876ac7dfe3.e12e0f498cbecaed89d7bd329fc6c265"
    };
      const result = testResponse.viewSignedDocumentRes
      const responseMock = {
        status: jest.fn(() => ({
          json: jest.fn(() => result)
        }))
      } as any;
      jest.spyOn(zohoService, 'ViewParticularSignDocument').mockResolvedValue(result);

      const response = await zohoController.viewSignedDocument(body, responseMock);
      expect(response).toEqual(result);
    });
  });

});
