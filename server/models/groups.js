const groups = [
  {
    id: 1,
    name: 'choir group',
    role: "admin",
    groupMembers: [{
      groupId: 1,
      memberId: 1,
      userRole: "admin",
    }, {
      groupId: 1,
      memberId: 2,
      userRole: "admin",
    }, {
      groupId: 1,
      memberId: 3,
      userRole: "member",
    },
    ],
  },
  {
    id: 2,
    name: 'Classmates',
    role: "admin",
    groupMembers: [{
      groupId: 2,
      memberId: 1,
      userRole: "member",
    }, {
      groupId: 2,
      memberId: 2,
      userRole: "admin",
    }, {
      groupId: 2,
      memberId: 3,
      userRole: "member",
    },
    ],
  },
  {
    id: 3,
    name: 'Bakery school',
    role: "member",
    groupMembers: [{
      groupId: 3,
      memberId: 1,
      userRole: "admin",
    }, {
      groupId: 3,
      memberId: 2,
      userRole: "member",
    }, {
      groupId: 3,
      memberId: 3,
      userRole: "member",
    },
    ],
  },
  {
    id: 1,
    name: 'Family',
    role: "member",
    groupMembers: [{
      groupId: 3,
      memberId: 1,
      userRole: "admin",
    }, {
      groupId: 3,
      memberId: 2,
      userRole: "member",
    }, {
      groupId: 3,
      memberId: 3,
      userRole: "member",
    },
    ],
  },

];

export default groups;
