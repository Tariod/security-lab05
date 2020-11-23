import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

const PASSWORD_REQUIREMENTS =
  'Password must contain a minimum of 1 lower case letter, ' +
  '1 upper case letter, 1 numeric character, ' +
  'minimum of 1 special character (~`!@#$%^&*()-+={}[]|;:\'"<>,./?). ' +
  'Password must be at least 10 characters in length but can be much longer.';

export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  @MaxLength(32)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()-+={}\[\]|\\;:'"<>,./?]).{10,}$/,
    { message: PASSWORD_REQUIREMENTS },
  )
  password: string;
}
