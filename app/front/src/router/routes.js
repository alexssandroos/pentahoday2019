import User from '../components/user/User'
import Home from '../components/home/Home'

const core = [ {
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/user',
  name: 'User',
  component: User
}
]

export default [
  ...core
]