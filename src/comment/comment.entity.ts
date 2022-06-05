import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { PostEntity } from '../post/post.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity('comment')
export class CommentEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  comment: string;

  @ApiProperty({ type: () => PostEntity })
  @ManyToOne(() => PostEntity, (post) => post.comments, {onDelete:'CASCADE'})
  post: PostEntity;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
