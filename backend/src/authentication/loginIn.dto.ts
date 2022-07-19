import { IsString, IsNotEmpty } from "class-validator";

class LoginDto {
  // @IsString()
  // public author!: string;

  @IsString()
  @IsNotEmpty()
  public email!: number;

  @IsString()
  @IsNotEmpty()
  public password!: string;
}

export default LoginDto;
