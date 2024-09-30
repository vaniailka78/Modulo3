import { BadRequestException, Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { bufferToggle } from 'rxjs';
//import imageType from 'image-type';

@Injectable()
export class FileService 
{
    private basePath = '././tmp/imagenes/';

    async save(base64Data: string, filename: string) 
    {
        const safeFilename = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');

        const filePath = join(this.basePath, safeFilename);
        //decodificar el base64
        const buffer = Buffer.from(base64Data, 'base64');
        //guardar el archivo en el sistema de archivos
        await writeFile(filePath, buffer);
        //retornar la ruta donde se guardo el archivo
        return filePath;
    }
}