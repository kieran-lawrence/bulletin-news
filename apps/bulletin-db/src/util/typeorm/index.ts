import { Article } from './entities/Article'
import { Publisher } from './entities/Publisher'
import { Comment } from './entities/Comment'
import { User } from './entities/User'
import { Thread } from './entities/Thread'
import { ThreadParticipant } from './entities/ThreadParticipant'

const entities = [Article, Publisher, User, Comment, Thread, ThreadParticipant]
export { Article, Publisher, User, Comment, Thread, ThreadParticipant }
export default entities
