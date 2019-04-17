export const handleOnMenuModal = async ({
  menuId,
  postId,
  post,
  words,
  isAuthenticated,
  showMessageModal,
  favoritePost,
  unFavoritePost,
  showReportModal,
  editClassifieds,
  updateItemsQty,
  showEditModal,
  showCheckMessageModal
}: any) => {
  if (menuId === 1) {
    if (!isAuthenticated) {
      showMessageModal({ message: 'you have to login!' });
    } else {
      await favoritePost({
        variables: { postId }
      });
      showMessageModal({
        message: words.successadded
      });
    }
  } else if (menuId === 2) {
    await unFavoritePost({
      variables: { postId }
    });
    showMessageModal({
      message: words.removeedtovafavorites
    });
  } else if (menuId === 3) {
    //
  } else if (menuId === 4) {
    if (!isAuthenticated) {
      showMessageModal({ message: 'you have to login!' });
    } else {
      showReportModal();
    }
  } else if (menuId === 5) {
    if (post.updates) {
      editClassifieds({
        variables: {
          postId: post.id,
          updates: post.updates + 1
        }
      });
    } else {
      editClassifieds({
        variables: {
          postId,
          updates: 1
        }
      });
    }

    showMessageModal({
      message: words.adrefreshed
    });
  } else if (menuId === 6) {
    const res = await editClassifieds({
      variables: {
        postId,
        islive: true
      }
    });
    if (res.data.updatePost.ok) {
      updateItemsQty(words.adpublished);
    }
  } else if (menuId === 7) {
    const res = await editClassifieds({
      variables: {
        postId,
        islive: false,
        isfront: false
      }
    });
    if (res.data.updatePost.ok) {
      updateItemsQty(words.adunpupished);
    }
  } else if (menuId === 8) {
    showEditModal();
  } else if (menuId === 9) {
    showCheckMessageModal();
  } else if (menuId === 10) {
    const res = await editClassifieds({
      variables: {
        postId,
        isfront: true
      }
    });
    if (res.data.updatePost.ok) {
      updateItemsQty(words.frontadded);
    }
  } else if (menuId === 11) {
    const res = await editClassifieds({
      variables: {
        postId,
        isfront: false
      }
    });
    if (res.data.updatePost.ok) {
      updateItemsQty(words.frontremoved);
    }
  }
};
