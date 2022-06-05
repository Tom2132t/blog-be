import { EntityRepository, Like, Repository, SelectQueryBuilder } from "typeorm";
import { CommentEntity } from './comment.entity';
import { PaginateModel } from "../shared/models/paginate.model";

export interface CommentFilter extends PaginateModel {
  comment?: string;
  postId: number;
}

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  private async getCommentAndSubEntities(): Promise<SelectQueryBuilder<CommentEntity>> {
    return this.createQueryBuilder('comment')
      .select([
        'comment.id',
        'comment.comment',
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'post.id'
      ])
      .leftJoin('comment.post', 'post')
      .leftJoin('comment.user', 'user');
  }

  async findAndCount(options: CommentFilter): Promise<[CommentEntity[], number]> {
    const qb: SelectQueryBuilder<CommentEntity> = await this.getCommentAndSubEntities();

    const { skip, take, comment, postId } = options;
    qb.skip(skip);
    qb.take(take);
    qb.where('post.id = :postId', { postId });

    if (comment) {
      qb.andWhere({
        comment: Like(`%${comment}%`)
      });
    }

    return qb.getManyAndCount();
  }

  // @ts-ignore
  async findOne(id: number): Promise<CommentEntity | undefined> {
    const qb: SelectQueryBuilder<CommentEntity> = await this.getCommentAndSubEntities();
    qb.where({ id });

    return qb.getOne();
  }
}
