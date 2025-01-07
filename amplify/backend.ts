import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { assetService } from './functions/asset-service/resource';
import { storage } from './storage/resource';

defineBackend({
  auth,
  data,
  assetService,
  storage,
});
