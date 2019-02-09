import * as React from 'react';
import { Query } from 'react-apollo';
import getPost from '../../graphql/query/getPost';
import { Loading } from '../../componenets/';
import { readyPost } from '../../utils';
import ItemScreen from './ItemScreen';

class ItemScreenById extends React.Component<any, any> {
  static navigationOptions = {
    header: null
  };
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
          const post = readyPost(data.getPost.data, lang);
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
