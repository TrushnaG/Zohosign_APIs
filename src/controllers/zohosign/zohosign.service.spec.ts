jest.mock('node-fetch')
import { Test, TestingModule } from '@nestjs/testing';
import { ZohosignService } from './zohosign.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import fetch from 'node-fetch';
import { ConfigService } from '@nestjs/config';
import { testResponse } from '../../../test/testdata-response';


describe('ZohosignService', () => {
  let zohoSignService: ZohosignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZohosignService, ConfigService],
    }).compile();

    zohoSignService = module.get<ZohosignService>(ZohosignService);
  });

  describe('uploadFileForSignature', () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

    it('should upload file for signature successfully', async () => {
      const file = '/Users/hiren/Trushna/zohosign_demo/uploads/Trushna_resume.pdf';
      const recipients = [
        { "name": "John", "email": "john@yopmail.com" },
        { "name": "Herry", "email": "herry@yopmail.com" }
      ];
      const requestName = 'Demo1';
      const oauthToken = '1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d';

      const expectedResponse = testResponse.uploadFileRes

      const mockReadStream = fs.createReadStream(file);
      jest.spyOn(fs, 'createReadStream').mockReturnValue(mockReadStream);

      const mockResponse = { json: jest.fn().mockResolvedValue(expectedResponse) };
      mockFetch.mockResolvedValue(mockResponse as any);
      const result = await zohoSignService.uploadFileForSignature(file, recipients, requestName, oauthToken);
      expect(fs.createReadStream).toHaveBeenCalledWith(file);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw HttpException on error', async () => {
      const file = '/Users/hiren/Trushna/zohosign_demo/uploads/Trushna_resume.pdf';
      const recipients = [
        { "name": "John", "email": "john@yopmail.com" },
        { "name": "Herry", "email": "herry@yopmail.com" }
      ];
      const requestName = 'Demo1';
      const oauthToken = '1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d';

      const mockReadStream = fs.createReadStream(file);

      jest.spyOn(fs, 'createReadStream').mockReturnValue(mockReadStream);
      mockFetch.mockRejectedValue(new Error("errorMessage"))
      await expect(zohoSignService.uploadFileForSignature(file, recipients, requestName, oauthToken)).rejects.toThrow(HttpException);
    });
  });

  describe('AddEsignTagInDocument', () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

    it('should esign tag add successfully', async () => {
      const requestId = '60206000000034040'
      const documentId = '60206000000034041'
      const actions = [
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
      ]
      const requestName = 'Demo1';
      const oauthToken = '1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d';

      const expectedResponse = testResponse.addSignTagRes

      const mockResponse = { json: jest.fn().mockResolvedValue(expectedResponse) };
      mockFetch.mockResolvedValue(mockResponse as any);
      const result = await zohoSignService.AddEsignTagInDocument(requestId, documentId, actions, requestName, oauthToken);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw HttpException on error', async () => {
      const requestId = '60206000000034040'
      const documentId = '60206000000034041'
      const actions = [
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
      ]
      const requestName = 'Demo1';
      const oauthToken = '1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d';

      mockFetch.mockRejectedValue(new Error("errorMessage"))
      await expect(zohoSignService.AddEsignTagInDocument(requestId, documentId, actions, requestName, oauthToken)).rejects.toThrow(HttpException);
    });
  });

  describe('SubmitDocumentForSign', () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

    it('should document submit successfully', async () => {
      const requestId = '60206000000034040'
      const actions = [
        {
          "action_id": "60206000000034057"
        },
        {
          "action_id": "60206000000034060"
        }
      ]
      const oauthToken = '1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d'

      const expectedResponse = testResponse.submitDocumentRes

      const mockResponse = { json: jest.fn().mockResolvedValue(expectedResponse) };
      mockFetch.mockResolvedValue(mockResponse as any);
      const result = await zohoSignService.SubmitDocumentForSign(requestId, actions, oauthToken);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw HttpException on error', async () => {
      const requestId = '60206000000034040'
      const actions = [
        {
          "action_id": "60206000000034057"
        },
        {
          "action_id": "60206000000034060"
        }
      ]
      const oauthToken = '1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d'

      mockFetch.mockRejectedValue(new Error("errorMessage"))
      await expect(zohoSignService.SubmitDocumentForSign(requestId, actions, oauthToken)).rejects.toThrow(HttpException);
    });
  });

  describe('ViewParticularPdf', () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

    it('view document successfully', async () => {
      const requestId = '60206000000034040'
      const oauthToken = '1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d'

      const expectedResponse = testResponse.viewDocumentRes

      const mockResponse = { json: jest.fn().mockResolvedValue(expectedResponse) };
      mockFetch.mockResolvedValue(mockResponse as any);
      const result = await zohoSignService.ViewParticularPdf(requestId, oauthToken);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw HttpException on error', async () => {
      const requestId = '60206000000034040'
      const oauthToken = '1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d'

      mockFetch.mockRejectedValue(new Error("errorMessage"))
      await expect(zohoSignService.ViewParticularPdf(requestId, oauthToken)).rejects.toThrow(HttpException);
    });
  });


  // ---------------------------------------- template --------------------------------------------------

  describe('createNewTemplate', () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

    it('should template successfully', async () => {
      const file = '/Users/hiren/Trushna/zohosign_demo/uploads/Trushna_resume.pdf';
      const template_name = 'Demo Template';
      const oauthToken = '1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d';

      const expectedResponse = testResponse.createTemplateRes

      const mockReadStream = fs.createReadStream(file);
      jest.spyOn(fs, 'createReadStream').mockReturnValue(mockReadStream);

      const mockResponse = { json: jest.fn().mockResolvedValue(expectedResponse) };
      mockFetch.mockResolvedValue(mockResponse as any);
      const result = await zohoSignService.createNewTemplate(file, template_name, oauthToken);
      expect(fs.createReadStream).toHaveBeenCalledWith(file);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw HttpException on error', async () => {
      const file = '/Users/hiren/Trushna/zohosign_demo/uploads/Trushna_resume.pdf';
      const template_name = 'Demo Template';
      const oauthToken = '1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d';

      const mockReadStream = fs.createReadStream(file);

      jest.spyOn(fs, 'createReadStream').mockReturnValue(mockReadStream);
      mockFetch.mockRejectedValue(new Error("errorMessage"))
      await expect(zohoSignService.createNewTemplate(file, template_name, oauthToken)).rejects.toThrow(HttpException);
    });
  });

  describe('AddEsignTagInTemplate', () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

    it('should esign tag add in template successfully', async () => {
      const template_id = "60206000000035059"
      const documentId = "60206000000035060"
      const oauthToken = "1000.6d1e1bd61d00cfe6a72bbf7256d20e3f.0331f1b891a32ba8842915d3c24f971b"
      const actions = [
        {
          action_id: "60206000000035076"
        }
      ]
      const expectedResponse = testResponse.addTagInTemplateRes

      const mockResponse = { json: jest.fn().mockResolvedValue(expectedResponse) };
      mockFetch.mockResolvedValue(mockResponse as any);
      const result = await zohoSignService.AddEsignTagInTemplate(template_id, documentId, actions, oauthToken);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw HttpException on error', async () => {
      const template_id = "60206000000035059"
      const documentId = "60206000000035060"
      const oauthToken = "1000.6d1e1bd61d00cfe6a72bbf7256d20e3f.0331f1b891a32ba8842915d3c24f971b"
      const actions = [
        {
          action_id: "60206000000035076"
        }
      ]
      mockFetch.mockRejectedValue(new Error("errorMessage"))
      await expect(zohoSignService.AddEsignTagInTemplate(template_id, documentId, actions, oauthToken)).rejects.toThrow(HttpException);
    });
  });

  describe('SubmitDocForSignUsingTemplate', () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

    it('should document for sign using template sent successfully', async () => {
      const template_id = "60206000000035059"
      const oauthToken = "1000.6d1e1bd61d00cfe6a72bbf7256d20e3f.0331f1b891a32ba8842915d3c24f971b"
      const actions = [
        {
          "action_id": "60206000000035076",
          "recipient_name": "john",
          "recipient_email": "john@yopmail.com"
        }
      ]
      const expectedResponse = testResponse.submitDocUsingTemplate

      const mockResponse = { json: jest.fn().mockResolvedValue(expectedResponse) };
      mockFetch.mockResolvedValue(mockResponse as any);
      const result = await zohoSignService.SubmitDocForSignUsingTemplate(template_id, actions, oauthToken);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw HttpException on error', async () => {
      const template_id = "60206000000035059"
      const oauthToken = "1000.6d1e1bd61d00cfe6a72bbf7256d20e3f.0331f1b891a32ba8842915d3c24f971b"
      const actions = [
        {
          "action_id": "60206000000035076",
          "recipient_name": "john",
          "recipient_email": "john@yopmail.com"
        }
      ]
      mockFetch.mockRejectedValue(new Error("errorMessage"))
      await expect(zohoSignService.SubmitDocForSignUsingTemplate(template_id, actions, oauthToken)).rejects.toThrow(HttpException);
    });
  });

  describe('ViewParticularSignDocument', () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

    it('view signed document successfully', async () => {
      const template_id = '60206000000035059'
      const oauthToken = '1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d'

      const expectedResponse = testResponse.viewSignedDocumentRes

      const mockResponse = { json: jest.fn().mockResolvedValue(expectedResponse) };
      mockFetch.mockResolvedValue(mockResponse as any);
      const result = await zohoSignService.ViewParticularSignDocument(template_id, oauthToken);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw HttpException on error', async () => {
      const template_id = '60206000000035059'
      const oauthToken = '1000.a7bf484df7e5a999dc2e191c0382e870.156fef4eff7d11153908dc811624e12d'

      mockFetch.mockRejectedValue(new Error("errorMessage"))
      await expect(zohoSignService.ViewParticularPdf(template_id, oauthToken)).rejects.toThrow(HttpException);
    });
  });
});
