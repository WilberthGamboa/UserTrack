import { PartialType } from '@nestjs/mapped-types';
import { CreateQrDto } from './create-asistance.dto';


export class UpdateQrDto extends PartialType(CreateQrDto) {}
