import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    type Relation,
} from 'typeorm';
import { User } from './User';
import { Permission } from './Permission';

@Entity({
    schema: 'auth',
    name: 'roles',
})
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 20,
        unique: true,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    description: string;

    @ManyToMany(() => User, (user) => user.roles)
    users: Relation<User[]>;

    @ManyToMany(() => Permission, (permission) => permission.roles)
    @JoinTable({
        name: 'role_permissions',
        schema: 'auth',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id',
        },
    })
    permissions: Permission[];
}
