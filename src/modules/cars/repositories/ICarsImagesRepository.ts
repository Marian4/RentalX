export interface ICreateCarImageDto {
  car_id: string;
  image_name: string;
}

export interface ICarsImagesRepository {
  create: (data: ICreateCarImageDto) => Promise<void>;
}
