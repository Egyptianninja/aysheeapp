import gql from 'graphql-tag';

export default gql`
  mutation updateMyQty {
    updateMyQty {
      ok
      data {
        offersqty
        onlineqty
        offlineqty
        frontqty
      }
      error
    }
  }
`;
