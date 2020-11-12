import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public register(
    @Body() registerDTO: RegisterDTO,
  ): Promise<Record<string, string>> {
    const { username, password } = registerDTO;
    const firstname = registerDTO.firstname || null;
    const lastname = registerDTO.lastname || null;

    const user = { username, firstname, lastname };
    return this.authService.register(user, password);
  }

  @Post('login')
  public login(@Body() loginDTO: LoginDTO): Promise<Record<string, string>> {
    const { username, password } = loginDTO;
    return this.authService.login(username, password);
  }
}
