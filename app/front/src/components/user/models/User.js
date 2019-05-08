
export default class User {
  constructor(user) {
    this.user = user
    this.columnNames = [
      {
        text: 'User ID',
        align: 'left',
        sortable: true,
        value: 'id'
      },
      { text: 'Name', value: 'name' },
      { text: 'Age', value: 'age' },
      { text: 'Is Active', value: 'isActive' },
      { text: 'Birth Date', value: 'birthDate' },
      { text: 'Actions', value: 'actions' }
    ]
  }

  read(api) {
    return api.get('user').then(r => {
      return this.parseUserResponse(r.data)
    }).catch(e => e)
  }

  save(api, resource, index) {
    index === -1
      ? this.create(api, resource)
      : this.update(api, resource)
  }

  create(api, resource) {
    api({
      method: 'post',
      url: '/user',
      params: {
        paramMETHOD: 'INSERT',
        paramUSER_NAME: resource.name,
        paramUSER_AGE: resource.age,
        paramUSER_ACTIVE: resource.isActive,
        paramUSER_BIRTH_DATE: resource.birthDate,
        stepName: 'OUTPUT',
        kettleOutput: 'Inferred'
      }
    }).then(r => r)
  }

  update(api, resource) {
    api({
      method: 'post',
      url: '/user',
      params: {
        paramMETHOD: 'UPDATE',
        paramUSER_ID: resource.id,
        paramUSER_NAME: resource.name,
        paramUSER_AGE: resource.age,
        paramUSER_ACTIVE: resource.isActive,
        paramUSER_BIRTH_DATE: resource.birthDate,
        stepName: 'OUTPUT',
        kettleOutput: 'Inferred'
      }
    }).then(r => r)
  }

  delete(api, resourceID) {
    api({
      method: 'post',
      url: '/user',
      params: {
        paramMETHOD: 'DELETE',
        paramUSER_ID: resourceID,
        stepName: 'OUTPUT',
        kettleOutput: 'Inferred'
      }
    }).then(r => r)
  }

  parseUserResponse(response) {
    const buildUserObject = user => {
      return {
        id: user[0],
        name: user[1],
        age: user[2],
        isActive: user[3],
        birthDate: new Date(user[4]).toLocaleString().split(' ')[0]
      }
    }
    return response.resultset.map(i => buildUserObject(i));
  }

}