import filesMethods from '/imports/api/files/methods'

import membersMethods from '/imports/api/members/methods'
import membersPublications from '/imports/api/members/server/publications'

import userAccountConfigs from '/imports/api/users/account-configs'
import usersMethods from '/imports/api/users/methods'
import usersPublications from '/imports/api/users/server/publications'

const APIs = [
  filesMethods,
  membersMethods,
  membersPublications,
  userAccountConfigs,
  usersMethods,
  usersPublications
]

export default (context) => {
  APIs.map((api) => api(context))
}
