const exhibitionsData = [
    {
      title: 'Current Exhibitions', // Section title
      data: [
        {
          id: '1',
          title: 'Bad Kitty Does Not Like Art Museums',
          description: 'Bad Kitty Does Not Like Art Museums highlights works of art from author and illustrator Nick Bruel. For over twenty years, his stories have connected with children and adults alike. His whimsical narratives teach valuable life lessons through humor and the curious Bad Kitty.',
          imageUrl: require('../assets/images/badkittyexhibitionimage.jpg'),
          link: '/home', // Optional internal navigation link
        },
        {
          id: '2',
          title: 'Exhibition Two',
          description: 'This is a description of Exhibition Two.',
          imageUrl: 'https://example.com/exhibition2.jpg',
        },
      ],
    },
    {
      title: 'Upcoming Exhibitions', // Section title
      data: [
        {
          id: '3',
          title: 'Exhibition Three',
          description: 'This is a description of Exhibition Three.',
          imageUrl: 'https://example.com/exhibition3.jpg',
        },
      ],
    },
  ];

  export default exhibitionsData;