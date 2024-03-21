import { HttpStatus, HttpException } from "@nestjs/common";
import { existsSync, mkdirSync } from 'fs';
import { extname } from "path";
import { diskStorage } from "multer";
import * as moment from "moment";

export const multerOptions = {
  storage: diskStorage({
    destination: function (req, file, cb) {
      if (!existsSync("./uploads")) {
        mkdirSync("./uploads");
      }
      cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
      let nameSplitArr = file.originalname.split(".");
      let fileExtension = nameSplitArr[nameSplitArr.length - 1];
      let fileName = `${moment().unix()}.${fileExtension}`;
      cb(null, fileName);
    }
  }),
  // Enable file size limits
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(pdf)$/)) {
      cb(null, true);
    } else {
      cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
    }
  },
}