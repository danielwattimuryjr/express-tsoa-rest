import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from './Role';

@Entity({
    schema: 'auth',
    name: 'permissions',
})
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        unique: true,
    })
    name: string;

    @ManyToMany(() => Role, (role) => role.permissions)
    roles: Role[];
}
