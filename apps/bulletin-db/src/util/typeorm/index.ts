import { Article } from './entities/Article'
import { Publisher } from './entities/Publisher'
import { CommentReply } from './entities/Reply'
import { Comment } from './entities/Comment'
import { User } from './entities/User'

const entities = [Article, Publisher, User, Comment, CommentReply]
export { Article, Publisher, User, Comment, CommentReply }
export default entities
