import { LoginResponseDto } from '../dto/loginResponse.dto';

export interface UserJwtResponse {
  user: LoginResponseDto;
  accessToken: string;
}
