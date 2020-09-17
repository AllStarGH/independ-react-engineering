import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuModule } from './com/allstar/gits/main/user/modu/modu.module';
import { ErrorsInterceptors } from './com/allstar/gits/common/errors.interceptor';

/**
 * @Module()
 * 定义一个模块，并管理这个模块的导入集合、控制器集合、提供者集合、导出集合
 */
@Module({
	// 导入其他模块的集合
	// TypeOrmModule.forRoot() 默认加载项目根目录下的 ormconfig.json 配置文件用于配置数据库连接
	imports: [TypeOrmModule.forRoot(), ModuModule],
	// 当前模块的控制器集合
  	controllers: [AppController],
  	// 当前模块的提供者集合
  	providers: [
	{
		provide: APP_INTERCEPTOR,
		useClass: ErrorsInterceptors
	},
  	AppService],
	exports: [] // 导出当前模块的提供者，用于被其他模块调用
})
export class AppModule {}
