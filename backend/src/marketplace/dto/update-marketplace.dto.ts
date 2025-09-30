import { PartialType } from '@nestjs/mapped-types';
import { CreateMarketplaceDto } from './create-marketplace.dto';

export class UpdateMarketplaceDto extends PartialType(CreateMarketplaceDto) {}
