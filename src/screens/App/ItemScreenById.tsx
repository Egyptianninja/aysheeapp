import * as React from 'react';
import { Query } from 'react-apollo';
import getPost from '../../graphql/query/getPost';
import { Loading } from '../../componenets/';
import ItemScreen from './ItemScreen';

class ItemScreenById extends React.Component<any, any> {
  render() {
    const postId = this.props.navigation.getParam('postId');
    const word = this.props.navigation.getParam('word');
    const lang = this.props.navigation.getParam('lang');

    return (
      <Query query={getPost} variables={{ postId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            console.log(error);
          }

          const post = data.getPost.data;
          return (
            <ItemScreen
              post={post}
              word={word}
              lang={lang}
              navigation={this.props.navigation}
            />
          );
        }}
      </Query>
    );
  }
}

export default ItemScreenById;
