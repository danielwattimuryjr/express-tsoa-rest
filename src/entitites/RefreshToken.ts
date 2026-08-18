import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    type Relation,
} from 'typeorm';
import { User } from './User';

@Entity({
    schema: 'auth',
    name: 'refresh_tokens',
})
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.refreshTokens)
    user: Relation<User>;

    @Column({ type: 'varchar' })
    token: string;

    @Column('timestamp without time zone')
    expiresAt: Date;

    @Column({ type: 'boolean' })
    revoked: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
