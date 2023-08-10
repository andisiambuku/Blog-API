import { IsString, IsNotEmpty } from 'class-validator';
export class CreateBlogpostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}
