import AuthMiddleware from './authMiddleware';
import Permissions from '../util/permissions';

const {
  authenticate, verifyRoles
} = AuthMiddleware;
const {
  lecturer,
  student
} = Permissions;

const Bouncers = {
  lecturerBouncers: [authenticate, verifyRoles(lecturer)],
  studentBouncers: [authenticate, verifyRoles(student)]
};

export default Bouncers;
