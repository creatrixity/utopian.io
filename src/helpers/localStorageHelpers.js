import store from 'store';
import _ from 'lodash';

import Promise from 'bluebird';
import SteemConnect from 'sc2-sdk';

Promise.promisifyAll(SteemConnect, { context: SteemConnect });

const getMetadata = () => SteemConnect.me().then(resp => resp.user_metadata);

export const getDrafts = () => store.get('drafts') || {};

export const addDraftLocaleStorage = (draft) => getMetadata()
  .then(metadata => {
    const drafts = store.get('drafts') || {};
    drafts[draft.id] = draft.postData;
    store.set('drafts', drafts);
    return drafts;
  })
  .then(drafts => drafts[draft.id]);

export const deleteDraftLocaleStorage = (draftId) => new Promise(function(resolve, reject) {
  const drafts = store.get('drafts') || {};
  delete drafts[draftId];
  store.set('drafts', drafts);
  resolve(drafts);
});

export const getFavoriteUsers = () => store.get('users') || {};

export const addFavoriteUser = (username) => {
  const users = store.get('users') || {};
  users[username] = {};
  store.set('users', users);
  return true;
};

export const removeFavoriteUser = (username) => {
  const users = store.get('users') || {};
  delete users[username];
  store.set('users', users);
  return true;
};

export const toggleFavoriteUser = (username) => {
  const users = store.get('users') || {};
  return _.has(users, username) ? removeFavoriteUser(username) : addFavoriteUser(username);
};

export const getFavoriteCategories = () => store.get('categories') || {};

export const addFavoriteCategory = (category) => {
  const categories = store.get('categories') || {};
  categories[category] = {};
  store.set('categories', categories);
  return true;
};

export const removeFavoriteCategory = (category) => {
  const categories = store.get('categories') || {};
  delete categories[category];
  store.set('categories', categories);
  return true;
};

export const toggleFavoriteCategory = (category) => {
  const categories = store.get('categories') || {};
  return _.has(categories, category)
    ? removeFavoriteCategory(category)
    : addFavoriteCategory(category);
};

export const getLocale = () => store.get('locale') || 'en';

export const setLocale = (locale) => {
  store.set('locale', locale);
};
