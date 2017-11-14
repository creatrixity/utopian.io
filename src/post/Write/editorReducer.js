import * as authActions from '../../auth/authActions';
import * as editorActions from './editorActions';
import * as postActions from '../postActions';
import * as userActions from '../../user/userActions';

const defaultState = {
  loading: false,
  error: null,
  success: false,
  saving: false,
  draftPosts: {},
  pendingDrafts: [],
  draftPostsSC2: {},
  pendingDraftsSC2: [],
  editedPosts: [],
};

const editor = (state = defaultState, action) => {
  switch (action.type) {
    case editorActions.ADD_EDITED_POST:
      return {
        ...state,
        editedPosts: [
          ...state.editedPosts,
          action.payload,
        ],
      };
    case postActions.GET_CONTENT_SUCCESS:
      return {
        ...state,
        editedPosts: state.editedPosts.filter(post => post !== action.payload.permlink),
      };
    case editorActions.DELETE_EDITED_POST:
      return {
        ...state,
        editedPosts: state.editedPosts.filter(post => post !== action.payload),
      };
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        draftPosts: action.payload.drafts || defaultState.draftPosts,
        draftPostsSC2: action.payload.user_metadata.drafts || defaultState.draftPostsSC2,
      };
    case editorActions.NEW_POST:
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
        loadingImg: false,
      };
    case editorActions.CREATE_POST_START:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case editorActions.CREATE_POST_ERROR:
      return {
        ...state,
        error: action.payload.result,
        loading: false,
        success: false,
      };
    case editorActions.CREATE_POST_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        success: true,
      };
    case editorActions.SAVE_DRAFT_START:
      return {
        ...state,
        saving: true,
      };
    case editorActions.SAVE_DRAFT_SUCCESS:
      return {
        ...state,
        draftPosts: { ...state.draftPosts, [action.meta.postId]: action.payload },
        saving: false,
      };
    case editorActions.SAVE_DRAFT_ERROR:
      return {
        ...state,
        saving: false,
      };
    case editorActions.DELETE_DRAFT_START:
      return {
        ...state,
        pendingDrafts: [
          ...state.pendingDrafts,
          action.meta.id,
        ],
        pendingDraftsSC2: [
          ...state.pendingDraftsSC2,
          action.meta.id,
        ],
      };
    case editorActions.DELETE_DRAFT_SUCCESS: {
      return {
        ...state,
        draftPosts: action.payload,
        pendingDrafts: state.pendingDrafts.filter(id => id !== action.meta.id),
        pendingDraftsSC2: state.pendingDraftsSC2.filter(id => id !== action.meta.id),
      };
    }
    case editorActions.DELETE_DRAFT_ERROR:
      return {
        ...state,
        pendingDrafts: state.pendingDrafts.filter(id => id !== action.meta.id),
        pendingDraftsSC2: state.pendingDraftsSC2.filter(id => id !== action.meta.id),
      };
    case userActions.UPLOAD_FILE_START:
      return { ...state, loadingImg: true };

    case userActions.UPLOAD_FILE_ERROR:
    case userActions.UPLOAD_FILE_SUCCESS:
      return { ...state, loadingImg: false };
    default:
      return state;
  }
};

export default editor;

export const getDraftPosts = state => state.draftPosts;
export const getIsEditorLoading = state => state.loading;
export const getIsEditorSaving = state => state.saving;
export const getPendingDrafts = state => state.pendingDrafts;
export const getIsPostEdited = (state, permlink) => state.editedPosts.includes(permlink);

export const getDraftPostsSC2 = state => state.draftPostsSC2;
export const getPendingDraftsSC2 = state => state.pendingDraftsSC2;

