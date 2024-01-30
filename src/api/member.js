const ServiceModel = {
    addMember: {
        url: '/api/member/create',
        method: 'post',
    },
    addMembers: {
        url: '/api/member/createBatch',
        method: 'post',
    },
    updateMember: {
        url: '/api/member/update',
        method: 'post',
    },
    updateMembers: {
        url: '/api/member/updateBatch',
        method: 'post',
    },
    deleteMember: {
        url: '/api/member/delete',
        method: 'delete',
    },
    queryMember: {
        url: '/api/member/query',
        method: 'get',
    },
    listOccupation: {
        url: '/api/occupation/list',
        method: 'get',
    },
}

const memberApi = {...ServiceModel}

export default memberApi