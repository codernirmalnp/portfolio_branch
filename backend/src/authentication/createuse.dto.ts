import { IsString, IsNotEmpty, IsEmail, IsObject,IsOptional, MaxLength, MinLength } from "class-validator";

class CreateUserDto {
  // @IsString()
  // public author!: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

 
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @MinLength(5, {
    message: 'Password too short',
  })
  @MaxLength(10, {
    message: 'Password too long',
  })
  @IsNotEmpty()
  public password: string;

  @IsObject()
  @IsOptional()
  public address!: { street: string; city: string; country: string };
}

export default CreateUserDto;
