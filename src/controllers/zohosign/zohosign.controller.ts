import { Controller, Post, Body, Res, HttpStatus, UploadedFile, UseInterceptors, NotFoundException} from '@nestjs/common';
import { ZohosignService } from './zohosign.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { messages } from '../message';

@Controller('zohosign')
export class ZohosignController {
  constructor(private readonly zohosignService: ZohosignService) { }

  @Post('uploadfile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any, @Res() response: any) {
    if (file) {
      var filepath = file.path.replace(/\\/g, "/")
    } else {
      throw new NotFoundException(messages.REQUIRED_FIELD, { cause: new Error(), description: messages.NO_DATA("File") })
    }
    const { recipients, requestName, oauthToken } = body;
    const recipientArr = JSON.parse(recipients)
    const responseData = await this.zohosignService.uploadFileForSignature(filepath, recipientArr, requestName, oauthToken);
    return response.status(HttpStatus.OK).json({ success: true, message: messages.UPLOAD_SUCCESS, data: responseData })
 }

  @Post('addsigntag')
  async addEsignTag(@Body() body: any, @Res() response: any) {
    const { requestId, documentId, actions, requestName, oauthToken } = body;
    const responseData = await this.zohosignService.AddEsignTagInDocument(requestId, documentId, actions, requestName, oauthToken);
    return response.status(HttpStatus.OK).json({ success: true, message: messages.ADD_TAG_SUCCESS, data: responseData })
  }

  @Post('submitdoc')
  async submitDocument(@Body() body: any, @Res() response: any) {
    const { requestId, actions, oauthToken } = body;
    const responseData = await this.zohosignService.SubmitDocumentForSign(requestId, actions, oauthToken);
    return response.status(HttpStatus.OK).json({ success: true, message: messages.SUBMIT_SUCCESS, data: responseData })
  }

  @Post('viewdoc')
  async viewDocument(@Body() body: any, @Res() response: any) {
    const { requestId, oauthToken } = body;
    const responseData = await this.zohosignService.ViewParticularPdf(requestId, oauthToken);
    return response.status(HttpStatus.OK).json({ success: true, message: messages.VIEW_DOC, data: responseData })
  }


}
