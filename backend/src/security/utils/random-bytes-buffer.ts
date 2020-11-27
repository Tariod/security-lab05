import { randomBytes } from 'crypto';
import { promisify } from 'util';

export const randomBytesBuffer = promisify(randomBytes);
