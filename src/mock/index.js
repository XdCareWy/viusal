export default [
  {
    parents: [],
    id: 1,
    pointName: "活动1",
    type: 0,
    children: [
      {
        id: 1,
        fid: 1,
        sid: 2
      },
      {
        id: 2,
        fid: 1,
        sid: 3
      },
      {
        id: 3,
        fid: 1,
        sid: 4
      }
    ]
  },
  {
    parents: [
      {
        id: 1,
        fid: 1,
        sid: 2
      }
    ],
    id: 2,
    pointName: "页面1",
    type: 6,
    children: [
      {
        id: 1,
        fid: 2,
        sid: 5
      },
      {
        id: 2,
        fid: 2,
        sid: 6
      }
    ]
  },
  {
    parents: [
      {
        id: 1,
        fid: 1,
        sid: 3
      }
    ],
    id: 3,
    pointName: "页面2",
    type: 6,
    children: [
      {
        id: 1,
        fid: 3,
        sid: 6
      },
      {
        id: 2,
        fid: 3,
        sid: 7
      }
    ]
  },
  {
    parents: [
      {
        id: 1,
        fid: 1,
        sid: 4
      }
    ],
    id: 4,
    pointName: "页面3",
    type: 6,
    children: [
      {
        id: 1,
        fid: 4,
        sid: 5
      },
      {
        id: 2,
        fid: 4,
        sid: 7
      }
    ]
  },
  {
    parents: [
      {
        id: 1,
        fid: 2,
        sid: 5
      },
      {
        id: 1,
        fid: 4,
        sid: 5
      }
    ],
    id: 5,
    pointName: "接口1",
    type: 4,
    children: [
      {
        id: 1,
        fid: 5,
        sid: 8
      },
      {
        id: 2,
        fid: 5,
        sid: 9
      },
      {
        id: 3,
        fid: 5,
        sid: 6
      }
    ]
  },
  {
    parents: [
      {
        id: 1,
        fid: 2,
        sid: 6
      },
      {
        id: 1,
        fid: 3,
        sid: 6
      }
    ],
    id: 6,
    pointName: "接口2",
    type: 4,
    children: [
      {
        id: 1,
        fid: 6,
        sid: 9
      }
    ]
  },
  {
    parents: [
      {
        id: 1,
        fid: 3,
        sid: 7
      },
      {
        id: 1,
        fid: 4,
        sid: 7
      }
    ],
    id: 7,
    pointName: "接口3",
    type: 4,
    children: [
      {
        id: 1,
        fid: 7,
        sid: 8
      }
    ]
  },
  {
    parents: [
      {
        id: 1,
        fid: 7,
        sid: 8
      }
    ],
    id: 8,
    pointName: "缓存1",
    type: 1,
    children: [
      {
        id: 1,
        fid: 8,
        sid: 10
      }
    ]
  },
  {
    parents: [
      {
        id: 1,
        fid: 5,
        sid: 9
      },
      {
        id: 1,
        fid: 6,
        sid: 9
      }
    ],
    id: 9,
    pointName: "缓存2",
    type: 1,
    children: [
      {
        id: 1,
        fid: 9,
        sid: 10
      }
    ]
  },
  {
    parents: [
      {
        id: 1,
        fid: 8,
        sid: 10
      },
      {
        id: 2,
        fid: 9,
        sid: 10
      }
    ],
    id: 10,
    pointName: "数据库1",
    type: 2,
    children: []
  }
];
