import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carlos } from './doctor.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Carlos]),
  ],
})
export class DoctorModule {}
