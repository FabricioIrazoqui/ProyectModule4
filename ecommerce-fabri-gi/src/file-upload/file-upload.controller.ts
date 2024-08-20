import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('files')
@Controller('files')
export class FileUploadController {
    constructor(private readonly fileUploadServices: FileUploadService) { }

    @ApiBearerAuth()
    @Post('uploadImage/:id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@Param('id') productId: string,
        @UploadedFile(new ParseFilePipe({
            validators: [new MaxFileSizeValidator({
                maxSize: 200000
            }),
            new FileTypeValidator({ fileType: /(.jpg|.png|.webp|.jpeg)/ })
            ]
        })) file: Express.Multer.File) {
        return this.fileUploadServices.uploadImage(productId, file)
    }
}
