import { IsNotEmpty, IsEmail } from 'class-validator'; //installed package

export class RegistrationDto {
  @IsNotEmpty({ message: 'Email is required' })
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
