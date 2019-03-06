import gql from 'graphql-tag';

export default gql`
  query getShopsWithOffers {
    getShopsWithOffers {
      _id
      name
      avatar
      offers {
        _id
        title
        body
        photos
        start
        end
        trueLocation {
          lat
          lon
        }
      }
    }
  }
`;
