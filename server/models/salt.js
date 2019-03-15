import bcrypt from 'bcrypt';

// const emailSuffix = "@epicmail.com";
const salt = bcrypt.genSaltSync(5);
/*  const users = [
  {
    id: 1, email: `ola357${emailSuffix}`, firstName: 'olaoluwa', lastName: 'alli', password: bcrypt.hashSync('abc123', salt),
  },
  {
    id: 2, email: `bim007${emailSuffix}`, firstName: 'bimbo', lastName: 'lawal', password: bcrypt.hashSync('efg678', salt),
  },
  {
    id: 3, email: `ada90${emailSuffix}`, firstName: 'adaoma', lastName: 'jiburu', password: bcrypt.hashSync('nitro89', salt),
  },
]; */
export default salt;
