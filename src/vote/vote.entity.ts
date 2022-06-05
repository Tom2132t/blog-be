import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vote } from '../shared/enums/vote.enum';
import { UserEntity } from '../user/user.entity';
import { PostEntity } from '../post/post.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity('vote')
export class VoteEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  vote: Vote;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ApiProperty({ type: () => PostEntity })
  @ManyToOne(() => PostEntity, (post) => post.votes, {onDelete:'CASCADE'})
  post: PostEntity;
}
