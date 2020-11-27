import {
  IsAlphanumeric,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const PASSWORD_REQUIREMENTS =
  'Password must contain a minimum of 1 lower case letter, ' +
  '1 upper case letter, 1 numeric character, ' +
  'minimum of 1 special character';

export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  @MaxLength(16)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()-+={}\[\]|\\;:'"<>,./?]).{10,}$/,
    { message: PASSWORD_REQUIREMENTS },
  )
  password: string;

  @IsMobilePhone('uk-UA')
  mobilephone: string;
}
