import { IsString, IsNotEmpty, IsEmail, IsObject } from "class-validator";

class CreateUserDto {
  // @IsString()
  // public author!: string;

  @IsString()
  @IsNotEmpty()
  public name!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @IsString()
  @IsNotEmpty()
  public password!: string;
  @IsObject()
  public address!: { street: string; city: string; country: string };
}

export default CreateUserDto;
