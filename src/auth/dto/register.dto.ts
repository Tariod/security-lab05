import {
  IsAlpha,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  ValidateIf,
} from 'class-validator';

const PASSWORD_REQUIREMENTS =
  'Password must contain a minimum of 1 lower case letter, ' +
  '1 upper case letter, 1 numeric character, ' +
  'minimum of 1 special character (~`!@#$%^&*()-+={}[]|;:\'"<>,./?). ' +
  'Password must be at least 10 characters in length but can be much longer.';

const isNotEmpty = (_, value) => {
  return value !== '' && value !== null && value !== undefined;
};

export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  username: string;

  @ValidateIf(isNotEmpty)
  @IsString()
  @IsAlpha()
  @MaxLength(32)
  firstname?: string;

  @ValidateIf(isNotEmpty)
  @IsString()
  @IsAlpha()
  @MaxLength(32)
  lastname?: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()-+={}\[\]|\\;:'"<>,./?]).{10,}$/,
    { message: PASSWORD_REQUIREMENTS },
  )
  password: string;
}
