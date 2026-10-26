export const API_BASE = 'http://localhost:3000/api'
export const API_ROUTES = {
  GET_PROFILE: `${API_BASE}/profile`,
  GET_BOOKMARKS: `${API_BASE}/bookmarks`,
  GET_BOOKMARK: `${API_BASE}/bookmarks/:id`,
  CREATE_BOOKMARK: `${API_BASE}/bookmarks`,
  UPDATE_BOOKMARK: `${API_BASE}/bookmarks/:id`,
  DELETE_BOOKMARK: `${API_BASE}/bookmarks/:id`,
}
