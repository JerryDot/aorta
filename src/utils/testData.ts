export const getTestData = (noOfWeeks: number) => {
  let fullTestData = [];

  let days = {
    one: new Date(),
    two: new Date(),
    three: new Date(),
    four: new Date(),
    five: new Date(),
    six: new Date(),
    seven: new Date(),
  };
  days.six.setDate(days.six.getDate() - 1);
  days.five.setDate(days.five.getDate() - 2);
  days.four.setDate(days.four.getDate() - 3);
  days.three.setDate(days.three.getDate() - 4);
  days.two.setDate(days.two.getDate() - 5);
  days.one.setDate(days.one.getDate() - 6);

  let keyStart = 112;

  for (var i = 0; i < noOfWeeks; i++) {
    let testData = [
      {
        day: new Date(days.one.toISOString().split('T')[0] + 'T00:00:00.000Z'),
        moods: [
          {
            recordID: keyStart + '7bc67-7973-a5a2-950a-1821fa81e55b',
            rating: 3,
            flavour: null,
            comment: null,
            date: new Date(days.one.toISOString().split('T')[0] + 'T20:20:00.000Z'),
          },
        ],
        activities: [],
        calories: [
          {
            date: new Date(days.one.toISOString().split('T')[0] + 'T20:20:00.000Z'),
            amount: 74,
            recordID: keyStart + 'a02cb-7835-a287-b0e6-bbea391b7447',
          },
          {
            date: new Date(days.one.toISOString().split('T')[0] + 'T20:20:00.000Z'),
            amount: 74,
            recordID: keyStart + 'ed765-4bf1-aa6d-be23-68e9e334e646',
          },
          {
            date: new Date(days.one.toISOString().split('T')[0] + 'T20:20:00.000Z'),
            amount: 74,
            recordID: keyStart + '07b74-77f9-a211-bd67-2e89225e976f',
          },
          {
            date: new Date(days.one.toISOString().split('T')[0] + 'T20:20:00.000Z'),
            amount: 74,
            recordID: keyStart + '11a4c-f34e-afef-aaa1-e283fd3edf96',
          },
          {
            date: new Date(days.one.toISOString().split('T')[0] + 'T20:20:00.000Z'),
            amount: 74,
            recordID: keyStart + 'e004b-0d04-ae16-8fb6-c7f273f84dd0',
          },
          {
            date: new Date(days.one.toISOString().split('T')[0] + 'T21:57:00.000Z'),
            amount: 74,
            recordID: keyStart + '4e42d-149c-a2bb-a946-7c65b01b1c57',
          },
          {
            date: new Date(days.one.toISOString().split('T')[0] + 'T21:57:00.000Z'),
            amount: 74,
            recordID: keyStart + '9678b-6da2-ad6c-8008-4cfb6c45f4a8',
          },
        ],
        weight: [
          {
            date: new Date(days.one.toISOString().split('T')[0] + 'T21:57:00.000Z'),
            amount: 76,
            recordID: keyStart + '204da-8e8e-aeec-9bd2-8733cbb2957a',
          },
          {
            date: new Date(days.one.toISOString().split('T')[0] + 'T21:57:00.000Z'),
            amount: 72,
            recordID: keyStart + '7f1cd-e3fd-a957-8cd3-81df52266e12',
          },
        ],
      },
      {
        day: new Date(days.two.toISOString().split('T')[0] + 'T00:00:00.000Z'),
        moods: [
          {
            recordID: keyStart + 'a268e-efac-ad5f-bb0d-86470de98824',
            rating: 3,
            flavour: null,
            comment: null,
            date: new Date(days.two.toISOString().split('T')[0] + 'T20:20:00.000Z'),
          },
          {
            recordID: keyStart + 'e53ff-1172-a936-a452-f7dbfdb9d911',
            rating: 3,
            flavour: null,
            comment: null,
            date: new Date(days.two.toISOString().split('T')[0] + 'T21:57:00.000Z'),
          },
        ],
        activities: [],
        calories: [
          {
            date: new Date(days.two.toISOString().split('T')[0] + 'T20:20:00.000Z'),
            amount: 74,
            recordID: keyStart + '3895a-e9c8-a5fb-a569-b3156259fe57',
          },
          {
            date: new Date(days.two.toISOString().split('T')[0] + 'T20:20:00.000Z'),
            amount: 74,
            recordID: keyStart + '279f4-ba91-adfd-9a52-fc6ee9ba072c',
          },
          {
            date: new Date(days.two.toISOString().split('T')[0] + 'T20:20:00.000Z'),
            amount: 74,
            recordID: keyStart + '74ec8-6221-a32c-bb5c-db04de19f741',
          },
          {
            date: new Date(days.two.toISOString().split('T')[0] + 'T21:57:00.000Z'),
            amount: 400,
            recordID: keyStart + 'd82f1-0e73-a338-a956-7544725c9fce',
          },
          {
            date: new Date(days.two.toISOString().split('T')[0] + 'T21:57:00.000Z'),
            amount: 400,
            recordID: keyStart + '26c43-6867-ab61-a240-50a4451e5a23',
          },
        ],
        weight: [],
      },
      {
        day: new Date(days.three.toISOString().split('T')[0] + 'T00:00:00.000Z'),
        moods: [
          {
            recordID: keyStart + '494c3-ed72-ad56-8547-39a09a404f41',
            rating: 9,
            flavour: null,
            comment: null,
            date: new Date(days.three.toISOString().split('T')[0] + 'T21:57:30.589Z'),
          },
          {
            recordID: keyStart + 'aac80-b8f8-a627-84f9-301fc542991c',
            rating: 8,
            flavour: null,
            comment: null,
            date: new Date(days.three.toISOString().split('T')[0] + 'T22:26:08.300Z'),
          },
        ],
        activities: [],
        calories: [
          {
            date: new Date(days.three.toISOString().split('T')[0] + 'T21:57:32.084Z'),
            amount: 400,
            recordID: keyStart + 'e6f4f-c37a-aca4-b448-e2d9bed99112',
          },
        ],
        weight: [
          {
            date: new Date(days.three.toISOString().split('T')[0] + 'T21:58:18.507Z'),
            amount: 70,
            recordID: keyStart + '9ec74-3ac9-a4ac-a46b-9e4db3fdd10b',
          },
        ],
      },
      {
        day: new Date(days.four.toISOString().split('T')[0] + 'T00:00:00.000Z'),
        moods: [
          {
            recordID: keyStart + '7bc67-7973-a592-950a-1821fa81e55b',
            rating: 3,
            flavour: null,
            comment: null,
            date: new Date(days.four.toISOString().split('T')[0] + 'T20:20:00.000Z'),
          },
        ],
        activities: [],
        calories: [
          {
            date: new Date(days.four.toISOString().split('T')[0] + 'T20:20:00.000Z'),
            amount: 74,
            recordID: keyStart + 'a02cb-7835-4287-b0e6-bbea391b7447',
          },
          {
            date: new Date(days.four.toISOString().split('T')[0] + 'T20:20:00.000Z'),
            amount: 74,
            recordID: keyStart + 'ed765-4bf1-4a6d-be23-68e9e334e646',
          },
          {
            date: new Date(days.four.toISOString().split('T')[0] + 'T20:20:00.000Z'),
            amount: 74,
            recordID: keyStart + '07b74-77f9-4211-bd67-2e89225e976f',
          },
          {
            date: new Date(days.four.toISOString().split('T')[0] + 'T20:20:00.000Z'),
            amount: 74,
            recordID: keyStart + '11a4c-f34e-4fef-aaa1-e283fd3edf96',
          },
          {
            date: new Date(days.four.toISOString().split('T')[0] + 'T20:20:00.000Z'),
            amount: 74,
            recordID: keyStart + 'e004b-0d04-4e16-8fb6-c7f273f84dd0',
          },
          {
            date: new Date(days.four.toISOString().split('T')[0] + 'T21:57:00.000Z'),
            amount: 74,
            recordID: keyStart + '4e42d-149c-42bb-a946-7c65b01b1c57',
          },
          {
            date: new Date(days.four.toISOString().split('T')[0] + 'T21:57:00.000Z'),
            amount: 74,
            recordID: keyStart + '9678b-6da2-4d6c-8008-4cfb6c45f4a8',
          },
        ],
        weight: [
          {
            date: new Date(days.four.toISOString().split('T')[0] + 'T21:57:00.000Z'),
            amount: 76,
            recordID: keyStart + '204da-8e8e-4eec-9bd2-8733cbb2957a',
          },
          {
            date: new Date(days.four.toISOString().split('T')[0] + 'T21:57:00.000Z'),
            amount: 72,
            recordID: keyStart + '7f1cd-e3fd-4957-8cd3-81df52266e12',
          },
        ],
      },
      {
        day: new Date(days.five.toISOString().split('T')[0] + 'T00:00:00.000Z'),
        moods: [
          {
            recordID: keyStart + 'a268e-efac-4d5f-bb0d-86470de98824',
            rating: 3,
            flavour: null,
            comment: null,
            date: new Date(days.five.toISOString().split('T')[0] + 'T20:20:00.000Z'),
          },
          {
            recordID: keyStart + 'e53ff-1172-4936-a452-f7dbfdb9d911',
            rating: 3,
            flavour: null,
            comment: null,
            date: new Date(days.five.toISOString().split('T')[0] + 'T21:57:00.000Z'),
          },
        ],
        activities: [],
        calories: [
          {
            date: new Date(days.five.toISOString().split('T')[0] + 'T20:20:00.000Z'),
            amount: 74,
            recordID: keyStart + '3895a-e9c8-45fb-a569-b3156259fe57',
          },
          {
            date: new Date(days.five.toISOString().split('T')[0] + 'T20:20:00.000Z'),
            amount: 74,
            recordID: keyStart + '279f4-ba91-4dfd-9a52-fc6ee9ba072c',
          },
          {
            date: new Date(days.five.toISOString().split('T')[0] + 'T20:20:00.000Z'),
            amount: 74,
            recordID: keyStart + '74ec8-6221-432c-bb5c-db04de19f741',
          },
          {
            date: new Date(days.five.toISOString().split('T')[0] + 'T21:57:00.000Z'),
            amount: 400,
            recordID: keyStart + 'd82f1-0e73-4338-a956-7544725c9fce',
          },
          {
            date: new Date(days.five.toISOString().split('T')[0] + 'T21:57:00.000Z'),
            amount: 400,
            recordID: keyStart + '26c43-6867-4b61-a240-50a4451e5a23',
          },
        ],
        weight: [],
      },
      {
        day: new Date(days.six.toISOString().split('T')[0] + 'T00:00:00.000Z'),
        moods: [
          {
            recordID: keyStart + '494c3-ed72-4d56-8547-39a09a404f41',
            rating: 9,
            flavour: null,
            comment: null,
            date: new Date(days.six.toISOString().split('T')[0] + 'T21:57:30.589Z'),
          },
          {
            recordID: keyStart + 'aac80-b8f8-4627-84f9-301fc542991c',
            rating: 8,
            flavour: null,
            comment: null,
            date: new Date(days.six.toISOString().split('T')[0] + 'T22:26:08.300Z'),
          },
        ],
        activities: [],
        calories: [
          {
            date: new Date(days.six.toISOString().split('T')[0] + 'T21:57:32.084Z'),
            amount: 400,
            recordID: keyStart + 'e6f4f-c37a-4ca4-b448-e2d9bed99112',
          },
        ],
        weight: [
          {
            date: new Date(days.six.toISOString().split('T')[0] + 'T21:58:18.507Z'),
            amount: 70,
            recordID: keyStart + '9ec74-3ac9-44ac-a46b-9e4db3fdd10b',
          },
        ],
      },
      {
        day: new Date(days.seven.toISOString().split('T')[0] + 'T00:00:00.925Z'),
        moods: [
          {
            recordID: keyStart + 'a21af-57e1-4a07-97e3-691974f93b16',
            rating: 5,
            flavour: null,
            comment: null,
            date: new Date(days.seven.toISOString().split('T')[0] + 'T09:13:07.817Z'),
          },
          {
            recordID: keyStart + 'de3dd-7618-43a7-b43d-ae8dc179a60a',
            rating: 8,
            flavour: null,
            comment: null,
            date: new Date(days.seven.toISOString().split('T')[0] + 'T11:58:52.491Z'),
          },
          {
            recordID: keyStart + '27461-0bd8-40ba-b54c-7fd1638b82ef',
            rating: 7,
            flavour: null,
            comment: null,
            date: new Date(days.seven.toISOString().split('T')[0] + 'T13:05:07.083Z'),
          },
          {
            recordID: keyStart + '2ea13-28d9-4159-945b-53740b961037',
            rating: 8,
            flavour: null,
            comment: null,
            date: new Date(days.seven.toISOString().split('T')[0] + 'T14:41:03.621Z'),
          },
          {
            recordID: keyStart + '59209-6a2a-4fed-a5d0-63bda1f7f9ec',
            rating: 6,
            flavour: null,
            comment: null,
            date: new Date(days.seven.toISOString().split('T')[0] + 'T16:32:12.980Z'),
          },
          {
            recordID: keyStart + '3dbe7-ce6c-416a-8c87-cb16b0b5853c',
            rating: 4,
            flavour: null,
            comment: null,
            date: new Date(days.seven.toISOString().split('T')[0] + 'T17:33:30.188Z'),
          },
          {
            recordID: keyStart + '9af99-3bbf-4e51-8ef4-8f85056857ca',
            rating: 7,
            flavour: null,
            comment: null,
            date: new Date(days.seven.toISOString().split('T')[0] + 'T18:07:59.881Z'),
          },
          {
            recordID: keyStart + '8bd45-0cb5-4def-8aaa-98f2b798ecd2',
            rating: 6,
            flavour: null,
            comment: null,
            date: new Date(days.seven.toISOString().split('T')[0] + 'T19:04:07.826Z'),
          },
        ],
        activities: [],
        calories: [
          {
            date: new Date(days.seven.toISOString().split('T')[0] + 'T09:12:56.925Z'),
            amount: 100,
            recordID: keyStart + '692b4-3878-4db0-80a4-a08de478f5c8',
          },
          {
            date: new Date(days.seven.toISOString().split('T')[0] + 'T11:59:02.361Z'),
            amount: 400,
            recordID: keyStart + 'af8f0-a55d-47c3-b1a8-68739170304b',
          },
          {
            date: new Date(days.seven.toISOString().split('T')[0] + 'T13:55:51.138Z'),
            amount: 400,
            recordID: keyStart + '8dc60-92d4-4c94-a39a-59294f24fe8d',
          },
          {
            date: new Date(days.seven.toISOString().split('T')[0] + 'T14:41:05.382Z'),
            amount: 74,
            recordID: keyStart + 'ecde1-99e5-40de-848e-1999c1184c4b',
          },
          {
            date: new Date(days.seven.toISOString().split('T')[0] + 'T16:32:20.706Z'),
            amount: 100,
            recordID: keyStart + 'fb929-4449-4cfa-bfa5-c0a7b4f8cd13',
          },
          {
            date: new Date(days.seven.toISOString().split('T')[0] + 'T18:07:01.564Z'),
            amount: 100,
            recordID: keyStart + '39d04-23c0-4b61-a9e1-a0415eadc217',
          },
        ],
        weight: [
          {
            date: new Date(days.seven.toISOString().split('T')[0] + 'T09:50:24.648Z'),
            amount: 79.4,
            recordID: keyStart + '62354-8d1a-46d4-8ba6-0cbe7005ff97',
          },
        ],
      },
    ];
    fullTestData.push(...testData);
    days.seven.setDate(days.seven.getDate() - 7);
    days.six.setDate(days.six.getDate() - 7);
    days.five.setDate(days.five.getDate() - 7);
    days.four.setDate(days.four.getDate() - 7);
    days.three.setDate(days.three.getDate() - 7);
    days.two.setDate(days.two.getDate() - 7);
    days.one.setDate(days.one.getDate() - 7);
    keyStart = keyStart + 111;
  }
  return fullTestData;
};
