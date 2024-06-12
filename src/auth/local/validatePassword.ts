import crypto from 'crypto';

export const validatePassword = (password: string, hash: string, salt: string) => {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
}

export default validatePassword;