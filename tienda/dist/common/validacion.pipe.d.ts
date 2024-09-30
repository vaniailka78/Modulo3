import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class ValidacionPipe implements PipeTransform<any> {
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private toValidate;
    private formatErrorMessage;
}
