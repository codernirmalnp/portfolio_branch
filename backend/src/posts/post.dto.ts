import { IsEmpty, IsString, IsNotEmpty } from "class-validator";

class CreatePostDto {
  // @IsString()
  // public author!: string;

  @IsString()
  @IsNotEmpty()
  public content!: string;

  @IsString()
  @IsNotEmpty()
  public title!: number;

  @IsString()
  @IsNotEmpty()
  public image!: string;
}

export default CreatePostDto;
