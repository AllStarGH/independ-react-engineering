import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServService } from './../serv/serv.service';
import { Serv1Service } from './../serv1/serv1.service';


import { ControController } from './../contro/contro.controller';
import { User } from './../entity/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [ControController],
	providers: [ServService, Serv1Service]
})
export class ModuModule {}
