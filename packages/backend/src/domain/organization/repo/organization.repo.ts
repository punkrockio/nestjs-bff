import { OrganizationEntity } from '@nestjs-bff/global/lib/entities/organization.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { INestjsBffConfig } from '../../../config/nestjs-bff.config';
import { AppSharedProviderTokens } from '../../../shared/app/app.shared.constants';
import { CacheStore } from '../../../shared/caching/cache-store.shared';
import { CachingProviderTokens } from '../../../shared/caching/caching.shared.constants';
import { LoggerSharedService } from '../../../shared/logging/logger.shared.service';
import { BaseRepo } from '../../core/repo/base.repo';
import { QueryValidatorService } from '../../core/repo/validators/query-validator.service';
import { IOrganizationModel } from '../model/organization.model';
import { OrganizationProviderTokens } from '../organization.constants';
import { OrganizationQueryConditions } from './organization.query-conditions';

@Injectable()
export class OrganizationRepo extends BaseRepo<OrganizationEntity, IOrganizationModel, OrganizationQueryConditions> {
  constructor(
    readonly loggerService: LoggerSharedService,
    queryValidatorService: QueryValidatorService,
    @Inject(OrganizationProviderTokens.Models.Organization)
    model: Model<IOrganizationModel>,
    @Inject(CachingProviderTokens.Services.CacheStore) cacheStore: CacheStore,
    @Inject(AppSharedProviderTokens.Config.App)
    nestjsBffConfig: INestjsBffConfig,
  ) {
    super({
      loggerService,
      queryValidatorService,
      model,
      cacheStore,
      defaultTTL: nestjsBffConfig.caching.entities.organization,
      queryConditionsType: OrganizationQueryConditions,
    });
  }

  protected generateValidQueryConditionsForCacheClear(entity: OrganizationEntity): OrganizationQueryConditions[] {
    throw new Error('Method not implemented.');
  }
}
