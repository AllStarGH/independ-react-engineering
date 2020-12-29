import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// 表名: t_user
// @Entity('t_user')
@Entity()
export class User {

    @PrimaryGeneratedColumn({ comment: '主键ID' })
    id: number;

    @Column({ comment: '用户名', length: 36 })
    userName: string;

    @Column({ comment: '邮箱地址', length: 60 })
    userEmail: string;

    @Column({ comment: '电话号码', length: 48 })
    phoneNum: string;

    @Column({ comment: '住址', length: 100 })
    homeAddress: string;

    @Column({ comment: '密码', length: 100 })
    password: string;

    @Column({ comment: '盐值', length: 100 })
    salt: string;

}