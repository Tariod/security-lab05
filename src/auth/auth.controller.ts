import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public register(@Body() registerDTO: RegisterDTO): Promise<string> {
    return this.authService.register(registerDTO);
  }

  @Post('login')
  public login(@Body() loginDTO: LoginDTO): Promise<string> {
    const { username, password } = loginDTO;
    return this.authService.login(username, password);
  }
}
